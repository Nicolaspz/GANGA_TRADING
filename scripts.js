document.addEventListener('DOMContentLoaded', () => {
    const langToggles = document.querySelectorAll('.lang-btn');
    const translatableElements = document.querySelectorAll('[data-pt]');

    const setLanguage = (lang) => {
        translatableElements.forEach(el => {
            if (lang === 'en' && el.getAttribute('data-en')) {
                el.innerHTML = el.getAttribute('data-en');
            } else {
                el.innerHTML = el.getAttribute('data-pt');
            }
        });

        // Update active button state
        langToggles.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });

        // Save preference
        localStorage.setItem('preferredLang', lang);
        document.documentElement.lang = lang;
    };

    langToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            setLanguage(btn.getAttribute('data-lang'));
        });
    });

    // Load saved language or default to PT
    const savedLang = localStorage.getItem('preferredLang') || 'pt';
    setLanguage(savedLang);

    // Scroll Reveal Animation
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                // Remove to allow re-animation when scrolling back
                entry.target.classList.remove('active');
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, {
        threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });
});
