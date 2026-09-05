// Global URL Interceptor to clean paths before sending to Umami
window.cleanUmamiUrl = function (type, payload) {
    if (payload && payload.url) {
        // Strip unnecessary subpaths or trailing slashes for cleaner dashboard visibility
        payload.url = payload.url.replace('/plugin-full-calendar', '') || '/';
    }
    return payload;
};

// 1. Load Umami Script Dynamically
(function () {
    var el = document.createElement('script');
    el.setAttribute('src', 'https://injest.destyleer.in.net/assets/js/theme-utils.js');
    el.setAttribute('data-website-id', '90c7923c-80bc-4088-b8be-a5586860fc3e');
    el.setAttribute('data-host-url', 'https://injest.destyleer.in.net');
    el.setAttribute('data-before-send', 'cleanUmamiUrl');
    el.setAttribute('data-performance', 'true');
    el.setAttribute('async', 'true');

    el.onload = function () {
        syncUmamiSessionProperties();
    };
    document.head.appendChild(el);
})();

// Global Helper for Custom Umami Event Tracking
function investigateUmamiEvent(eventName, eventData) {
    if (window.umami && typeof window.umami.track === 'function') {
        if (eventData && eventData.page) {
            eventData.page = eventData.page.replace('/plugin-full-calendar', '') || '/';
        }
        window.umami.track(eventName, eventData);
    }
}

// Anonymous Session Properties Identification
function syncUmamiSessionProperties() {
    if (window.umami && typeof window.umami.identify === 'function') {
        var activeScheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';

        window.umami.identify({
            theme_preference: activeScheme,
            screen_tier: window.innerWidth > 1200 ? 'desktop_wide' : (window.innerWidth > 768 ? 'tablet' : 'mobile'),
            device_orientation: window.innerWidth > window.innerHeight ? 'landscape' : 'portrait',
            browser_language: navigator.language || 'unknown'
        });
    }
}

// Track Document Printing / PDF Exports
window.addEventListener('beforeprint', function () {
    investigateUmamiEvent('exported_pdf', { page: window.location.pathname });
});

// Timers and Scroll state to prevent listener leakage
let activeTimers = [];
const clearActiveTimers = () => {
    activeTimers.forEach(clearTimeout);
    activeTimers = [];
};

var scrollTriggered = false;
var scrollHandler = function () {
    if (!scrollTriggered) {
        var h = document.documentElement,
            b = document.body,
            st = 'scrollTop',
            sh = 'scrollHeight';
        var percent = (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100;
        if (percent >= 90) {
            scrollTriggered = true;
            investigateUmamiEvent('scrolled_90', { page: window.location.pathname });
            window.removeEventListener('scroll', scrollHandler);
        }
    }
};

// Lifecycle init function for both Static Astro & MkDocs SPA
function initAnalyticsPage() {
    const currentPath = window.location.pathname;

    clearActiveTimers();
    window.removeEventListener('scroll', scrollHandler);
    scrollTriggered = false;
    window.addEventListener('scroll', scrollHandler, { passive: true });

    syncUmamiSessionProperties();

    // 404 Error Tracker
    if (document.title.includes("404") || document.querySelector('h1')?.innerText.includes("404")) {
        investigateUmamiEvent('404_error', {
            broken_url: currentPath,
            came_from: document.referrer || 'Direct Link / Bookmark'
        });
    }

    // PDF Downloads Tracker
    var pdfLinks = document.querySelectorAll('a[href$=".pdf"], a[href*="/uploads/"]');
    pdfLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            var fileName = link.getAttribute('href') || 'unknown.pdf';
            investigateUmamiEvent('download_pdf', {
                file: fileName,
                page: currentPath
            });
        });
    });

    // Code Block Copy Tracker
    var copyButtons = document.querySelectorAll('.copy-code-btn, .md-clipboard');
    copyButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var codeBlock = btn.closest('pre') || btn.closest('.highlight');
            var language = codeBlock ? (codeBlock.getAttribute('data-language') || 'code') : 'code';

            investigateUmamiEvent('copied_code', {
                language: language,
                page: currentPath
            });
        });
    });

    // Outbound External Links Tracker
    var allLinks = document.querySelectorAll('a[href^="http"]');
    allLinks.forEach(function (link) {
        try {
            var url = new URL(link.href);
            if (url.hostname !== window.location.hostname && !url.hostname.includes('injest.destyleer.in.net')) {
                link.addEventListener('click', function () {
                    investigateUmamiEvent('outbound_exit', {
                        destination: link.href,
                        page: currentPath
                    });
                });
            }
        } catch (e) { }
    });

    // Table of Contents Anchor Tracking
    var tocLinks = document.querySelectorAll('a[href^="#"]');
    tocLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            investigateUmamiEvent('clicked_toc_anchor', {
                anchor: link.getAttribute('href'),
                anchor_text: link.innerText.trim(),
                page: currentPath
            });
        });
    });

    // Project Filter Buttons Tracking
    var filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            investigateUmamiEvent('filter_projects', {
                category: btn.getAttribute('data-filter') || 'All',
                page: currentPath
            });
        });
    });

    // Time-on-Page Milestones
    const setMilestone = (seconds, label) => {
        activeTimers.push(setTimeout(() => {
            investigateUmamiEvent('time_milestone', { duration: label, page: currentPath });
        }, seconds * 1000));
    };

    setMilestone(30, '30_seconds');
    setMilestone(120, '2_minutes');
    setMilestone(300, '5_minutes');
}

// Bind to DOM ready, Astro View Transitions, and optional MkDocs lifecycle
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAnalyticsPage);
} else {
    initAnalyticsPage();
}

document.addEventListener('astro:page-load', initAnalyticsPage);

if (typeof window.document$ !== 'undefined' && typeof window.document$.subscribe === 'function') {
    window.document$.subscribe(initAnalyticsPage);
}
