// Advertiser Page Specific JavaScript

// ================================
// MOBILE DETECTION
// ================================
var isMobileDevice = window.matchMedia('(max-width: 768px)').matches;

// ================================
// HERO LOADING STATE
// ================================
// Show a skeleton shimmer while hero videos load, then reveal
// the video grid and floating cards with staggered animations.
(function() {
    var visual = document.querySelector('.advertiser-visual');
    if (!visual) return;

    var videoGrid = visual.querySelector('.video-grid-container');
    if (!videoGrid) return;

    var loaded = false;

    function markLoaded() {
        if (loaded) return;
        loaded = true;
        visual.classList.add('hero-loaded');
    }

    // Pick the first video from each column to watch for readiness
    var columns = videoGrid.querySelectorAll('.video-grid-column');
    var firstVideos = [];
    columns.forEach(function(col) {
        var v = col.querySelector('.grid-video-card video');
        if (v) firstVideos.push(v);
    });

    if (firstVideos.length === 0) {
        markLoaded();
        return;
    }

    var readyCount = 0;
    var needed = Math.min(2, firstVideos.length);

    firstVideos.forEach(function(video) {
        // Override preload="none" so these first videos start downloading
        video.preload = 'auto';
        video.setAttribute('preload', 'auto');

        function onReady() {
            readyCount++;
            if (readyCount >= needed) markLoaded();
        }

        // Already cached / ready to play
        if (video.readyState >= 3) {
            onReady();
            return;
        }

        // canplay fires when enough data is buffered to render frames
        video.addEventListener('canplay', onReady, { once: true });

        // Force the browser to actually start fetching
        video.load();
    });

    // Absolute failsafe for very slow connections
    setTimeout(markLoaded, 8000);
})();

