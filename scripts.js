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
});
