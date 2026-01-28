/**
 * Advanced Portfolio Website
 * Features: Theme switching, CV search, content recommendations, smooth interactions
 */

// ================== UTILITIES ==================

const DOMUtils = {
    select(selector) {
        return document.querySelector(selector);
    },

    selectAll(selector) {
        return document.querySelectorAll(selector);
    },

    on(target, event, handler) {
        const elements = typeof target === 'string' ? 
            this.selectAll(target) : 
            (target instanceof NodeList ? target : [target]);
        
        elements.forEach(el => el.addEventListener(event, handler));
    },

    addClass(target, className) {
        const el = typeof target === 'string' ? this.select(target) : target;
        if (el) el.classList.add(className);
    },

    removeClass(target, className) {
        const el = typeof target === 'string' ? this.select(target) : target;
        if (el) el.classList.remove(className);
    },

    toggleClass(target, className) {
        const el = typeof target === 'string' ? this.select(target) : target;
        if (el) el.classList.toggle(className);
    }
};

// ================== THEME MANAGER ==================

const ThemeManager = {
    STORAGE_KEY: 'site-theme',
    LIGHT_THEME: 'light-theme',
    DARK_THEME: 'dark',
    SYSTEM_THEME: 'system-light-theme',

    init() {
        this.setupEventListeners();
        this.loadSavedTheme();
        this.updateThemeUI();
    },

    setupEventListeners() {
        const themeToggle = DOMUtils.select('#theme-toggle');
        const themeDropdown = DOMUtils.select('#theme-dropdown');
        const themeOptions = DOMUtils.selectAll('.theme-option');

        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                DOMUtils.toggleClass(themeDropdown, 'active');
            });
        }

        themeOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                const theme = option.getAttribute('data-theme');
                this.setTheme(theme);
                this.updateThemeUI();
                if (themeDropdown) {
                    DOMUtils.removeClass(themeDropdown, 'active');
                }
            });
        });

        document.addEventListener('click', () => {
            if (themeDropdown && themeDropdown.classList.contains('active')) {
                DOMUtils.removeClass(themeDropdown, 'active');
            }
        });
    },

    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        this.applyTheme(savedTheme);
    },

    setTheme(theme) {
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.applyTheme(theme);
    },

    applyTheme(theme) {
        const body = document.body;
        body.classList.remove(this.LIGHT_THEME, this.DARK_THEME, this.SYSTEM_THEME);

        if (theme === 'light') {
            body.classList.add(this.LIGHT_THEME);
        } else if (theme === 'system') {
            body.classList.add(this.SYSTEM_THEME);
        }
    },

    updateThemeUI() {
        const currentTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        const themeOptions = DOMUtils.selectAll('.theme-option');

        themeOptions.forEach(option => {
            const optionTheme = option.getAttribute('data-theme');
            if (optionTheme === currentTheme) {
                DOMUtils.addClass(option, 'selected');
            } else {
                DOMUtils.removeClass(option, 'selected');
            }
        });

        const themeToggle = DOMUtils.select('#theme-toggle');
        if (themeToggle) {
            if (currentTheme === 'light') {
                themeToggle.textContent = '☀️';
            } else if (currentTheme === 'system') {
                themeToggle.textContent = '⚙️';
            } else {
                themeToggle.textContent = '🌙';
            }
        }
    }
};

// ================== CV MODAL & SEARCH ==================

