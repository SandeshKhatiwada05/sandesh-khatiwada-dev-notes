/* ========================================
   MAIN JAVASCRIPT - Complete Redesign
   ======================================== */

/* Theme Manager Module */
const ThemeManager = (() => {
    const THEME_KEY = 'portfolio-theme-preference';
    const LIGHT = 'light';
    const DARK = 'dark';
    const SYSTEM = 'system';

    const getSystemTheme = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
    };

    const getStoredTheme = () => localStorage.getItem(THEME_KEY) || SYSTEM;

    const getEffectiveTheme = () => {
        const stored = getStoredTheme();
        return stored === SYSTEM ? getSystemTheme() : stored;
    };

    const applyTheme = (theme) => {
        const effective = theme === SYSTEM ? getSystemTheme() : theme;
        if (effective === DARK) {
            document.body.classList.add('dark-theme');
        } else {
            document.body.classList.remove('dark-theme');
        }
        updateThemeToggleUI();
    };

    const updateThemeToggleUI = () => {
        const btn = document.getElementById('theme-toggle-btn');
        if (!btn) return;
        
        const theme = getStoredTheme();
        const icon = btn.querySelector('.theme-icon');
        
        if (icon) {
            if (theme === LIGHT) {
                icon.classList.remove('rotate');
                btn.setAttribute('aria-label', 'Switch to dark mode');
            } else if (theme === DARK) {
                icon.classList.add('rotate');
                btn.setAttribute('aria-label', 'Switch to light mode');
            } else {
                icon.classList.remove('rotate');
                btn.setAttribute('aria-label', 'Using system theme');
            }
        }
    };

    const toggleTheme = () => {
        const current = getStoredTheme();
        let next;
        
        if (current === LIGHT) {
            next = DARK;
        } else if (current === DARK) {
            next = SYSTEM;
        } else {
            next = LIGHT;
        }
        
        localStorage.setItem(THEME_KEY, next);
        applyTheme(next);
    };

    const init = () => {
        const theme = getStoredTheme();
        applyTheme(theme);
        
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            if (getStoredTheme() === SYSTEM) {
                applyTheme(SYSTEM);
            }
        });

        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    };

    return { init, toggleTheme, getEffectiveTheme };
})();

/* Navigation Menu Module */
const NavigationMenu = (() => {
    const toggleHamburgerMenu = () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');

        if (hamburger && sidebar && overlay) {
            hamburger.classList.toggle('active');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }
    };

    const closeMenu = () => {
        const hamburger = document.querySelector('.hamburger-menu');
        const sidebar = document.querySelector('.sidebar');
        const overlay = document.querySelector('.sidebar-overlay');

        if (hamburger && sidebar && overlay) {
            hamburger.classList.remove('active');
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        }
    };

    const setActiveLink = () => {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const links = document.querySelectorAll('.sidebar-menu a');

        links.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || (currentPage === '' && href === 'index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    const init = () => {
        // Hamburger menu toggle
        const hamburger = document.querySelector('.hamburger-menu');
        if (hamburger) {
            hamburger.addEventListener('click', toggleHamburgerMenu);
        }

        // Close menu on overlay click
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.addEventListener('click', closeMenu);
        }

        // Close menu on sidebar link click
        const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeMenu();
            });
        });

        setActiveLink();
    };

    return { init, closeMenu };
})();