// ================================
// VIDEO LAZY LOADING VIA INTERSECTION OBSERVER
// ================================
// Play videos only when visible, pause when off-screen.
// This prevents all 50+ videos from downloading/playing at once.
//
// CSS-animated containers (carousels, grids) use transform to move
// children, which doesn't update layout position. IntersectionObserver
// can't detect individual videos inside them, so we observe the
// parent container and play/pause ALL its child videos together.
(function() {
    // Containers whose children are moved via CSS transforms
    var cssAnimatedSelectors = '.creativity-carousel, .video-grid-container';
    var videoContainerSelector = '.tiktok-video-container, .grid-video-card, .floating-video-card, .review-card';

    function markVideoLoaded(video) {
        var container = video.closest(videoContainerSelector);
        if (container && !container.classList.contains('video-loaded')) {
            container.classList.add('video-loaded');
        }
    }

    // Play a video and mark its container as loaded (success or failure)
    function playAndReveal(video) {
        video.play().then(function() {
            markVideoLoaded(video);
        }).catch(function() {
            // play() rejected (e.g. browser throttle) — still reveal the video
            markVideoLoaded(video);
        });
    }

    // Collect videos that live inside CSS-animated containers
    var animatedVideos = new Set();
    document.querySelectorAll(cssAnimatedSelectors).forEach(function(container) {
        container.querySelectorAll('video').forEach(function(v) {
            animatedVideos.add(v);
        });
    });

    // Observer for individual videos (NOT inside CSS-animated containers)
    var videoObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            var video = entry.target;
            if (entry.isIntersecting) {
                playAndReveal(video);
            } else {
                video.pause();
            }
        });
    }, {
        rootMargin: '200px 0px',
        threshold: 0.1
    });

    // Observe individual videos that are NOT in CSS-animated containers
    document.querySelectorAll('video').forEach(function(video) {
        if (!animatedVideos.has(video)) {
            videoObserver.observe(video);
        }
    });

    // CSS-animated containers: only play videos actually visible within
    // the container's clipped area. Check periodically since CSS transforms
    // move videos through the visible region over time.
    function isVisibleInContainer(video, containerRect) {
        var r = video.getBoundingClientRect();
        // Video must overlap the container's visible area
        return r.bottom > containerRect.top && r.top < containerRect.bottom &&
               r.right > containerRect.left && r.left < containerRect.right &&
               r.width > 0 && r.height > 0;
    }

    var animatedContainers = document.querySelectorAll(cssAnimatedSelectors);
    var animContainerInViewport = new Map(); // track which containers are in viewport

    // Use IntersectionObserver just to know if the container section is on screen
    var containerViewportObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            animContainerInViewport.set(entry.target, entry.isIntersecting);
            // If container left viewport, pause all its videos
            if (!entry.isIntersecting) {
                entry.target.querySelectorAll('video').forEach(function(v) {
                    v.pause();
                });
            }
        });
    }, { rootMargin: '300px 0px', threshold: 0 });

    animatedContainers.forEach(function(container) {
        containerViewportObserver.observe(container);
    });

    // On mobile, limit how many videos play at once in the video grid
    // to reduce GPU/CPU load on iOS. Pick 1 per column (3 total).
    var MOBILE_GRID_MAX = 3;

    function updateAnimatedContainer(container) {
        if (!animContainerInViewport.get(container)) return;
        var containerRect = container.getBoundingClientRect();
        var isVideoGrid = container.classList.contains('video-grid-container');

        if (isMobileDevice && isVideoGrid) {
            // Mobile video grid: only play 1 video per column (closest to center)
            var columns = container.querySelectorAll('.video-grid-column');
            var centerY = containerRect.top + containerRect.height / 2;
            columns.forEach(function(col) {
                var bestVideo = null;
                var bestDist = Infinity;
                var videos = col.querySelectorAll('video');
                videos.forEach(function(v) {
                    var r = v.getBoundingClientRect();
                    if (r.width === 0 || r.height === 0) return;
                    var videoCenter = r.top + r.height / 2;
                    var dist = Math.abs(videoCenter - centerY);
                    if (isVisibleInContainer(v, containerRect) && dist < bestDist) {
                        bestDist = dist;
                        bestVideo = v;
                    }
                });
                videos.forEach(function(v) {
                    if (v === bestVideo) {
                        playAndReveal(v);
                    } else {
                        v.pause();
                    }
                });
            });
        } else {
            // Desktop / non-grid: play all visible videos
            container.querySelectorAll('video').forEach(function(v) {
                if (isVisibleInContainer(v, containerRect)) {
                    playAndReveal(v);
                } else {
                    v.pause();
                }
            });
        }
    }

    // Periodically check which videos inside on-screen containers are visible
    setInterval(function() {
        animatedContainers.forEach(updateAnimatedContainer);
    }, isMobileDevice ? 1500 : 1000);

    // Mark already-loaded videos (e.g. from cache)
    document.querySelectorAll('video').forEach(function(video) {
        if (video.readyState >= 3) {
            markVideoLoaded(video);
        }
    });
})();

