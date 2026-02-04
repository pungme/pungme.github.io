// ================================
// HERO GRAPH ANIMATION
// ================================
window.addEventListener('load', () => {
    const bars = document.querySelectorAll('.graph-bars .bar');
    bars.forEach((bar, index) => {
        const targetHeight = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => {
            bar.style.height = targetHeight;
        }, 200 + (index * 100));
    });
});

// ================================
// ENGAGEMENT COUNTER ANIMATION
// ================================
function animateEngagementCounters() {
    const counters = document.querySelectorAll('.engagement-card .metric-value, .card-engagement .metric-value');

    counters.forEach(counter => {
        const target = parseFloat(counter.dataset.target);
        const suffix = counter.dataset.suffix || '';
        const duration = 2000;
        const start = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic for smooth deceleration
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = (target * eased).toFixed(target % 1 !== 0 ? 1 : 0);
            counter.textContent = current + suffix;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    });
}

// Trigger counter animation when engagement card enters viewport
const engagementCard = document.querySelector('.engagement-card, .card-engagement');
if (engagementCard) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Delay to sync with bar animation
                setTimeout(animateEngagementCounters, 1500);
                counterObserver.disconnect();
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(engagementCard);
}

// ================================
// SCROLL MORPH HERO ANIMATION
// ================================
const morphShape = document.getElementById('morphShape');
const campaignItems = document.querySelectorAll('.campaign-item');
const morphContainer = document.querySelector('.morph-container');
const heroSection = document.querySelector('.hero-scroll-morph');
const campaignListView = document.querySelector('.campaign-list-view');
const campaignDetailView = document.querySelector('.campaign-detail-view');
const successView = document.querySelector('.success-view');
const appHeader = document.querySelector('.app-header');
const joinCampaignBtn = document.querySelector('.join-campaign-btn');
const startCreatingBtn = document.querySelector('.start-creating-btn');
const detailHeader = document.querySelector('.detail-header');
const detailMeta = document.querySelector('.detail-meta');
const detailBriefing = document.querySelector('.detail-briefing');
const detailCta = document.querySelector('.detail-cta');
const tiktokPostView = document.querySelector('.tiktok-post-view');
const tiktokPostBtn = document.querySelector('.tiktok-post-btn');
const tiktokElements = document.querySelectorAll('.tiktok-element');
const viewsProgressView = document.querySelector('.views-progress-view');
const viewsNumber = document.querySelector('.views-number');
const viewsProgressFill = document.querySelector('.views-progress-fill');
const paymentView = document.querySelector('.payment-view');
const scrollIndicatorDot = document.querySelector('.scroll-indicator-dot');
const stepIndicators = document.querySelectorAll('.step-indicator');
const stepIndicatorsContainer = document.querySelector('.step-indicators');
const tapHint = document.querySelector('.tap-hint');
const bgStatement = document.querySelector('.bg-statement');

// Current view state: 'list', 'detail', 'success', 'tiktok', 'views', 'payment'
let currentView = 'list';
let phoneReady = false;
let hasInteracted = false;

