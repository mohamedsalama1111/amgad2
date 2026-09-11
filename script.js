document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. Mobile Navigation Menu Toggle
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    /* ==========================================================================
       2. Dark / Light Theme Toggle
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');

    // Check saved theme or default to light
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        let theme = document.documentElement.getAttribute('data-theme');
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
    });

    /* ==========================================================================
       3. Dynamic Quote Generator
       ========================================================================== */
    const quotes = [
        {
            text: "العلماء ورثة الأنبياء، وإن الأنبياء لم يورثوا ديناراً ولا درهماً وإنما ورثوا العلم.",
            author: "- حديث شريف -"
        },
        {
            text: "الخَيْلُ وَاللَّيْلُ وَالبَيْداءُ تَعرِفُني ... وَالسَيفُ وَالرُمحُ وَالقِرطاسُ وَالقَلَمُ",
            author: "- أبو الطيب المتنبي -"
        },
        {
            text: "من لم يتعلم في صغره لم تقدم في كبره.",
            author: "- الإمام الشافعي -"
        },
        {
            text: "إن العقل هو أعدل الأشياء توزيغاً بين الناس.",
            author: "- ابن رشد -"
        },
        {
            text: "العلم بلا عمل كالشجر بلا ثمر.",
            author: "- حكمة عربية -"
        }
    ];

    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const nextQuoteBtn = document.getElementById('next-quote-btn');

    nextQuoteBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        quoteText.textContent = `"${quotes[randomIndex].text}"`;
        quoteAuthor.textContent = quotes[randomIndex].author;
    });

    /* ==========================================================================
       4. Poets Filter System
       ========================================================================== */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const poetCards = document.querySelectorAll('.poet-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            poetCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    /* ==========================================================================
       5. Search Engine for Scholars
       ========================================================================== */
    const searchInput = document.getElementById('scholar-search');
    const scholarCards = document.querySelectorAll('.scholar-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            scholarCards.forEach(card => {
                const name = card.getAttribute('data-name').toLowerCase();
                const field = card.getAttribute('data-field').toLowerCase();
                const text = card.innerText.toLowerCase();

                if (name.includes(query) || field.includes(query) || text.includes(query)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    /* ==========================================================================
       6. Timeline Interactive Popup
       ========================================================================== */
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const title = item.querySelector('h3').innerText;
            const story = item.getAttribute('data-story');
            openModal(title, story);
        });
    });

    /* ==========================================================================
       7. Modal Control
       ========================================================================== */
    const modal = document.getElementById('info-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBodyText = document.getElementById('modal-body-text');
    const closeModalBtn = document.getElementById('close-modal');
    const openModalBtns = document.querySelectorAll('.open-modal-btn');

    function openModal(title, content) {
        modalTitle.textContent = title;
        modalBodyText.textContent = content;
        modal.style.display = 'flex';
    }

    openModalBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.getAttribute('data-title');
            const content = btn.getAttribute('data-content');
            openModal(title, content);
        });
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    /* ==========================================================================
       8. Back to Top Button
       ========================================================================== */
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});