document.addEventListener('DOMContentLoaded', function() {
    // Tab Functionality with Auto-Progress
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    const AUTO_PROGRESS_DURATION = 8000; // 8 seconds per tab
    let autoProgressInterval = null;
    let autoProgressEnabled = true;

    // Function to switch to a specific tab
    function switchToTab(index) {
        const btn = tabBtns[index];
        const targetTab = btn.getAttribute('data-tab');

        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        btn.classList.add('active');
        document.querySelector(`.tab-pane[data-tab="${targetTab}"]`).classList.add('active');

        // Reset progress bar animation
        resetProgressBar(btn);
    }

    // Function to get current active tab index
    function getCurrentTabIndex() {
        return Array.from(tabBtns).findIndex(btn => btn.classList.contains('active'));
    }

    // Function to go to next tab
    function goToNextTab() {
        const currentIndex = getCurrentTabIndex();
        const nextIndex = (currentIndex + 1) % tabBtns.length;
        switchToTab(nextIndex);
    }

    // Function to reset progress bar on a tab button
    function resetProgressBar(btn) {
        const progressBar = btn.querySelector('.tab-progress');
        if (progressBar && autoProgressEnabled) {
            progressBar.style.animation = 'none';
            progressBar.offsetHeight; // Trigger reflow
            progressBar.style.animation = `tabProgress ${AUTO_PROGRESS_DURATION}ms linear forwards`;
        }
    }

    // Function to start auto-progress
    function startAutoProgress() {
        if (!autoProgressEnabled) return;

        // Reset progress bar on current active tab
        const activeBtn = document.querySelector('.tab-btn.active');
        resetProgressBar(activeBtn);

        // Clear any existing interval
        if (autoProgressInterval) {
            clearInterval(autoProgressInterval);
        }

        // Start new interval
        autoProgressInterval = setInterval(() => {
            if (autoProgressEnabled) {
                goToNextTab();
            }
        }, AUTO_PROGRESS_DURATION);
    }

    // Function to stop auto-progress
    function stopAutoProgress() {
        autoProgressEnabled = false;
        if (autoProgressInterval) {
            clearInterval(autoProgressInterval);
            autoProgressInterval = null;
        }
        // Remove all progress bars
        tabBtns.forEach(btn => {
            const progressBar = btn.querySelector('.tab-progress');
            if (progressBar) {
                progressBar.style.animation = 'none';
            }
        });
    }

    // Add progress bar to each tab button
    tabBtns.forEach(btn => {
        const progressBar = document.createElement('div');
        progressBar.className = 'tab-progress';
        btn.appendChild(progressBar);
    });

    // Tab click handler
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Stop auto-progress when user manually clicks
            stopAutoProgress();
            switchToTab(index);
        });
    });

    // On mobile: skip scroll-triggered fade-ins — show everything immediately
    if (isMobileDevice) {
        document.querySelectorAll('.case-studies-section, [data-scroll]').forEach(function(el) {
            el.classList.add('animate-in');
        });
        document.querySelectorAll('.pricing-section, .no-hassle-section').forEach(function(el) {
            el.classList.add('in-view');
        });
        startAutoProgress();
    }

    // Case Studies Section - Animate on scroll (desktop only)
    const caseStudiesSection = document.querySelector('.case-studies-section');
    let caseStudiesAnimated = isMobileDevice;

    if (caseStudiesSection && !isMobileDevice) {
        const caseStudiesObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !caseStudiesAnimated) {
                    caseStudiesAnimated = true;
                    caseStudiesSection.classList.add('animate-in');

                    // Start auto-progress when section comes into view
                    startAutoProgress();

                    // Unobserve after animation triggered
                    caseStudiesObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2
        });

        caseStudiesObserver.observe(caseStudiesSection);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for animations (desktop only)
    if (!isMobileDevice) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);

        // Observe elements with data-scroll attribute
        document.querySelectorAll('[data-scroll]').forEach(el => {
            observer.observe(el);
        });
    }

    // Pricing Section - Animate killed prices and cards on scroll (desktop only)
    const pricingSection = document.querySelector('.pricing-section');
    if (pricingSection && !isMobileDevice) {
        const pricingObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.15
        });
        pricingObserver.observe(pricingSection);
    }

    // No Hassle Section - Animate headlines on scroll (desktop only)
    const noHassleSection = document.querySelector('.no-hassle-section');
    if (noHassleSection && !isMobileDevice) {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, {
            threshold: 0.2
        });
        sectionObserver.observe(noHassleSection);
    }

    // Count-up animation for No Hassle section
    const countUpElements = document.querySelectorAll('.stat-counter');

    const animateCountUp = (element) => {
        const target = parseInt(element.getAttribute('data-target'));
        const format = element.getAttribute('data-format');
        const duration = 2000;
        const startTime = performance.now();

        const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const currentValue = Math.floor(easedProgress * target);

            if (format === 'comma') {
                element.textContent = currentValue.toLocaleString();
            } else {
                element.textContent = currentValue;
            }

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                if (format === 'comma') {
                    element.textContent = target.toLocaleString();
                } else {
                    element.textContent = target;
                }
            }
        };

        requestAnimationFrame(updateCount);
    };

    const countUpObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCountUp(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    countUpElements.forEach(el => {
        countUpObserver.observe(el);
    });

    // ================================
    // HOW IT WORKS - SCROLL ANIMATION
    // ================================
    initScrollAnimation();
});