// ================================
// SCROLL-BASED DOT TO PHONE ANIMATION
// ================================
function updateMorphAnimation() {
    if (!morphShape || !heroSection) return;

    const scrollY = window.scrollY;
    const heroHeight = heroSection.offsetHeight;
    const viewportHeight = window.innerHeight;
    const heroTop = heroSection.offsetTop;
    const heroBottom = heroTop + heroHeight;

    // Logic for handling scroll states
    if (scrollY < heroTop - (viewportHeight / 2)) {
        // Before the section - Hide
        morphShape.style.opacity = '0';
        if (morphContainer) {
            morphContainer.style.position = 'fixed';
            morphContainer.style.top = '0';
            morphContainer.style.bottom = 'auto';
        }
        if (scrollIndicatorDot) scrollIndicatorDot.classList.remove('visible');
        if (stepIndicatorsContainer) stepIndicatorsContainer.classList.remove('visible');
        if (tapHint) tapHint.classList.remove('visible');
        if (bgStatement) bgStatement.classList.remove('visible');
        morphShape.classList.remove('shifted-right');
        phoneReady = false;
        return;

    } else if (scrollY > heroBottom - viewportHeight) {
        // After the section - Absolute positioning
        morphShape.style.opacity = '1';
        if (morphContainer) {
            morphContainer.style.position = 'absolute';
            morphContainer.style.top = 'auto';
            morphContainer.style.bottom = '0';
        }
        if (scrollIndicatorDot) scrollIndicatorDot.classList.remove('visible');
        if (bgStatement) bgStatement.classList.remove('visible');

    } else {
        // Inside the section - Fixed positioning
        morphShape.style.opacity = '1';
        if (morphContainer) {
            morphContainer.style.position = 'fixed';
            morphContainer.style.top = '0';
            morphContainer.style.bottom = 'auto';
        }
        if (bgStatement) bgStatement.classList.add('visible');
    }

    // Calculate progress through the hero section (0 to 1)
    const progress = Math.min(Math.max(scrollY - heroTop, 0) / (heroHeight - viewportHeight), 1);

    // Show/hide scroll indicator during dot phase
    if (scrollIndicatorDot) {
        if (progress < 0.05) {
            scrollIndicatorDot.classList.add('visible');
        } else {
            scrollIndicatorDot.classList.remove('visible');
        }
    }

    // Hide step indicators and unshift early when scrolling back up
    if (progress < 0.38) {
        morphShape.classList.remove('shifted-right');
        morphShape.classList.remove('content-ready');
        if (stepIndicatorsContainer) {
            stepIndicatorsContainer.classList.remove('visible');
        }
        if (tapHint) {
            tapHint.classList.remove('visible');
        }
        phoneReady = false;
    }

    // Phase 1: Dot grows (0 - 0.15)
    if (progress < 0.15) {
        const growProgress = progress / 0.15;
        const size = 20 + (growProgress * 80); // 20px to 100px
        morphShape.style.width = `${size}px`;
        morphShape.style.height = `${size}px`;
        morphShape.style.borderRadius = '50%';
        morphShape.classList.remove('phone-shape');
    }
    // Phase 2: Morphs to phone (0.15 - 0.40)
    else if (progress < 0.40) {
        const morphProgress = (progress - 0.15) / 0.25;

        const width = 100 + (morphProgress * 240); // 100px to 340px
        const height = 100 + (morphProgress * 580); // 100px to 680px
        const borderRadius = 50 - (morphProgress * 2); // 50px to 48px

        morphShape.style.width = `${width}px`;
        morphShape.style.height = `${height}px`;
        morphShape.style.borderRadius = `${borderRadius}px`;

        if (morphProgress > 0.7) {
            morphShape.classList.add('phone-shape');
        } else {
            morphShape.classList.remove('phone-shape');
        }
    }
    // Phase 3: Phone is fully formed, shift right, show step indicators (0.40 - 1.0 = 60% buffer)
    else {
        morphShape.classList.add('phone-shape');
        morphShape.style.width = '340px';
        morphShape.style.height = '680px';
        morphShape.style.borderRadius = '48px';
        morphShape.classList.add('content-ready');
        morphShape.classList.add('shifted-right');

        if (stepIndicatorsContainer) {
            stepIndicatorsContainer.classList.add('visible');
        }

        // Initialize phone content only once
        if (!phoneReady) {
            phoneReady = true;
            showView('list');

            // Show tap hint if not interacted yet (only on first time entering)
            if (!hasInteracted) {
                if (tapHint) tapHint.classList.add('visible');
            }
        }
    }
}