const CVModal = {
    init() {
        this.setupEventListeners();
    },

    setupEventListeners() {
        const cvTrigger = DOMUtils.selectAll('#cv-trigger');
        const cvClose = DOMUtils.select('#cv-close');
        const cvModal = DOMUtils.select('#cv-modal');
        const cvSearchInput = DOMUtils.select('#cv-search-input');

        cvTrigger.forEach(trigger => {
            trigger.addEventListener('click', () => this.openModal());
        });

        if (cvClose) {
            cvClose.addEventListener('click', () => this.closeModal());
        }

        if (cvModal) {
            cvModal.addEventListener('click', (e) => {
                if (e.target === cvModal) {
                    this.closeModal();
                }
            });
        }

        if (cvSearchInput) {
            cvSearchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },

    openModal() {
        const cvModal = DOMUtils.select('#cv-modal');
        if (cvModal) {
            DOMUtils.addClass(cvModal, 'active');
            document.body.style.overflow = 'hidden';
        }
    },

    closeModal() {
        const cvModal = DOMUtils.select('#cv-modal');
        if (cvModal) {
            DOMUtils.removeClass(cvModal, 'active');
            document.body.style.overflow = 'auto';
        }
    },

    handleSearch(query) {
        const searchInput = DOMUtils.select('#cv-search-input');
        if (searchInput) {
            if (query.trim()) {
                searchInput.style.borderColor = 'var(--color-accent-primary)';
            } else {
                searchInput.style.borderColor = '';
            }
        }
        console.log('Searching CV for:', query);
    }
};

// ================== SEARCH & RECOMMENDATIONS ==================

const RecommendationEngine = {
    topics: [
        {
            title: 'Spring Boot Fundamentals',
            query: 'spring boot core',
            description: 'Learn the core concepts of Spring Boot including auto-configuration, starters, and embedded servers.'
        },
        {
            title: 'Spring Security & Authentication',
            query: 'security authentication jwt',
            description: 'Master authentication, authorization, JWT tokens, and OAuth2 implementation patterns.'
        },
        {
            title: 'Microservices Architecture',
            query: 'microservices cloud',
            description: 'Explore distributed systems, service discovery, API gateways, and deployment strategies.'
        },
        {
            title: 'Database & JPA',
            query: 'jpa hibernate database',
            description: 'Deep dive into JPA, Hibernate, relationship mapping, and query optimization.'
        },
        {
            title: 'Workflow Automation',
            query: 'n8n automation workflow',
            description: 'Learn to build and manage workflows with n8n, integrations, and custom logic.'
        },
        {
            title: 'REST API Design',
            query: 'rest api design spring',
            description: 'Best practices for designing robust, scalable REST APIs with proper error handling.'
        }
    ],

    init() {
        this.setupSearchListener();
        this.showDefaultRecommendations();
    },

    setupSearchListener() {
        const mainSearch = DOMUtils.select('#main-search');
        if (mainSearch) {
            mainSearch.addEventListener('input', (e) => {
                this.updateRecommendations(e.target.value);
            });
        }
    },

    showDefaultRecommendations() {
        this.displayRecommendations(this.topics.slice(0, 3));
    },

    updateRecommendations(query) {
        if (!query.trim()) {
            this.showDefaultRecommendations();
            return;
        }

        const queryLower = query.toLowerCase();
        const filtered = this.topics.filter(topic => 
            topic.title.toLowerCase().includes(queryLower) ||
            topic.description.toLowerCase().includes(queryLower) ||
            topic.query.toLowerCase().includes(queryLower)
        );

        this.displayRecommendations(filtered.length > 0 ? filtered : this.topics.slice(0, 3));
    },

    displayRecommendations(items) {
        const container = DOMUtils.select('#recommendations');
        if (!container) return;

        container.innerHTML = items.map(item => `
            <div class="recommendation-card">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `).join('');
    }
};

// ================== NAVIGATION ==================

const Navigation = {
    init() {
        const currentPage = this.getCurrentPage();
        const navLinks = DOMUtils.selectAll('.nav-link');
        
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || href === currentPage + '.html') {
                DOMUtils.addClass(link, 'active');
            } else {
                DOMUtils.removeClass(link, 'active');
            }
        });

        // Add scroll listener for active section highlighting
        this.setupScrollHighlight();
    },

    getCurrentPage() {
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop();
        return filename.replace('.html', '') || 'index';
    },

    setupScrollHighlight() {
        // Highlight nav based on scroll position
        window.addEventListener('scroll', () => {
            // Implement sticky header highlighting if needed
        });
    }
};

// ================== ANALYTICS ==================

const Analytics = {
    init() {
        console.log('Analytics initialized');
    },

    trackPageView(pageName) {
        console.log(`Page viewed: ${pageName}`);
    },

    trackEvent(action, label) {
        console.log(`Event tracked: ${action} - ${label}`);
    }
};

// ================== MODULE MANAGER ==================

const ModuleManager = {
    modules: [
        ThemeManager,
        CVModal,
        RecommendationEngine,
        Navigation,
        Analytics
    ],

    initAll() {
        this.modules.forEach(module => {
            if (module.init && typeof module.init === 'function') {
                try {
                    module.init();
                } catch (error) {
                    console.error(`Error initializing ${module.name}:`, error);
                }
            }
        });
    },

    register(module) {
        if (module && module.init) {
            this.modules.push(module);
            module.init();
        }
    }
};

// ================== INITIALIZATION ==================

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        ModuleManager.initAll();
    });
} else {
    ModuleManager.initAll();
}

window.SiteModules = {
    ThemeManager,
    CVModal,
    RecommendationEngine,
    Navigation,
    Analytics,
    ModuleManager,
    DOMUtils
};