function initScrollAnimation() {
    const scrollSection = document.querySelector('.how-it-works-scroll');
    if (!scrollSection) return;

    const scrollContainer = scrollSection.querySelector('.scroll-container');
    const scrollSticky = scrollSection.querySelector('.scroll-sticky');

    // Elements
    const phaseDots = scrollSection.querySelectorAll('.phase-dot');
    const phaseTexts = scrollSection.querySelectorAll('.phase-text');
    const scrollHint = scrollSection.querySelector('.scroll-hint');

    // Tiles
    const tileBriefing = scrollSection.querySelector('.tile-briefing');
    const tileProduct = scrollSection.querySelector('.tile-product');
    const tileTargeting = scrollSection.querySelector('.tile-targeting');
    const tileCampaign = scrollSection.querySelector('.tile-campaign');

    // Exploding videos, review cards, and analytics
    const explodingVideos = scrollSection.querySelectorAll('.exploding-video');
    const reviewCards = scrollSection.querySelector('.review-cards');
    const analyticsTiles = scrollSection.querySelectorAll('.analytics-tile');

    // Phase thresholds (0-1 scroll progress within the section)
    // Now 6 internal phases mapping to 4 visible steps
    const phases = {
        1: { start: 0, end: 0.10 },      // Briefing + Product appear
        2: { start: 0.10, end: 0.22 },   // Targeting slides in
        3: { start: 0.22, end: 0.34 },   // Merge into Campaign
        4: { start: 0.34, end: 0.54 },   // Videos explode - more time for all 8 to show
        5: { start: 0.54, end: 0.85 },   // Review cards
        6: { start: 0.85, end: 1 }       // Analytics appear
    };

    function updatePhaseIndicator(currentPhase) {
        phaseDots.forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 <= currentPhase);
        });

        // Map internal phases to 4 visible step labels
        // Phase 1 text: internal phases 1-2 (Briefing & Target)
        // Phase 3 text: internal phases 3-4 (Campaign & Content Live)
        // Phase 4 text: internal phase 5 (Review & Pay)
        // Phase 5 text: internal phase 6 (Track Performance)
        phaseTexts.forEach((text) => {
            const textPhase = parseInt(text.getAttribute('data-phase'));
            if (textPhase === 1) {
                text.classList.toggle('active', currentPhase === 1 || currentPhase === 2);
            } else if (textPhase === 3) {
                text.classList.toggle('active', currentPhase === 3 || currentPhase === 4);
            } else if (textPhase === 4) {
                text.classList.toggle('active', currentPhase === 5);
            } else if (textPhase === 5) {
                text.classList.toggle('active', currentPhase === 6);
            }
        });
    }

    function updateAnimation(progress) {
        // Determine current phase
        let currentPhase = 1;
        for (let phase = 6; phase >= 1; phase--) {
            if (progress >= phases[phase].start) {
                currentPhase = phase;
                break;
            }
        }

        updatePhaseIndicator(currentPhase);

        // Hide scroll hint after initial scroll
        if (progress > 0.05) {
            scrollHint.classList.add('hidden');
        } else {
            scrollHint.classList.remove('hidden');
        }

        // Phase 1: Briefing + Product tiles appear - only until phase 5 (review cards)
        if (progress >= phases[1].start && progress < phases[5].start) {
            const phaseProgress = Math.min(1, (progress - phases[1].start) / (phases[1].end - phases[1].start));

            // Show briefing tile after small delay
            if (phaseProgress > 0.15) {
                tileBriefing.classList.add('visible');
            } else {
                tileBriefing.classList.remove('visible');
            }

            // Show product tile with more scroll distance
            if (phaseProgress > 0.65) {
                tileProduct.classList.add('visible');
            } else {
                tileProduct.classList.remove('visible');
            }
        } else if (progress < phases[1].start) {
            tileBriefing.classList.remove('visible');
            tileProduct.classList.remove('visible');
        }

        // Phase 2: Targeting tile slides in - only until phase 5
        if (progress >= phases[2].start && progress < phases[5].start) {
            const phaseProgress = Math.min(1, (progress - phases[2].start) / (phases[2].end - phases[2].start));

            if (phaseProgress > 0.2) {
                tileTargeting.classList.add('visible');
            } else {
                tileTargeting.classList.remove('visible');
            }
        } else if (progress < phases[2].start) {
            tileTargeting.classList.remove('visible');
        }

        // Phase 3: Tiles merge into Campaign - only until phase 5
        if (progress >= phases[3].start && progress < phases[5].start) {
            const phaseProgress = Math.min(1, (progress - phases[3].start) / (phases[3].end - phases[3].start));

            if (phaseProgress > 0.3) {
                tileBriefing.classList.add('merging');
                tileProduct.classList.add('merging');
                tileTargeting.classList.add('merging');
            } else {
                tileBriefing.classList.remove('merging');
                tileProduct.classList.remove('merging');
                tileTargeting.classList.remove('merging');
            }

            if (phaseProgress > 0.6) {
                tileCampaign.classList.add('visible');
            } else {
                tileCampaign.classList.remove('visible');
            }
        } else if (progress < phases[3].start) {
            tileBriefing.classList.remove('merging');
            tileProduct.classList.remove('merging');
            tileTargeting.classList.remove('merging');
            tileCampaign.classList.remove('visible');
        }

        // Hide ALL tiles during review cards and analytics phases
        if (progress >= phases[5].start) {
            tileBriefing.classList.remove('visible', 'merging');
            tileProduct.classList.remove('visible', 'merging');
            tileTargeting.classList.remove('visible', 'merging');
            tileCampaign.classList.remove('visible');
        }

        // Phase 4: Videos explode out
        if (progress >= phases[4].start && progress < phases[5].start + 0.05) {
            const phaseProgress = Math.min(1, (progress - phases[4].start) / (phases[4].end - phases[4].start));

            explodingVideos.forEach((video, index) => {
                const delay = index * 0.05;
                if (phaseProgress > delay) {
                    video.classList.add('visible');
                    video.classList.remove('shrink');
                }
            });
        } else if (progress < phases[4].start) {
            explodingVideos.forEach(video => {
                video.classList.remove('visible');
                video.classList.remove('shrink');
            });
        }

        // Phase 5: Review Cards appear (NEW!)
        if (progress >= phases[5].start && progress < phases[6].start) {
            const phaseProgress = Math.min(1, (progress - phases[5].start) / (phases[5].end - phases[5].start));

            // Shrink exploding videos
            explodingVideos.forEach(video => {
                video.classList.add('shrink');
            });

            // Hide campaign tile
            if (phaseProgress > 0.1) {
                tileCampaign.classList.remove('visible');
            }

            // Show review cards
            if (phaseProgress > 0.08 && reviewCards) {
                reviewCards.classList.add('visible');

                // Get both cards - approve swipes first, then decline
                const approveCard = reviewCards.querySelector('.card-approve');
                const declineCard = reviewCards.querySelector('.card-decline');

                // Phase 1: Cards appear (0.08 - 0.25)
                // Phase 2: First card swipes RIGHT to approve (0.25 - 0.50)
                // Phase 3: Second card swipes LEFT to decline (0.75 - 1.0)
                if (phaseProgress >= 0.25 && approveCard) {
                    approveCard.classList.add('swiping-right');
                }

                if (phaseProgress >= 0.75 && declineCard) {
                    declineCard.classList.add('swiping-left');
                }

                // Reset before animation starts
                if (phaseProgress < 0.25 && approveCard) {
                    approveCard.classList.remove('swiping-right');
                }
                if (phaseProgress < 0.75 && declineCard) {
                    declineCard.classList.remove('swiping-left');
                }
            }
        } else if (progress < phases[5].start) {
            if (reviewCards) {
                reviewCards.classList.remove('visible');
                const approveCard = reviewCards.querySelector('.card-approve');
                const declineCard = reviewCards.querySelector('.card-decline');
                if (approveCard) approveCard.classList.remove('swiping-right');
                if (declineCard) declineCard.classList.remove('swiping-left');
            }
        }

        // Phase 6: Analytics tiles appear
        if (progress >= phases[6].start) {
            const phaseProgress = Math.min(1, (progress - phases[6].start) / (phases[6].end - phases[6].start));

            // Hide review cards
            if (reviewCards) {
                reviewCards.classList.remove('visible');
            }

            // Shrink videos further
            explodingVideos.forEach(video => {
                video.classList.add('shrink');
            });

            // Hide campaign tile
            if (phaseProgress > 0.1) {
                tileCampaign.classList.remove('visible');
            }

            // Show analytics tiles with staggered delay
            analyticsTiles.forEach((tile, index) => {
                const delay = index * 0.08;
                if (phaseProgress > delay + 0.1) {
                    tile.classList.add('visible');
                }
            });
        } else {
            analyticsTiles.forEach(tile => {
                tile.classList.remove('visible');
            });
            if (progress < phases[5].start) {
                explodingVideos.forEach(video => {
                    video.classList.remove('shrink');
                });
            }
        }
    }

    // Scroll handler
    function handleScroll() {
        const rect = scrollSection.getBoundingClientRect();
        const sectionTop = scrollSection.offsetTop;
        const sectionHeight = scrollContainer.offsetHeight;
        const viewportHeight = window.innerHeight;

        // Calculate scroll progress within the section (0 to 1)
        const scrolled = window.scrollY - sectionTop;
        const scrollableDistance = sectionHeight - viewportHeight;
        const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

        // Only animate when section is in view
        if (rect.top <= viewportHeight && rect.bottom >= 0) {
            updateAnimation(progress);
        }
    }

    // On mobile, use rAF polling to work around iOS Safari not firing
    // scroll events during momentum/inertial scrolling
    if (isMobileDevice) {
        var lastScrollY = -1;
        function pollScroll() {
            if (window.scrollY !== lastScrollY) {
                lastScrollY = window.scrollY;
                handleScroll();
            }
            requestAnimationFrame(pollScroll);
        }
        requestAnimationFrame(pollScroll);
    } else {
        // Desktop: throttle scroll events for performance
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // Initial call
    handleScroll();
}