// ================================
// VIEW MANAGEMENT
// ================================
function showView(view) {
    currentView = view;

    // Hide tap hint after first interaction
    if (!hasInteracted && view !== 'list') {
        hasInteracted = true;
        if (tapHint) tapHint.classList.remove('visible');
    }

    // Reset all views
    campaignListView?.classList.remove('slide-out');
    campaignDetailView?.classList.remove('slide-in', 'slide-out');
    successView?.classList.remove('slide-in', 'slide-out');
    tiktokPostView?.classList.remove('slide-in', 'slide-out');
    viewsProgressView?.classList.remove('slide-in', 'slide-out', 'goal-reached');
    paymentView?.classList.remove('slide-in');

    // Reset detail elements
    detailHeader?.classList.remove('visible');
    detailMeta?.classList.remove('visible');
    detailBriefing?.classList.remove('visible');
    detailCta?.classList.remove('visible');

    // Reset tiktok elements
    tiktokElements.forEach(el => el.classList.remove('visible'));

    // Reset views progress
    if (viewsNumber) viewsNumber.textContent = '0';
    if (viewsProgressFill) viewsProgressFill.style.width = '0%';

    // Stop money rain
    if (window.stopMoneyRain) window.stopMoneyRain();

    // Show campaign items for list view
    if (view === 'list') {
        // First hide all, then animate them in one by one
        campaignItems.forEach(item => item.classList.remove('visible'));
        campaignItems.forEach((item, index) => {
            setTimeout(() => item.classList.add('visible'), 100 + (index * 80));
        });
        if (appHeader) {
            appHeader.style.opacity = '1';
            appHeader.style.transform = 'translateY(0)';
        }
    } else {
        // Hide campaign items when not in list view
        campaignItems.forEach(item => item.classList.remove('visible'));
        if (appHeader) {
            appHeader.style.opacity = '0';
            appHeader.style.transform = 'translateX(-30%)';
        }
    }

    // Apply view-specific states
    switch(view) {
        case 'list':
            // Already handled above with staggered animation
            break;

        case 'detail':
            campaignListView?.classList.add('slide-out');
            campaignDetailView?.classList.add('slide-in');
            // Animate detail elements
            setTimeout(() => detailHeader?.classList.add('visible'), 100);
            setTimeout(() => detailMeta?.classList.add('visible'), 200);
            setTimeout(() => detailBriefing?.classList.add('visible'), 300);
            setTimeout(() => detailCta?.classList.add('visible'), 400);
            break;

        case 'success':
            campaignListView?.classList.add('slide-out');
            campaignDetailView?.classList.add('slide-out');
            successView?.classList.add('slide-in');
            break;

        case 'tiktok':
            campaignListView?.classList.add('slide-out');
            campaignDetailView?.classList.add('slide-out');
            successView?.classList.add('slide-out');
            tiktokPostView?.classList.add('slide-in');
            // Animate tiktok elements
            tiktokElements.forEach((el, index) => {
                setTimeout(() => el.classList.add('visible'), 100 + (index * 100));
            });
            break;

        case 'views':
            campaignListView?.classList.add('slide-out');
            campaignDetailView?.classList.add('slide-out');
            successView?.classList.add('slide-out');
            tiktokPostView?.classList.add('slide-out');
            viewsProgressView?.classList.add('slide-in');
            // Animate views counter
            animateViewsCounter();
            break;

        case 'payment':
            campaignListView?.classList.add('slide-out');
            campaignDetailView?.classList.add('slide-out');
            successView?.classList.add('slide-out');
            tiktokPostView?.classList.add('slide-out');
            viewsProgressView?.classList.add('slide-out');
            paymentView?.classList.add('slide-in');
            if (window.startMoneyRain) window.startMoneyRain();
            break;
    }

    // Update step indicators
    updateStepIndicators();
}

function updateStepIndicators() {
    let currentStep = 1;
    if (currentView === 'views' || currentView === 'payment') {
        currentStep = 3;
    } else if (currentView === 'tiktok') {
        currentStep = 2;
    }

    stepIndicators.forEach((indicator) => {
        const step = parseInt(indicator.getAttribute('data-step'));
        indicator.classList.remove('active', 'completed');

        if (step === currentStep) {
            indicator.classList.add('active');
        } else if (step < currentStep) {
            indicator.classList.add('completed');
        }
    });
}

