/**
 * Main JavaScript File
 * Handles theme switching, CV modal, and navigation
 * 
 * Architecture:
 * - ThemeManager: Centralized theme switching (Dark/Light/System)
 * - CVModal: CV display functionality
 * - Navigation: Navigation highlighting
 * - ModuleManager: Feature module management
 */

// ================== UTILITIES ==================

/**
 * DOM Utility Functions
 */
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

/**
 * Theme Manager Module
 * Handles light/dark/system theme switching with localStorage persistence
 */
const ThemeManager = {
    STORAGE_KEY: 'site-theme',
    LIGHT_THEME: 'light-theme',
    DARK_THEME: 'dark',
    SYSTEM_THEME: 'system-light-theme',

    /**
     * Initialize theme system
     */
    init() {
        this.setupEventListeners();
        this.loadSavedTheme();
        this.updateThemeUI();
    },

    /**
     * Setup event listeners for theme toggle and dropdown
     */
    setupEventListeners() {
        const themeToggle = DOMUtils.select('#theme-toggle');
        const themeDropdown = DOMUtils.select('#theme-dropdown');
        const themeOptions = DOMUtils.selectAll('.theme-option');

        // Toggle dropdown on button click
        if (themeToggle) {
            themeToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                DOMUtils.toggleClass(themeDropdown, 'active');
            });
        }

        // Handle theme option clicks
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

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            if (themeDropdown && themeDropdown.classList.contains('active')) {
                DOMUtils.removeClass(themeDropdown, 'active');
            }
        });
    },

    /**
     * Load saved theme from localStorage
     */
    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        this.applyTheme(savedTheme);
    },

    /**
     * Set theme and save to localStorage
     */
    setTheme(theme) {
        localStorage.setItem(this.STORAGE_KEY, theme);
        this.applyTheme(theme);
    },

    /**
     * Apply theme to document
     */
    applyTheme(theme) {
        const body = document.body;
        
        // Remove all theme classes
        body.classList.remove(this.LIGHT_THEME, this.DARK_THEME, this.SYSTEM_THEME);

        if (theme === 'light') {
            body.classList.add(this.LIGHT_THEME);
        } else if (theme === 'system') {
            body.classList.add(this.SYSTEM_THEME);
        }
        // Dark is default (no class needed)
    },

    /**
     * Update UI to show current theme
     */
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

        // Update toggle button icon
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

// ================== CV MODAL ==================

/**
 * CV Modal Module
 * Handles CV display in modal window
 */
const CVModal = {
    /**
     * Initialize CV modal
     */
    init() {
        this.setupEventListeners();
    },

    /**
     * Setup event listeners
     */
    setupEventListeners() {
        const cvTrigger = DOMUtils.selectAll('#cv-trigger');
        const cvClose = DOMUtils.select('#cv-close');
        const cvModal = DOMUtils.select('#cv-modal');

        cvTrigger.forEach(trigger => {
            trigger.addEventListener('click', () => this.openModal());
        });

        if (cvClose) {
            cvClose.addEventListener('click', () => this.closeModal());
        }

        // Close modal when clicking outside content
        if (cvModal) {
            cvModal.addEventListener('click', (e) => {
                if (e.target === cvModal) {
                    this.closeModal();
                }
            });
        }

        // Close modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });
    },

    /**
     * Open CV modal
     */
    openModal() {
        const cvModal = DOMUtils.select('#cv-modal');
        if (cvModal) {
            DOMUtils.addClass(cvModal, 'active');
            document.body.style.overflow = 'hidden';
        }
    },

    /**
     * Close CV modal
     */
    closeModal() {
        const cvModal = DOMUtils.select('#cv-modal');
        if (cvModal) {
            DOMUtils.removeClass(cvModal, 'active');
            document.body.style.overflow = 'auto';
        }
    }
};

// ================== NAVIGATION ==================

/**
 * Navigation Module
 * Handles active nav link highlighting
 */
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
    },

    getCurrentPage() {
        const pathname = window.location.pathname;
        const filename = pathname.split('/').pop();
        return filename.replace('.html', '') || 'index';
    }
};

// ================== ANALYTICS (Placeholder) ==================

/**
 * Analytics Module - Placeholder for future implementation
 */
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

/**
 * Module Manager
 * Central point for managing all features
 */
const ModuleManager = {
    modules: [
        ThemeManager,
        CVModal,
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

// Export for console access
window.SiteModules = {
    ThemeManager,
    CVModal,
    Navigation,
    Analytics,
    ModuleManager,
    DOMUtils
};