// ================================
// FAQ ACCORDION
// ================================
document.addEventListener('DOMContentLoaded', function() {
    const accordions = document.querySelectorAll('.accordion_new');

    accordions.forEach(accordion => {
        const trigger = accordion.querySelector('.accordion-trigger');
        const content = accordion.querySelector('.accordion-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isOpen = accordion.classList.contains('open');

                // Close all other accordions
                accordions.forEach(other => {
                    if (other !== accordion) {
                        other.classList.remove('open');
                        const otherContent = other.querySelector('.accordion-content');
                        if (otherContent) {
                            otherContent.style.display = 'none';
                            otherContent.style.opacity = '0';
                        }
                    }
                });

                // Toggle current accordion
                if (isOpen) {
                    accordion.classList.remove('open');
                    content.style.display = 'none';
                    content.style.opacity = '0';
                } else {
                    accordion.classList.add('open');
                    content.style.display = 'block';
                    content.style.opacity = '1';
                }
            });
        }
    });
});

// ================================
// MOBILE NAVIGATION HAMBURGER
// ================================
(function() {
    var hamburger = document.querySelector('.nav-hamburger');
    var mobileMenu = document.querySelector('.nav-mobile-menu');
    if (!hamburger || !mobileMenu) return;

    function openMenu() {
        hamburger.classList.add('is-open');
        hamburger.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('is-open');
    }

    function closeMenu() {
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('is-open');
    }

    hamburger.addEventListener('click', function() {
        if (mobileMenu.classList.contains('is-open')) {
            closeMenu();
        } else {
            openMenu();
        }
    });

    mobileMenu.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(function(link) {
        link.addEventListener('click', closeMenu);
    });

    // Close when tapping outside
    document.addEventListener('click', function(e) {
        if (mobileMenu.classList.contains('is-open') && !e.target.closest('.nav-container')) {
            closeMenu();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
            closeMenu();
        }
    });
})();