function animateViewsCounter() {
    const maxViews = 500;
    const duration = 2000;
    const startTime = Date.now();

    function update() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        const currentViews = Math.floor(easeProgress * maxViews);

        if (viewsNumber) viewsNumber.textContent = currentViews.toString();
        if (viewsProgressFill) viewsProgressFill.style.width = (easeProgress * 100) + '%';

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            // Goal reached - show celebration then transition to payment
            if (viewsProgressView) viewsProgressView.classList.add('goal-reached');
            setTimeout(() => {
                if (currentView === 'views') {
                    showView('payment');
                }
            }, 1500);
        }
    }

    requestAnimationFrame(update);
}

// ================================
// CLICK EVENT HANDLERS
// ================================

// Campaign item click -> show detail view
campaignItems.forEach(item => {
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
        if (phoneReady && currentView === 'list') {
            item.classList.add('tapped');
            setTimeout(() => {
                item.classList.remove('tapped');
                showView('detail');
            }, 200);
        }
    });
});

// Join Campaign button click -> show success view
if (joinCampaignBtn) {
    joinCampaignBtn.addEventListener('click', () => {
        if (phoneReady && currentView === 'detail') {
            joinCampaignBtn.classList.add('tapped');
            setTimeout(() => {
                joinCampaignBtn.classList.remove('tapped');
                showView('success');
            }, 200);
        }
    });
}

// Start Creating button click -> show TikTok view
if (startCreatingBtn) {
    startCreatingBtn.addEventListener('click', () => {
        if (phoneReady && currentView === 'success') {
            startCreatingBtn.classList.add('tapped');
            setTimeout(() => {
                startCreatingBtn.classList.remove('tapped');
                showView('tiktok');
            }, 200);
        }
    });
}

// TikTok Post button click -> show views progress (then auto to payment)
if (tiktokPostBtn) {
    tiktokPostBtn.addEventListener('click', () => {
        if (phoneReady && currentView === 'tiktok') {
            tiktokPostBtn.classList.add('tapped');
            setTimeout(() => {
                tiktokPostBtn.classList.remove('tapped');
                showView('views');
            }, 200);
        }
    });
}

// Step indicator clicks
stepIndicators.forEach(indicator => {
    indicator.addEventListener('click', function() {
        if (!phoneReady) return;

        const step = parseInt(this.getAttribute('data-step'));

        if (step === 1) {
            showView('list');
        } else if (step === 2) {
            showView('tiktok');
        } else if (step === 3) {
            showView('views');
        }
    });
});

// Throttle scroll event for performance
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateMorphAnimation();
            ticking = false;
        });
        ticking = true;
    }
});

// Initial call - delayed slightly to ensure DOM is ready
setTimeout(() => {
    updateMorphAnimation();
    // If phone is ready on page load (refreshed while in section), ensure list is shown
    if (phoneReady && currentView === 'list') {
        campaignItems.forEach(item => item.classList.add('visible'));
    }
}, 50);

// ================================
// SMOOTH SCROLL
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// INTERSECTION OBSERVER FOR FADE-IN
// ================================
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all cards and sections
document.querySelectorAll('.step-card, .feature-card, .testimonial-card, .bento-card, [data-scroll]').forEach((el, index) => {
    el.classList.add('fade-in-element');
    el.style.transitionDelay = `${(index % 6) * 0.1}s`;
    fadeInObserver.observe(el);
});

