# Sandesh Khatiwada - Portfolio Website

A modern, responsive personal portfolio website for a Backend & Automation Engineer. Built with vanilla HTML, CSS, and JavaScript — no frameworks or dependencies.

## 🎨 Design Features

### Header & Branding
- **SK Logo**: Subtle, gradient-styled initials in the top-left navigation
- **Responsive Navigation**: Compact nav bar with Home, Spring Boot, n8n, GitHub, CV, and Theme Toggle
- **Modern Typography**: Inter (body), Poppins (headings), and Fira Code (technical content)
- **Sticky Navigation**: Always accessible while scrolling

### Hero Section
- **Animated Background**: Subtle radial gradients creating depth without distraction
- **Tagline-Based Header**: "Backend & Automation Engineer" instead of a giant name
- **Professional Introduction**: Clear, concise description of focus areas

### Interactive Features

#### 1. **Dark/Light/System Theme Switcher**
- Located in the top-right navigation
- Three theme options: Dark (default), Light, and System
- Persistent theme selection via localStorage
- Smooth transitions between themes

#### 2. **CV Modal with Search**
- Click the 📄 icon to open a full-screen modal
- Search bar at the top for dynamic content searching
- PDF embedded within the modal
- Close via button, Escape key, or clicking outside
- Responsive design for mobile viewing

#### 3. **Smart Search & Recommendations**
- Main search bar on the home page
- Displays 6 curated topics with real-time filtering
- Recommendation cards show:
  - Topic title
  - Brief description
  - Relevant keywords
- Dynamically updates based on search query

#### 4. **Card-Based Layout**
- Featured topics displayed as interactive cards
- Hover effects with:
  - Animated gradient overlays
  - Elevated shadows
  - Smooth lift animation
  - Border color change

### Content Sections

#### Spring Boot Page
- Cheat Sheet with practical code snippets
- Core Concepts (DI, Architecture, Properties)
- Spring Security fundamentals
- OAuth2 & JWT patterns
- JPA/Hibernate with best practices
- Swagger/OpenAPI documentation

#### n8n Automation Page
- Fundamentals and workflow types
- Custom JavaScript logic
- HTTP requests and conditional routing
- Common automation patterns
- Best practices guide
- Popular integrations directory
- Workflow diagram placeholder

## 📱 Responsive Design

- **Desktop (1024px+)**: Full multi-column layout
- **Tablet (768px-1024px)**: Optimized 2-column grid
- **Mobile (480px-768px)**: Single column, touch-friendly
- **Small Mobile (<480px)**: Minimal spacing, readable fonts

### Accessibility
- Proper color contrast ratios
- Readable font sizes (14px minimum)
- Semantic HTML structure
- Keyboard navigation support
- ARIA-friendly modal interactions

## 🎯 Technical Architecture

### JavaScript Modules
```
- ThemeManager: Theme switching & persistence
- CVModal: CV modal display & search
- RecommendationEngine: Smart content suggestions
- Navigation: Active page highlighting
- Analytics: Placeholder for future tracking
- DOMUtils: Common DOM utilities
```

### CSS System
- **CSS Variables**: Centralized color, spacing, and typography
- **BEM-like Classes**: Clear, maintainable naming
- **Mobile-First**: Progressive enhancement approach
- **Smooth Transitions**: 150ms (fast), 300ms (normal)

## 📂 File Structure
```
Information Management/
├── index.html              # Home page
├── spring.html             # Spring Boot guide
├── n8n.html                # n8n automation guide
├── Sandesh_CV.pdf          # CV document
├── css/
│   └── style.css           # All styles (1000+ lines)
└── js/
    └── main.js             # All interactions (~340 lines)
```

## 🚀 Features Implemented

✅ Sticky header with active section highlighting
✅ Dark/Light/System theme switching
✅ CV modal with search functionality
✅ Smart content recommendations
✅ Animated card hover effects
✅ Responsive mobile design
✅ Smooth scroll behavior
✅ Professional typography hierarchy
✅ Blue accent colors with gradient highlights
✅ Persistent user preferences (theme via localStorage)
✅ Accessible forms and interactions
✅ Modern, minimalist aesthetic

## 🎨 Color Palette

### Dark Theme (Default)
- Background Primary: #0f1419
- Background Secondary: #1a1f26
- Text Primary: #e4e6eb
- Accent Primary: #3b82f6 (Blue)
- Accent Secondary: #10b981 (Green)

### Light Theme
- Background Primary: #ffffff
- Background Secondary: #f5f7fa
- Text Primary: #1a1a1a
- Accent Primary: #0066ff (Darker Blue)
- Accent Secondary: #00a86b (Darker Green)

## 💡 Usage

1. Open `index.html` in any modern browser
2. Navigate between pages using the menu
3. Toggle theme using the 🌙/☀️/⚙️ button
4. Click 📄 to view CV in a searchable modal
5. Use the search bar to find relevant topics

## 🔧 Customization

### Add New Topic Recommendations
Edit `js/main.js`, `RecommendationEngine.topics` array:
```javascript
{
    title: 'Your Topic',
    query: 'relevant keywords',
    description: 'Brief description here'
}
```

### Change Colors
Update CSS variables in `css/style.css` `:root` section:
```css
--color-accent-primary: #3b82f6;  /* Blue */
```

### Add New Pages
1. Create new HTML file (e.g., `projects.html`)
2. Copy navigation structure from existing pages
3. Add link to nav menu
4. Update active state in `Navigation.init()`

## 📊 Browser Support
- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Modern mobile browsers

## ✨ Special Features

- **Animated Backgrounds**: Subtle gradients that don't distract
- **Smooth Interactions**: All transitions use CSS for performance
- **Progressive Enhancement**: Works without JavaScript
- **Modular JS**: Easy to extend and maintain
- **No Dependencies**: Pure vanilla HTML/CSS/JS

---

**Built with care for technical professionals. Designed to impress.**
