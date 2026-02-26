(function () {
  'use strict';

  var STORAGE_KEY = 'wepush-lang';
  var DEFAULT_LANG = 'en';

  // Translations embedded directly — no fetch needed
  var translations = {
    de: {
      "page.title": "WePush \u2014 F\u00fcr Werbetreibende | Influencer Marketing leicht gemacht",
      "nav.howItWorks": "So funktioniert\u2019s",
      "nav.caseStudies": "Fallstudien",
      "nav.features": "Funktionen",
      "nav.pricing": "Preise",
      "nav.startFree": "Kostenlos starten",
      "hero.badge": "F\u00fcr Marken & Werbetreibende",
      "hero.title": "Influencer Marketing f\u00fcr <span class=\"gradient-text-static\">echte Skalierung.</span>",
      "hero.subtitle": "Einmal briefen, hunderte Creator pro Kampagne aktivieren und deine organische Reichweite maximieren. Verwalte jeden Schritt auf einer einzigen Plattform.",
      "hero.cta1": "Jetzt starten",
      "hero.cta2": "Demo buchen",
      "hero.targeting": "Creator-Targeting",
      "hero.targetingTag1": "Fashion",
      "hero.engagement": "Engagement",
      "hero.aiQuality": "KI<br>Qualit\u00e4ts<br>analyse",
      "brands.title": "Vertraut von Marken aller Branchen & Gr\u00f6\u00dfen mit skalierbaren Creator-Kampagnen",
      "howItWorks.sectionTitle": "So funktioniert\u2019s",
      "howItWorks.phase1": "1. <span class=\"accent\">Briefing</span> erstellen & <span class=\"accent\">Creator</span> ausw\u00e4hlen",
      "howItWorks.phase2": "2. <span class=\"accent\">Kampagne</span> starten & Content geht <span class=\"accent\">live</span>",
      "howItWorks.phase3": "3. Pr\u00fcfen & nur f\u00fcr das <span class=\"accent\">bezahlen</span>, was dir <span class=\"accent\">gef\u00e4llt</span>",
      "howItWorks.phase4": "4. <span class=\"accent\">Performance</span> verfolgen",
      "howItWorks.briefingTitle": "Kampagnen-Briefing",
      "howItWorks.briefingInstruction": "Erstelle ein authentisches Review, das das Produkt in deinem Alltag zeigt.",
      "howItWorks.briefingList1": "Zeige, wie du es t\u00e4glich nutzt",
      "howItWorks.briefingList2": "Hebe deine Lieblingsfeatures hervor",
      "howItWorks.briefingList3": "Teile deine ehrliche Erfahrung",
      "howItWorks.reference1": "Referenz 1",
      "howItWorks.reference2": "Referenz 2",
      "howItWorks.productsTitle": "Deine Produkte",
      "howItWorks.product1": "Mizellenwasser",
      "howItWorks.product2": "Hydrocolloid Patches",
      "howItWorks.product3": "Daily Hypo Spray",
      "howItWorks.targetingTitle": "Creator-Targeting",
      "howItWorks.niche": "Nische",
      "howItWorks.lifestyle": "Lifestyle",
      "howItWorks.fashion": "Fashion",
      "howItWorks.fitness": "Fitness",
      "howItWorks.audienceAge": "Zielgruppen-Alter",
      "howItWorks.location": "Standort",
      "howItWorks.germany": "\ud83c\udde9\ud83c\uddea Deutschland",
      "howItWorks.uk": "\ud83c\uddec\ud83c\udde7 Vereinigtes K\u00f6nigreich",
      "howItWorks.worldwide": "\ud83c\udf0d Weltweit",
      "howItWorks.creatorSize": "Creator-Gr\u00f6\u00dfe",
      "howItWorks.nanos": "\ud83c\udf31 Nanos",
      "howItWorks.micros": "\u2b50 Micros",
      "howItWorks.macros": "\ud83d\udd25 Macros",
      "howItWorks.megas": "\ud83d\udc51 Megas",
      "howItWorks.campaignLive": "Kampagne live",
      "howItWorks.active": "Aktiv",
      "howItWorks.campaignName": "Frühlings-Launch 2026",
      "howItWorks.campaignCreators": "247 teilnehmende Creator",
      "howItWorks.declined": "Abgelehnt",
      "howItWorks.approved": "Genehmigt",
      "howItWorks.totalViews": "Gesamtaufrufe",
      "howItWorks.costPerMille": "Tausend-Kontakt-Preis",
      "howItWorks.engagementRate": "Engagement-Rate",
      "howItWorks.comments": "Kommentare",
      "howItWorks.shares": "Shares",
      "howItWorks.costPerClick": "Kosten pro Klick",
      "howItWorks.clickThroughRate": "Klickrate",
      "howItWorks.returnOnAdSpend": "Return on Ad Spend",
      "howItWorks.scrollHint": "Scrollen zum Entdecken",
      "buyout.badge": "Neu",
      "buyout.title": "Sofortiger Content-<span class=\"text-accent\">Buyout</span> jetzt live auf WePush",
      "buyout.desc": "Kaufe jedes Video, das dir gef\u00e4llt, mit einem Klick aus einer Kampagne. Du bestimmst Dauer, Kan\u00e4le und Timing!",
      "buyout.benefit1": "Kein endloses Hin und Her mit Creatorn \u2013 sofortiger Zugriff auf das Asset",
      "buyout.benefit2": "Keine Last-Minute-Absagen oder Nachlaufen hinter fehlenden Assets",
      "buyout.benefit3": "Faire Preise \u2013 abh\u00e4ngig von gew\u00fcnschter Nutzungsdauer und Kan\u00e4len",
      "buyout.cta": "So funktioniert\u2019s",
      "caseStudies.title": "So sieht <span class=\"text-accent\">Erfolg</span> aus.",
      "caseStudies.sidebarTitle": "Ergebnisse in deiner Branche",
      "caseStudies.beauty": "Beauty",
      "caseStudies.beautySubtitle": "Kosmetik & Hautpflege",
      "caseStudies.travel": "Reisen",
      "caseStudies.travelSubtitle": "Reisen & Transport",
      "caseStudies.food": "Food & Getr\u00e4nke",
      "caseStudies.foodSubtitle": "Restaurants & Lieferdienste",
      "caseStudies.movies": "Film & Serien",
      "caseStudies.moviesSubtitle": "Filme & Entertainment",
      "caseStudies.retail": "Einzelhandel",
      "caseStudies.retailSubtitle": "Shopping & Handel",
      "caseStudies.music": "Musik",
      "caseStudies.musicSubtitle": "K\u00fcnstler & Labels",
      "caseStudies.dating": "Dating",
      "caseStudies.datingSubtitle": "Apps & Partnervermittlung",
      "caseStudies.fitnessTab": "Fitness",
      "caseStudies.fitnessSubtitle": "Sport & Laufen",
      "caseStudies.learnMore": "Mehr erfahren",
      "caseStudies.totalViews": "Gesamtaufrufe",
      "caseStudies.creatorVideos": "Creator-Videos",
      "caseStudies.cpm": "CPM",
      "caseStudies.firstVideoLive": "Erstes Video live",
      "caseStudies.organicViews": "Organische Aufrufe",
      "caseStudies.totalEngagements": "Gesamte Interaktionen",
      "caseStudies.fromZeroToLive": "Von 0 bis Kampagnenstart",
      "caseStudies.duration": "Dauer",
      "caseStudies.goLiveTo50": "Go-Live bis 50+ Videos",
      "caseStudies.appDownloads": "App-Downloads",
      "caseStudies.costPerResult": "Kosten pro Ergebnis (Download)",
      "caseStudies.performanceVsPaid": "Performance vs. bezahlte Werbung",
      "caseStudies.beautyDesc": "Erfahre, wie INAO by Essence den Launch von drei neuen Produkten mit authentischen & organischen Creator-Videos \u00fcber die SongPush-Plattform angeschoben hat.",
      "caseStudies.travelDesc": "Erfahre, wie OMIO die SongPush-Plattform genutzt hat, um authentische & organische Creator-Videos in gro\u00dfem Ma\u00dfstab zu generieren.",
      "caseStudies.foodDesc": "In nur 10 Minuten startete NeoTaste einen Creator-Push, der Food-Liebhaber in treue App-Nutzer verwandelte \u2013 mit \u00fcber 320.000 organischen Aufrufen und 23.000+ Interaktionen.",
      "caseStudies.moviesDesc": "Paramount Pictures steigerte die Bekanntheit von \"Gladiator II\" mit 220 Creator-Videos und erzielte innerhalb von 48 Stunden fast 600.000 organische TikTok-Aufrufe.",
      "caseStudies.retailDesc": "Erfahre, wie J*ST FOOD mit SongPush authentische Creator-Videos aktiviert hat, um >1,4 Mio. organische TikTok-Aufrufe und bedeutsames Verbraucher-Engagement zu erzielen.",
      "caseStudies.musicDesc": "Erfahre, wie The Orchard die SongPush-Plattform genutzt hat, um >400 authentische & hochwertige Creator-Videos und ca. 7,2 Mio. Aufrufe in Deutschland & DACH zu generieren.",
      "caseStudies.datingDesc": "Mit einer einzigen WePush-Kampagne an die Spitze der App-Store-Charts.",
      "caseStudies.fitnessDesc": "Entdecke, wie Enduco Neujahrsvors\u00e4tze in Ergebnisse verwandelt hat, indem SongPush f\u00fcr eine Creator-gesteuerte Promo-Code-Kampagne genutzt wurde.",
      "ownProof.badge": "DER ULTIMATIVE BEWEIS",
      "ownProof.headline": "Wir stehen zu<br>unserem Wort",
      "ownProof.subtext": "Wir bauen nicht nur die Plattform – wir nutzen sie als unseren #1 Marketingkanal, um unsere eigene App zu wachsen",
      "ownProof.cardName": "SongPush App",
      "ownProof.cardSubtitle": "Beworben mit WePush",
      "ownProof.appDownloads": "App-Downloads",
      "ownProof.costPerDownload": "Kosten pro Download",
      "ownProof.duration": "Dauer",
      "ownProof.vsPaidAds": "vs. bezahlte Werbung",
      "ownProof.cta": "Vollständige Fallstudie lesen",
      "creativity.title": "Wir belohnen <span class=\"text-accent\">Kreativit\u00e4t.</span><br>Nicht Follower.",
      "creativity.subtitle": "Maximiere deinen organischen Video-Output. Kaufe die best-performenden Videos. Skaliere validierte Assets weiter mit Paid Ads.",
      "analytics.cpm": "CPM",
      "analytics.lastCampaign": "letzte Kampagne",
      "analytics.campaignBudgetLeft": "Verbleibendes Kampagnenbudget",
      "analytics.analytics": "Analysen",
      "analytics.campaignPerformance": "Kampagnen-Performance",
      "analytics.totalViews": "Gesamtaufrufe",
      "analytics.yourPerformance": "Deine Performance",
      "analytics.cooperationOverview": "Kooperations\u00fcbersicht:",
      "analytics.newCreations": "neue Kreationen in den letzten 7 Tagen",
      "analytics.performance": "Performance",
      "stats.activeCreators": "Aktive Creator in allen Regionen",
      "stats.campaignsLaunched": "Gestartete Kampagnen",
      "stats.happyCustomers": "zufriedene Kunden",
      "bento.title": "<span class=\"text-primary\">Creator Marketing</span> wie es sein sollte.",
      "bento.subtitle": "F\u00fchre endlich skalierbare Creator-Kampagnen durch \u2013 mit der fortschrittlichsten Creator-Technologie auf dem Markt.",
      "bento.aiMatchingTag": "KI-gest\u00fctztes Matching",
      "bento.aiMatchingTitle": "Das perfekte Match",
      "bento.aiMatchingDesc": "Definiere deine Kampagnenkriterien und lass unsere KI automatisch die perfekten Creator finden.",
      "bento.creatorSourcingTag": "Creator-Beschaffung",
      "bento.creatorSourcingTitle": "100K+<br>Creator",
      "bento.creatorSourcingDesc": "Sobald deine Kampagne live ist, k\u00f6nnen >100k Creator beitreten und ihren Content einreichen. Kein Outreach. Keine Verhandlungen. Die schnellste Content-Lieferung auf dem Markt.",
      "bento.aiOptimizedTitle": "KI-optimiert",
      "bento.aiOptimizedDesc": "Unsere KI analysiert Millionen von Datenpunkten, um dein virales Potenzial zu maximieren.",
      "bento.brandSafetyTitle": "Markensicherheit & Qualit\u00e4tspr\u00fcfung",
      "bento.brandSafetyDesc": "Dein einziges To-Do? Eingehende Kreationen ansehen und kostenlos ablehnen, wenn der Content nicht deinen Vorstellungen entspricht. Das Budget flie\u00dft zur\u00fcck in den Kampagnenpool f\u00fcr andere Creator.",
      "bento.analyticsTag": "Echtzeit-Einblicke",
      "bento.analyticsTitle": "Analysen & Reporting",
      "bento.analyticsDesc": "\u00dcberwache alle relevanten Kennzahlen in deinem Account in Echtzeit. Lade alle Performance-Metriken als .csv & xlsx herunter.",
      "bento.payPerResultTitle": "Bezahlung pro Ergebnis",
      "bento.payPerResultDesc": "Zahle nur, wenn Content die Ziel-Aufrufe erreicht.",
      "bento.globalReachTitle": "Globale Reichweite",
      "bento.globalReachDesc": "Filtere Creator nach Region, Sprache und Demografie.",
      "bento.buyoutTag": "Content-Lizenzierung",
      "bento.buyoutTitle": "Buyouts",
      "bento.buyoutDesc": "Sofortige Buyouts der best-performenden Kampagnenvideos. Identifiziere die besten organischen Assets und skaliere sie sofort auf deinen gew\u00fcnschten Paid-Ads-Kan\u00e4len.",
      "bento.contentTypesTag": "Multi-Plattform",
      "bento.contentTypesTitle": "Alle Content-Formate",
      "bento.contentTypesDesc": "Erreiche Zielgruppen auf TikTok und Instagram mit Kurzvideos, Reels und Stories.",
      "bento.aiBriefingTag": "KI-gest\u00fctzt",
      "bento.aiBriefingTitle": "KI-Briefing-Generator",
      "bento.aiBriefingDesc": "Trainiert auf den best-performenden Briefings jeder Branche. >95% der erstellten Briefs werden in echten Kampagnen verwendet.",
      "bento.billingTitle": "Abrechnung & Rechnungsstellung",
      "bento.billingDesc": "Vollautomatische Abrechnung & Rechnungserstellung f\u00fcr Werbetreibende & Creator. \"Zahlung per Rechnung\" verf\u00fcgbar!",
      "bento.autopilotTag": "Automatisierung",
      "bento.autopilotTitle": "Hands-Off Workflow",
      "bento.autopilotDesc": "Starte deine Kampagne und schau zu, wie die Magie geschieht. Unsere KI erledigt alles automatisch.",
      "bento.andMore": "und viele mehr...",
      "testimonials.heading": "Erster Effekt?<br>In weniger als 10 Minuten.",
      "testimonials.subheading": "Aufw\u00e4ndiger Overhead bei der Planung von Releases mit Creatorn geh\u00f6rt der Vergangenheit an.",
      "testimonials.role1": "CEO & Gr\u00fcnder @Blindmate",
      "testimonials.quote1": "\"Seit wir vor einem Jahr unsere erste Kampagne gestartet haben, ist WePush der Treibstoff f\u00fcr unser Wachstum \u2013 es hat uns mehrfach in die App-Store-Charts katapultiert und zehntausende App-Downloads generiert.\"",
      "testimonials.role2": "CEO & Co-Founder laria<br>Ex-Managing Director DEPARTD",
      "testimonials.quote2": "\"Die Kombination aus Plattform-Power mit zehntausenden Creatorn auf WePush und Branded Effects wie TikTok-Filtern ist einfach beeindruckend.\"",
      "testimonials.role3": "Multi Platin- & Gold S\u00e4nger & Songwriter",
      "testimonials.quote3": "\"Ein unglaubliches Tool f\u00fcr jeden Werbetreibenden. Hunderte Kreationen auf Knopfdruck ohne Kopfschmerzen sind ein Game Changer.\"",
      "testimonials.role4": "Cosnova",
      "testimonials.quote4": "\"Was früher Wochen gedauert hat, läuft mit WePush in einem Bruchteil der Zeit. Von der Creator-Suche, Auswahl, Content Delivery über Buyouts und Billing bildet die Plattform alles ab, um Kampagnen für unsere Produkte & Brands im großem Stil umzusetzen. Für uns ein absoluter Gamechanger!\"",
      "guideflow.title": "So funktioniert\u2019s",
      "guideflow.subtitle": "Starte deine erste Kampagne in wenigen Minuten mit unserer intuitiven Plattform.",
      "pricing.badge": "Preise",
      "pricing.title": "Vergiss monatliche Geb\u00fchren.",
      "pricing.subtitle": "Erstelle dein kostenloses Konto. Bestimme dein Budget. Starte, wenn du bereit bist.",
      "pricing.card1Highlight": "0\u20ac/Monat \u2013 immer",
      "pricing.card1Title": "F\u00fcr immer kostenlos",
      "pricing.card1Desc": "Keine Abos, keine monatlichen Geb\u00fchren, keine Jahresvertr\u00e4ge. Erstelle einfach dein Konto und starte Kampagnen.",
      "pricing.card2Highlight": "\u221e Mitglieder \u2013 0\u20ac extra",
      "pricing.card2Title": "Unbegrenztes Team",
      "pricing.card2Desc": "Lade dein gesamtes Team ein \u2013 Marketer, Manager, Praktikanten, alle. Kein Preis pro Platz. Voller Zugang f\u00fcr alle.",
      "pricing.card3Highlight": "Deine Regeln \u2013 dein Budget",
      "pricing.card3Title": "Du bestimmst das Budget",
      "pricing.card3Desc": "Du entscheidest, wie viel du ausgibst und wann deine Kampagne live geht. Volle Kontrolle, volle Transparenz. Zahle nur f\u00fcr Ergebnisse.",
      "pricing.card4Badge": "Bonus",
      "pricing.card4Title": "Kostenlose Tools inklusive",
      "pricing.card4Desc": "Erhalte Zugang zu leistungsstarken Tools ohne Mehrkosten \u2013 wie unserem KI-gest\u00fctzten Briefing-Generator f\u00fcr professionelle Kampagnen-Briefs.",
      "pricing.cta": "Kostenloses Konto erstellen",
      "pricing.ctaNote": "Keine Kreditkarte erforderlich",
      "faq.badge": "FAQ",
      "faq.title": "Hast du eine Frage?",
      "faq.subtitle": "Alles, was du \u00fcber das Schalten von Kampagnen auf WePush wissen musst.",
      "faq.q1": "Wie h\u00e4ngen WePush und SongPush zusammen?",
      "faq.a1": "W\u00e4hrend SongPush Songs von K\u00fcnstlern und Musiklabels \u00fcber Audio-Content bewirbt, unterst\u00fctzen wir mit WePush Marken bei der Vermarktung ihrer Produkte.",
      "faq.q2": "Was ist WePush und wie funktioniert es?",
      "faq.a2": "WePush ist eine Plattform, die Marken und Musik-Creator mit TikTok-Creatorn verbindet. Sie erm\u00f6glicht es dir, eine Kampagne zu starten, bei der ausgew\u00e4hlte TikTok-Creator Kurzvideos mit deinem Song oder Produkt erstellen. Die WePush-Plattform \u00fcbernimmt automatisch die Auswahl geeigneter Creator und das Briefing, wodurch Creator-Marketing f\u00fcr Marken sehr einfach wird. In der Praxis bedeutet das: Du l\u00e4dst Informationen \u00fcber das Produkt (oder den Sound) hoch, definierst Ziele und Budget, und WePush organisiert hunderte TikTok-Videos \u00fcber passende Creator. Durch stetige Qualit\u00e4tsverbesserungen (z.\u00a0B. Entfernung von wirkungsschwachen Creatorn und Aufnahme tausender Top-Creator) erzielen WePush-Kampagnen gro\u00dfe Reichweite und Wirkung auf TikTok.",
      "faq.q3": "Wie starte ich eine Kampagne mit WePush?",
      "faq.a3": "Um eine Kampagne zu starten, musst du zun\u00e4chst ein Manager-Konto bei WePush erstellen (z.\u00a0B. als Label oder Marke). Gehe auf die WePush-Website und registriere dich als Werbetreibender/Manager. Nach Best\u00e4tigung deiner E-Mail wird dein Konto vom WePush-Team gepr\u00fcft und aktiviert (das dauert in der Regel nicht l\u00e4nger als ein bis zwei Werktage). Sobald dein Konto aktiviert ist, kannst du Produkte (oder Songs) hinzuf\u00fcgen, Teammitglieder einladen und deine ersten Kampagnen erstellen. Die Kampagnenerstellung erfolgt \u00fcber ein Dashboard oder die App, indem du alle wichtigen Daten eingibst (Produkt, Song-/TikTok-Link, Kampagnenziel, gew\u00fcnschtes Startdatum, Budget usw.). Nach Absenden der Kampagnenanfrage meldet sich das WePush-Team so schnell wie m\u00f6glich bei dir, um den Kampagnenstart zu unterst\u00fctzen. In vielen F\u00e4llen k\u00f6nnen Kampagnen innerhalb weniger Tage live gehen, insbesondere wenn alle Informationen vorliegen und die Zahlung erfolgt ist. Du kannst auch ein Wunsch-Go-Live-Datum angeben, an dem die Kampagne starten soll.",
      "faq.q4": "Wie lange dauert es, bis meine Kampagne live geht?",
      "faq.a4": "In der Regel kann eine Kampagne sehr schnell gestartet werden, sobald dein Konto aktiviert und die Kampagnendetails finalisiert sind. Die Kontoverifizierung dauert in der Regel bis zu 2 Werktage. Danach h\u00e4ngt der Zeitplan von dir ab: Du legst ein Startdatum fest oder stimmst es mit uns ab. Viele Kampagnen k\u00f6nnen innerhalb weniger Tage nach Buchung live gehen, insbesondere wenn das Budget bezahlt und das Briefing klar ist. WePush fragt sogar nach deinem idealen Go-Live-Datum, um sich darauf abzustimmen. Sollte es bei der \u00dcberpr\u00fcfung oder Vorbereitung zu Verz\u00f6gerungen kommen, steht das WePush-Team bereit, um zu helfen \u2013 beispielsweise wenn die Aktivierung l\u00e4nger dauert als erwartet. Insgesamt kannst du unter normalen Umst\u00e4nden damit rechnen, dass deine Kampagne innerhalb von 2\u20135 Werktagen live geht, sofern alle Voraussetzungen erf\u00fcllt sind.",
      "faq.q5": "Gibt es ein Mindestbudget f\u00fcr Kampagnen?",
      "faq.a5": "Ja, WePush erfordert ein Mindestbudget, um eine Kampagne zu starten. Der Mindestbetrag liegt typischerweise im niedrigen dreistelligen Euro-Bereich. Aktuell werden mindestens ca. 300\u2013500 EUR Budget ben\u00f6tigt, um eine Kampagne zu starten. (Je nach Kampagnentyp kann das Mindestbudget variieren \u2013 siehe Pakete unten. Beispielsweise erfordert eine Kampagne, die sich ausschlie\u00dflich auf Micro-Creator konzentriert, mindestens ca. 500 EUR Budget, w\u00e4hrend eine Kampagne mit gr\u00f6\u00dferen Creatorn etwas h\u00f6her ansetzen muss). Dieses Mindestbudget stellt sicher, dass gen\u00fcgend Creator aktiviert werden k\u00f6nnen und die Kampagne eine Wirkung erzielt. Betr\u00e4ge unterhalb dieser Schwelle sind nicht verf\u00fcgbar.",
      "faq.q6": "Welche Kampagnenpakete gibt es bei WePush und was kosten sie?",
      "faq.a6": "WePush bietet verschiedene Kampagnenpakete oder -ausrichtungen basierend auf Creator-Gr\u00f6\u00dfe und Zielen an. Im Wesentlichen gibt es drei Kategorien:<br><br><strong>Nano/Micro-Creator-Kampagne:</strong> Fokus auf m\u00f6glichst viele Videos durch viele kleinere Creator. Dieses Paket zielt darauf ab, die Anzahl der Videos zu maximieren, und hat ein Mindestbudget von ca. 500 EUR. Es ist ideal, wenn du eine breite Reichweite durch viele Micro-Influencer suchst.<br><br><strong>Macro-Creator-Kampagne:</strong> Fokus auf gr\u00f6\u00dfere TikTok-Creator mit mehr Followern. Hier erh\u00e4ltst du weniger, aber reichweitenst\u00e4rkere Videos. Das Mindestbudget liegt bei ca. 1.000 EUR f\u00fcr Macro-fokussierte Kampagnen. Dieses Paket eignet sich, wenn du gezielt mit einigen gr\u00f6\u00dferen Influencern arbeiten m\u00f6chtest.<br><br><strong>Mix (Kombination aus Micro und Macro):</strong> WePush empfiehlt eine Mischung beider Ans\u00e4tze. Ein Mix-Paket nutzt sowohl viele kleine als auch mehrere gr\u00f6\u00dfere Creator f\u00fcr einen ausgewogenen Effekt. Ein Budget von ca. 1.500 EUR oder mehr wird hier empfohlen. Mit einem h\u00f6heren Budget k\u00f6nnen zus\u00e4tzliche Features aktiviert werden \u2013 beispielsweise wird deine Kampagne ab ca. 5.000 EUR Budget auch \u00fcber eine Push-Benachrichtigung beworben und dein Song wird prominent in der SongPush-App gelistet.<br><br>Die Kosten einer Kampagne h\u00e4ngen letztlich von deinem gew\u00e4hlten Budget ab \u2013 du hast die Flexibilit\u00e4t, das Budget nach deinen Zielen festzulegen. SongPush skaliert die Anzahl der Creator und Videos entsprechend. Zur Orientierung: ca. 3.000 EUR Budget erm\u00f6glicht rund 200+ Creator-Videos auf TikTok. Kleinere Budgets liefern weniger Videos, gr\u00f6\u00dfere Budgets bringen mehr Content und m\u00f6glicherweise zus\u00e4tzliche Services. SongPush ber\u00e4t dich gerne bei der Wahl des richtigen Pakets f\u00fcr deine Ziele.",
      "faq.q7": "Wie viele TikTok-Videos oder Creator bekomme ich pro Kampagne?",
      "faq.a7": "Die Anzahl der Creator und Videos h\u00e4ngt ma\u00dfgeblich von deinem Budget und dem gew\u00e4hlten Paket ab. WePush skaliert die Kampagne entsprechend: Je h\u00f6her das Budget, desto mehr Creator k\u00f6nnen aktiviert und desto mehr Videos erstellt werden. Ein Budget von ca. 3.000 EUR kann beispielsweise ca. 200\u2013220 TikTok-Kreationen erzeugen. Ein kleineres Testbudget (z.\u00a0B. 500 EUR) w\u00fcrde weniger Videos ergeben, w\u00e4hrend sehr gro\u00dfe Budgets (mehrere tausend Euro) hunderte Videos generieren k\u00f6nnen.<br><br>Wichtig zu wissen: Du buchst nicht im Voraus eine feste Anzahl an Videos, sondern WePush sorgt f\u00fcr so viele hochwertige Videos wie m\u00f6glich innerhalb deines Budgets. Ein Kunde, der WePush zun\u00e4chst ausprobieren wollte, war unsicher, \"wie viele Videos, welcher Creator usw.\" am Ende herauskommen w\u00fcrden. Die Antwort: Selbst mit dem Mindestbudget sind genug Creator beteiligt, um einen sp\u00fcrbaren Effekt zu erzielen. Mit jeder Budgeterh\u00f6hung (von 500 EUR auf 1.000 EUR oder mehr, beispielsweise) steigt die ungef\u00e4hre Anzahl der Videos deutlich. WePush kann dir vorab eine Sch\u00e4tzung geben, wie viele Kreationen zu erwarten sind. Generell gilt: mehr Budget = mehr Creator-Videos (mit abnehmendem Grenznutzen bei sehr gro\u00dfen Volumina). Die genaue Anzahl variiert pro Kampagne, aber WePush optimiert immer, um das Maximum aus deinem Budget herauszuholen.",
      "faq.q8": "Wie funktioniert die Bezahlung und erhalte ich eine Rechnung f\u00fcr die Kampagne?",
      "faq.a8": "Die Bezahlung deiner SongPush-Kampagne ist flexibel. Wenn du die Kampagne \u00fcber das WePush-Online-Tool buchst, kannst du bequem per Kreditkarte bezahlen. Viele Kunden (insbesondere Unternehmen) bevorzugen die Arbeit mit einer klassischen Rechnung oder Bestellnummer (PO \u2013 Purchase Order). WePush unterst\u00fctzt dies: Du kannst bei der Buchung eine Rechnungsadresse und eine Bestellnummer/PO-Nummer angeben. In diesem Fall erh\u00e4ltst du eine offizielle Rechnung \u00fcber den Kampagnenbetrag, die du wie gewohnt per Bank\u00fcberweisung bezahlen kannst. WePush fragt im Bestellformular explizit nach Rechnungsadresse und PO, um die Abwicklung f\u00fcr Firmenkunden zu erleichtern.<br><br>Zus\u00e4tzlich bietet SongPush eine Team-Wallet-Option an: Dies ist eine Art Guthabenkonto, das du im Voraus aufladen kannst. Diese Option ist hilfreich, wenn beispielsweise Kreditkartenzahlungen oder einzelne POs umst\u00e4ndlich sind. Das Team Wallet erm\u00f6glicht es dir, Kampagnen ohne direkte Kreditkarten- oder PO-Eingabe zu starten \u2013 du nutzt einfach dein zuvor eingezahltes Guthaben.<br><br>Kurz gesagt: Zahlungsmethoden umfassen Kreditkarte, Rechnung per PO und das aufladbare Team Wallet. In allen F\u00e4llen sorgt WePush daf\u00fcr, dass du eine Rechnung/Quittung f\u00fcr die Kampagne erh\u00e4ltst (entweder sofort bei Kreditkartenzahlung oder auf herk\u00f6mmlichem Weg per Rechnung bei PO). Unternehmen k\u00f6nnen so ihre Buchhaltung intern verwalten, und alle Zahlungen sind klar dokumentiert.",
      "faq.checkOutLink": "Sieh dir unsere FAQs an",
      "creatorCta.badge": "F\u00fcr Creator",
      "creatorCta.title": "Bist du ein Creator?",
      "creatorCta.desc": "M\u00f6chtest du Geld verdienen, indem du Content f\u00fcr Top-Marken erstellst? Schlie\u00dfe dich 50.000+ Creatorn auf WePush an und verdiene noch heute.",
      "creatorCta.button": "Jetzt verdienen",
      "mainCta.title": "Bereit, deine<br>Kampagne zu starten?",
      "mainCta.text": "Schlie\u00dfe dich hunderten Marken an, die Millionen durch authentischen Creator-Content erreichen",
      "mainCta.button": "Kampagne starten",
      "mainCta.feature1": "\u2713 KI-optimiert",
      "mainCta.feature2": "\u2713 Bezahlung pro Ergebnis",
      "mainCta.feature3": "\u2713 Markensicherheit",
      "recordLabelCta.title": "Bist du ein Plattenlabel?",
      "recordLabelCta.desc": "Suchst du SongPush, um deine Musik zu bewerben? Besuche unsere dedizierte Plattform f\u00fcr K\u00fcnstler und Labels.",
      "recordLabelCta.button": "Zu SongPush.com",
      "footer.tagline": "Das f\u00fchrende Betriebssystem der Creator Economy",
      "footer.product": "Produkt",
      "footer.howItWorks": "So funktioniert\u2019s",
      "footer.pricing": "Preise",
      "footer.caseStudies": "Fallstudien",
      "footer.company": "Unternehmen",
      "footer.careers": "Karriere",
      "footer.legal": "Rechtliches",
      "footer.imprint": "Impressum",
      "footer.copyright": "\u00a9 2025 WePush. Alle Rechte vorbehalten."
    }
  };

  function getCurrentLang() {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;

    // First visit: detect browser language
    var browserLang = (navigator.language || navigator.userLanguage || '').toLowerCase();
    if (browserLang.indexOf('de') === 0) return 'de';
    return DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
  }

  function getTranslations(lang) {
    return translations[lang] || null;
  }

  function applyTranslations(data) {
    var elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = data[key];
      if (value === undefined) return;

      if (!el.hasAttribute('data-i18n-original')) {
        if (el.hasAttribute('data-i18n-html')) {
          el.setAttribute('data-i18n-original', el.innerHTML);
        } else {
          el.setAttribute('data-i18n-original', el.textContent);
        }
      }

      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = value;
      } else {
        el.textContent = value;
      }
    });

    var placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      var value = data[key];
      if (value === undefined) return;

      if (!el.hasAttribute('data-i18n-placeholder-original')) {
        el.setAttribute('data-i18n-placeholder-original', el.getAttribute('placeholder') || '');
      }
      el.setAttribute('placeholder', value);
    });

    if (data['page.title']) {
      if (!document._originalTitle) {
        document._originalTitle = document.title;
      }
      document.title = data['page.title'];
    }

    document.documentElement.lang = getCurrentLang();
  }

  function restoreOriginals() {
    var elements = document.querySelectorAll('[data-i18n-original]');
    elements.forEach(function (el) {
      var original = el.getAttribute('data-i18n-original');
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = original;
      } else {
        el.textContent = original;
      }
      el.removeAttribute('data-i18n-original');
    });

    var placeholderElements = document.querySelectorAll('[data-i18n-placeholder-original]');
    placeholderElements.forEach(function (el) {
      el.setAttribute('placeholder', el.getAttribute('data-i18n-placeholder-original'));
      el.removeAttribute('data-i18n-placeholder-original');
    });

    if (document._originalTitle) {
      document.title = document._originalTitle;
    }

    document.documentElement.lang = DEFAULT_LANG;
  }

  function updateSwitcher(lang) {
    var buttons = document.querySelectorAll('[data-lang-switch]');
    buttons.forEach(function (btn) {
      if (btn.getAttribute('data-lang-switch') === lang) {
        btn.classList.add('lang-active');
      } else {
        btn.classList.remove('lang-active');
      }
    });
  }

  function switchLanguage(lang) {
    setLang(lang);
    updateSwitcher(lang);

    if (lang === DEFAULT_LANG) {
      restoreOriginals();
      return;
    }

    var data = getTranslations(lang);
    if (data) {
      applyTranslations(data);
    }
  }

  function init() {
    var lang = getCurrentLang();
    updateSwitcher(lang);

    document.querySelectorAll('[data-lang-switch]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        var targetLang = this.getAttribute('data-lang-switch');
        switchLanguage(targetLang);
      });
    });

    if (lang !== DEFAULT_LANG) {
      switchLanguage(lang);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