// ================================
// STATS COUNTER ANIMATION
// ================================
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const text = statNumber.textContent;
            const hasPlus = text.includes('+');
            const hasDollar = text.includes('$');
            const hasK = text.includes('K');
            const hasM = text.includes('M');

            let targetValue = parseInt(text.replace(/[^0-9]/g, ''));

            if (hasK) targetValue = targetValue;
            if (hasM) targetValue = targetValue;

            let currentValue = 0;
            const duration = 2000;
            const increment = targetValue / (duration / 16);

            const counter = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    let finalText = targetValue.toString();
                    if (hasDollar) finalText = '$' + finalText;
                    if (hasM) finalText += 'M';
                    if (hasK) finalText += 'K';
                    if (hasPlus) finalText += '+';
                    statNumber.textContent = finalText;
                    clearInterval(counter);
                } else {
                    let displayValue = Math.floor(currentValue).toString();
                    if (hasDollar) displayValue = '$' + displayValue;
                    if (hasM) displayValue += 'M';
                    if (hasK) displayValue += 'K';
                    if (hasPlus) displayValue += '+';
                    statNumber.textContent = displayValue;
                }
            }, 16);

            statsObserver.unobserve(statNumber);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('.stat-number').forEach(stat => {
    statsObserver.observe(stat);
});

// ================================
// CURRENCY COUNTER ANIMATION
// ================================
const currencyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const originalText = element.textContent;

            // Clean up string to get number: remove $, commas
            const numericValue = parseFloat(originalText.replace(/[^0-9.-]+/g, ""));

            if (isNaN(numericValue)) return;

            // Delay the counter to sync with the fade-in animation
            setTimeout(() => {
                let startTimestamp = null;
                const duration = 2000;

                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);

                    // Ease out quart
                    const easeProgress = 1 - Math.pow(1 - progress, 4);

                    const currentVal = numericValue * easeProgress;

                    element.textContent = currentVal.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0
                    });

                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    } else {
                        // Ensure final value matches
                         element.textContent = numericValue.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0
                        });
                         // Restore suffix if it existed (e.g. 'M', 'K', '+')
                        if (originalText.includes('M')) element.textContent += 'M';
                        if (originalText.includes('K')) element.textContent += 'K';
                        if (originalText.includes('+')) element.textContent += '+';
                    }
                };

                window.requestAnimationFrame(step);
            }, 1000); // Wait 1s for the card to pop in and amount to fade in

            currencyObserver.unobserve(element);
        }
    });
}, {
    threshold: 0.1 // Trigger sooner
});

document.querySelectorAll('.count-up').forEach(el => {
    currencyObserver.observe(el);
});

