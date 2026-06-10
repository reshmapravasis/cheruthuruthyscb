document.addEventListener('DOMContentLoaded', async () => {
    // Dynamically load header
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        try {
            const res = await fetch('header.html?v=' + new Date().getTime());
            headerPlaceholder.outerHTML = await res.text();
        } catch (e) {
            console.error('Error loading header:', e);
        }
    }

    // Dynamically load footer
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (footerPlaceholder) {
        try {
            const res = await fetch('footer.html?v=' + new Date().getTime());
            footerPlaceholder.outerHTML = await res.text();
        } catch (e) {
            console.error('Error loading footer:', e);
        }
    }

    // Initialize UI scripts after DOM components are loaded
    initApp();
});

function initApp() {
    const langBtn = document.getElementById('langToggle');
    let currentLang = localStorage.getItem('site_lang') || 'en';

    // Apply saved language
    if (currentLang === 'ml') {
        document.body.classList.add('ml-active');
        if (langBtn) langBtn.textContent = 'English';
    }

    // Toggle language
    if (langBtn) {
        langBtn.addEventListener('click', () => {
            document.body.classList.toggle('ml-active');
            if (document.body.classList.contains('ml-active')) {
                localStorage.setItem('site_lang', 'ml');
                langBtn.textContent = 'English';
            } else {
                localStorage.setItem('site_lang', 'en');
                langBtn.textContent = 'മലയാളം';
            }
        });
    }


    // Active link highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mainNav = document.getElementById('main-nav');
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Auto-open accordion if URL has a hash link
    if (window.location.hash) {
        const targetSection = document.querySelector(window.location.hash);
        if (targetSection) {
            // Find the first details accordion inside this section and open it
            const accordion = targetSection.querySelector('details.service-accordion');
            if (accordion) {
                // Add a small delay to ensure smooth scrolling finishes before opening
                setTimeout(() => {
                    accordion.setAttribute('open', '');
                }, 500);
            }
        }
    }
}

// Function for History section Read More toggle
window.toggleHistory = function() {
    const container = document.getElementById('historyTextContainer');
    const btn = document.getElementById('readMoreBtn');
    if (container && btn) {
        container.classList.toggle('expanded');
        btn.classList.toggle('expanded');
        
        const isExpanded = container.classList.contains('expanded');
        const langEn = btn.querySelector('.lang-en');
        const langMl = btn.querySelector('.lang-ml');
        
        if (isExpanded) {
            langEn.textContent = 'Read Less';
            langMl.textContent = 'ചുരുക്കി വായിക്കുക';
        } else {
            langEn.textContent = 'Read More';
            langMl.textContent = 'കൂടുതൽ വായിക്കുക';
        }
    }
};