/* CV Modal Module */
const CVModal = (() => {
    const openCV = () => {
        const modal = document.getElementById('cv-modal');
        const body = document.body;
        if (modal) {
            modal.classList.add('active');
            body.style.overflow = 'hidden';
        }
    };

    const closeCV = () => {
        const modal = document.getElementById('cv-modal');
        const body = document.body;
        if (modal) {
            modal.classList.remove('active');
            body.style.overflow = '';
            clearCVSearch();
        }
    };

    const clearCVSearch = () => {
        const searchInput = document.getElementById('cv-search-input');
        if (searchInput) {
            searchInput.value = '';
        }
    };

    const searchCV = (query) => {
        const iframe = document.querySelector('.cv-modal-body iframe');
        // Note: Searching within PDF viewer is limited due to iframe security
        // This is a placeholder for future enhancement
        console.log('Searching CV for:', query);
    };

    const init = () => {
        // CV open buttons
        const cvButtons = document.querySelectorAll('[data-action="open-cv"]');
        cvButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openCV();
            });
        });

        // CV close button
        const closeBtn = document.querySelector('.cv-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCV);
        }

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeCV();
            }
        });

        // Search functionality
        const searchInput = document.getElementById('cv-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                searchCV(e.target.value);
            });
        }
    };

    return { init, openCV, closeCV };
})();

/* Recommendations Engine Module */
const RecommendationEngine = (() => {
    const topics = [
        {
            title: 'Spring Boot Fundamentals',
            description: 'Core concepts, annotations, and application setup for building robust Java applications.',
            keywords: ['spring', 'boot', 'java', 'framework', 'rest']
        },
        {
            title: 'RESTful API Design',
            description: 'Best practices for designing and implementing scalable REST APIs with Spring Boot.',
            keywords: ['api', 'rest', 'http', 'endpoint', 'design']
        },
        {
            title: 'n8n Workflow Automation',
            description: 'Building complex automation workflows with n8n, connecting various integrations.',
            keywords: ['n8n', 'automation', 'workflow', 'integration', 'node']
        },
        {
            title: 'Database & JPA',
            description: 'Working with relational databases, JPA, Hibernate ORM, and data persistence.',
            keywords: ['database', 'jpa', 'hibernate', 'sql', 'orm']
        },
        {
            title: 'Authentication & Security',
            description: 'Implementing OAuth2, JWT, Spring Security for secure applications.',
            keywords: ['security', 'oauth', 'jwt', 'authentication', 'authorization']
        },
        {
            title: 'Cloud Deployment',
            description: 'Deploying applications to cloud platforms and containerization with Docker.',
            keywords: ['cloud', 'docker', 'deployment', 'kubernetes', 'aws']
        }
    ];

    const filterRecommendations = (query) => {
        if (!query.trim()) {
            return topics;
        }

        const lowerQuery = query.toLowerCase();
        return topics.filter(topic => 
            topic.title.toLowerCase().includes(lowerQuery) ||
            topic.description.toLowerCase().includes(lowerQuery) ||
            topic.keywords.some(keyword => keyword.includes(lowerQuery))
        );
    };

    const renderRecommendations = (filtered) => {
        const container = document.getElementById('recommendations-grid');
        if (!container) return;

        container.innerHTML = '';

        if (filtered.length === 0) {
            container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--color-text-tertiary);">No topics found. Try a different search.</p>';
            return;
        }

        filtered.forEach(topic => {
            const card = document.createElement('div');
            card.className = 'recommendation-card';
            card.innerHTML = `
                <h4>${topic.title}</h4>
                <p>${topic.description}</p>
            `;
            container.appendChild(card);
        });
    };

    const init = () => {
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                const filtered = filterRecommendations(e.target.value);
                renderRecommendations(filtered);
            });

            // Initial render
            renderRecommendations(topics);
        }
    };

    return { init, filterRecommendations };
})();

/* Page Navigation Module */
const PageNavigation = (() => {
    const handleCardLinks = () => {
        const cardLinks = document.querySelectorAll('.card-link');
        cardLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        });
    };

    const init = () => {
        handleCardLinks();
    };

    return { init };
})();

/* Module Manager */
const ModuleManager = (() => {
    const init = () => {
        // Initialize all modules
        ThemeManager.init();
        NavigationMenu.init();
        CVModal.init();
        RecommendationEngine.init();
        PageNavigation.init();
    };

    return { init };
})();

/* Initialize on DOM load */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ModuleManager.init();
    });
} else {
    ModuleManager.init();
}