// ================================
// HOVER EFFECTS ON CARDS
// ================================
document.querySelectorAll('.step-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ================================
// PAGE LOAD ANIMATION
// ================================
// Note: Removed body opacity flash to prevent double-animation
// with hero section elements that have their own entrance animations

// ================================
// HERO ROTATING TEXT ANIMATION
// ================================
window.addEventListener('DOMContentLoaded', () => {
    const rotatingTextElement = document.querySelector('.rotating-text');
    if (!rotatingTextElement) return;

    // Array of HTML strings with highlighted words
    const textVariations = [
        'Earn money with <br>your <span class="gradient-text-anim">creativity</span>',
        '<span class="smaller-text">Turn Your Influence <br>Into <span class="gradient-text-anim">Income</span></span>',
        'Get Paid for <br>What You <span class="gradient-text-anim">Love</span>'
    ];

    if (textVariations.length === 0) return;

    let currentIndex = 0;
    const rotationInterval = 4500; // Increased time to allow reading

    // Helper to wrap words in spans with index
    function getWrappedHtml(htmlString) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlString;
        
        let wordIndex = 0;
        
        function traverseAndWrap(node) {
            if (node.nodeType === 3) { // Text node
                const text = node.textContent;
                // Only wrap non-empty text
                if (!text.trim() && text !== ' ') return;
                
                const frag = document.createDocumentFragment();
                // Split by spaces but keep them to preserve structure if needed, 
                // or just rely on margin-right for spacing.
                // Better: Split by whitespace
                const words = text.split(/(\s+)/);
                
                words.forEach(word => {
                    if (word.trim().length === 0) return; // Skip whitespace strings, we use margin
                    
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.style.setProperty('--word-index', wordIndex++);
                    span.textContent = word;
                    frag.appendChild(span);
                });
                
                node.replaceWith(frag);
            } else if (node.nodeType === 1) { // Element node
                if (node.tagName === 'BR' || node.tagName === 'br') {
                    // Preserve break tags
                    return; 
                }
                Array.from(node.childNodes).forEach(traverseAndWrap);
            }
        }
        
        Array.from(tempDiv.childNodes).forEach(traverseAndWrap);
        return tempDiv.innerHTML;
    }

    // Initial Set
    rotatingTextElement.innerHTML = getWrappedHtml(textVariations[0]);

    function rotateText() {
        // Step 1: Fade out current text
        rotatingTextElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        rotatingTextElement.style.opacity = '0';
        rotatingTextElement.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            // Step 2: Prepare new text
            currentIndex = (currentIndex + 1) % textVariations.length;
            const newHtml = getWrappedHtml(textVariations[currentIndex]);
            
            // Step 3: Insert new text and reset container
            rotatingTextElement.innerHTML = newHtml;
            rotatingTextElement.style.transition = 'none'; // Disable container transition for instant reset
            rotatingTextElement.style.transform = 'translateY(0)';
            
            // Force reflow
            void rotatingTextElement.offsetWidth;
            
            // Step 4: Fade container in (chars animate themselves)
            rotatingTextElement.style.transition = 'opacity 0.1s';
            rotatingTextElement.style.opacity = '1';
            
        }, 500); // Wait for fade out
    }

    // Start rotation
    setTimeout(() => {
        setInterval(rotateText, rotationInterval);
    }, 2000);
});

// ================================
// CREATIVITY CAROUSEL AUTO-SCROLL
// ================================
document.addEventListener('DOMContentLoaded', () => {
    const carouselTracks = document.querySelectorAll('.creativity-carousel .carousel-track');

    if (!carouselTracks.length) return;

    carouselTracks.forEach(carouselTrack => {
        // Clone all items once to create seamless loop
        const originalItems = Array.from(carouselTrack.querySelectorAll('.carousel-item'));
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            carouselTrack.appendChild(clone);
        });

        // Toggle pause/play on click
        carouselTrack.addEventListener('click', () => {
            carouselTrack.classList.toggle('paused');
        });
    });
});

// ================================
// MONEY RAIN PHYSICS ANIMATION
// ================================
const moneyRainContainer = document.querySelector('.money-rain-container');
let moneyRainActive = false;
let moneyRainTriggered = false;

function createMoneyParticle(container, delay) {
    const emojis = ['💵', '💰', '💸', '🤑', '💵', '💰', '💵', '💸'];
    const particle = document.createElement('div');
    particle.className = 'money-particle';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    // Random starting position across the width
    const startX = Math.random() * 100;
    // Bigger size variation
    const size = 22 + Math.random() * 16;
    // Random rotation
    const startRotation = Math.random() * 360;
    // Physics properties - faster fall
    const swayAmount = 10 + Math.random() * 20;
    const swaySpeed = 3 + Math.random() * 2;
    const fallDuration = 1.2 + Math.random() * 0.8; // Much faster

    particle.style.cssText = `
        left: ${startX}%;
        top: -30px;
        font-size: ${size}px;
        transform: rotate(${startRotation}deg);
    `;

    container.appendChild(particle);

    // Animate with physics
    setTimeout(() => {
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const elapsed = (timestamp - startTime) / 1000;
            const progress = elapsed / fallDuration;

            if (progress >= 1) {
                particle.remove();
                return;
            }

            // Gravity acceleration (ease-in for falling)
            const y = progress * progress * 800;
            // Swaying motion (sine wave)
            const sway = Math.sin(elapsed * swaySpeed) * swayAmount;
            // Rotation during fall
            const rotation = startRotation + elapsed * 180;
            // Fade out near the end
            const opacity = progress < 0.8 ? 1 : 1 - ((progress - 0.8) / 0.2);

            particle.style.transform = `translateX(${sway}px) translateY(${y}%) rotate(${rotation}deg)`;
            particle.style.opacity = opacity;

            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    }, delay);
}

function startMoneyRain() {
    if (!moneyRainContainer || moneyRainTriggered) return;
    moneyRainTriggered = true;
    moneyRainActive = true;

    // Clear any existing particles
    moneyRainContainer.innerHTML = '';

    // Create particles in waves - MORE particles, faster spawning
    // First burst - big wave
    for (let i = 0; i < 20; i++) {
        createMoneyParticle(moneyRainContainer, i * 40);
    }

    // Second wave
    setTimeout(() => {
        for (let i = 0; i < 15; i++) {
            createMoneyParticle(moneyRainContainer, i * 50);
        }
    }, 300);

    // Third wave
    setTimeout(() => {
        for (let i = 0; i < 10; i++) {
            createMoneyParticle(moneyRainContainer, i * 60);
        }
    }, 600);

    // Fourth wave
    setTimeout(() => {
        for (let i = 0; i < 8; i++) {
            createMoneyParticle(moneyRainContainer, i * 70);
        }
    }, 900);
}

function stopMoneyRain() {
    moneyRainActive = false;
    moneyRainTriggered = false;
}

// Export for use in scroll handler
window.startMoneyRain = startMoneyRain;
window.stopMoneyRain = stopMoneyRain;

// ================================
// STATS COUNTER ANIMATION
// ================================
const statsSection = document.querySelector('.stats-section');
const statValues = document.querySelectorAll('.stat-value');
let statsAnimated = false;

function animateCounter(element, target, suffix = '', prefix = '', duration = 2000) {
    let startTime = null;
    const startValue = 0;

    const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out cubic for smooth deceleration
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (target - startValue) * easeOut);

        element.textContent = prefix + currentValue.toLocaleString() + suffix;

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.textContent = prefix + target.toLocaleString() + suffix;
        }
    };

    requestAnimationFrame(animate);
}

function animateStats() {
    if (statsAnimated) return;
    statsAnimated = true;

    statValues.forEach((stat) => {
        const text = stat.textContent;

        // Parse the stat value
        if (text.includes('50K')) {
            animateCounter(stat, 50, 'K+', '', 1800);
        } else if (text.includes('$12M')) {
            animateCounter(stat, 12, 'M', '$', 2000);
        } else if (text.includes('48hr')) {
            animateCounter(stat, 48, 'hr', '', 1500);
        } else if (text.includes('24/7')) {
            // Special case - just show it with a fade
            stat.style.opacity = '0';
            stat.style.transform = 'translateY(20px)';
            setTimeout(() => {
                stat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                stat.style.opacity = '1';
                stat.style.transform = 'translateY(0)';
            }, 200);
        }
    });
}

// Intersection Observer for stats section
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                statsObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.3
    });

    statsObserver.observe(statsSection);
}

// ================================
// VIDEO TILE ROTATION
// ================================
function initVideoTileRotation() {
    const tileVideos = document.querySelectorAll('.card-video-tile .tile-video');
    if (tileVideos.length === 0) return;

    let currentIndex = 0;
    const rotationInterval = 4000; // Rotate every 4 seconds

    // Set first video as active
    tileVideos[0].classList.add('active');

    setInterval(() => {
        // Remove active class from current video
        tileVideos[currentIndex].classList.remove('active');

        // Move to next video
        currentIndex = (currentIndex + 1) % tileVideos.length;

        // Add active class to new video
        tileVideos[currentIndex].classList.add('active');
    }, rotationInterval);
}

// Initialize video tile rotation when DOM is ready
document.addEventListener('DOMContentLoaded', initVideoTileRotation);
