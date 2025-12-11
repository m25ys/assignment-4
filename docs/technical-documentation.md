# Technical Documentation

## Overview
This repository contains an advanced, interactive portfolio website for Mohammed. It showcases a modern single-page application with dynamic content, AI integration, API connectivity, and comprehensive user experience features. The site includes About, Experience, Projects, and Contact sections with enhanced interactivity, animations, and intelligent features.

## Architecture
- **Static site**: No backend or build step required
- **Technologies**: HTML5, CSS3, vanilla JavaScript (ES6+)
- **Dynamic SPA**: Client-side routing with smooth section transitions
- **API Integration**: External API calls for dynamic content
- **AI Features**: Simulated AI-powered quote generation and suggestions

## File Structure
- `index.html`: Enhanced semantic markup with dynamic navigation, API content areas, and AI features
- `css/style.css`: Advanced design system with animations, transitions, and responsive layouts
- `js/script.js`: Comprehensive JavaScript with API integration, AI features, animations, and enhanced UX
- `docs/`: Documentation (`ai-usage-report.md`, `technical-documentation.md`)
- `assets/images/`: Local images for hero and about sections

## Runtime Behavior

### Initialization
`script.js` registers a DOM ready handler. On load it runs:
- `setupYear()`: Sets the current year in the footer
- `setupGreeting()`: **Enhanced** - Sets time-based greeting with emojis and auto-updates every minute; responds to saved visitor name
- `setupTheme()`: Resolves theme (light/dark) from localStorage or system preference, updates `html[data-theme]`, and wires a toggle button
- `setupSmoothScroll()`: **Enhanced** - Section-based navigation with active state management
- `setupContactForm()`: **Enhanced** - Real-time validation, animated feedback, and improved UX
- `setupSectionNavigation()`: **New** - Dynamic section switching with smooth transitions
- `setupAnimations()`: **New** - Viewport-based animations using IntersectionObserver API
- `setupProjectCatalog()`: **New** - Filterable/sortable project list with persistent preferences
- `setupAPI()`: **New** - External quote API integration with loading/error states
- `setupGithubFeed()`: **New** - GitHub API integration with retry handling
- `setupAIFeatures()`: **New** - AI quote generator and suggestion system
- `setupVisitorMemory()`: **New** - Saves visitor name for personalized greetings
- `setupSessionTimer()`: **New** - Tracks time spent on the page

### Dynamic Content Features

#### Enhanced Time-Based Greeting
- **Automatic Updates**: Updates every minute to reflect current time
- **Contextual Emojis**: 
  - Morning (5-12): 🌅
  - Afternoon (12-17): 🌞
  - Evening (17-22): 🌙
  - Night (22-5): 🌌
- **Smooth Transitions**: CSS transitions for seamless updates

#### Dynamic Section Navigation
- **Active State Management**: Navigation highlights current section
- **Smooth Transitions**: Sections fade in/out with CSS animations
- **Accessibility**: Maintained keyboard navigation and ARIA support
- **Scroll-Based Detection**: Automatic section detection based on scroll position

### Project Catalog (Filtering & Sorting)
- **Data Model**: Static `PROJECT_DATA` array with `category`, `date`, `tags`, and links.
- **Filters**: Category buttons (`all`, `ai`, `web`, `data`) drive the rendered list.
- **Sorting**: Dropdown supports `newest`, `oldest`, and `alpha` (A–Z).
- **Persistence**: Preferences stored in `localStorage` under `project-preferences` and rehydrated on load.
- **Empty State**: Graceful “No projects” message when filters eliminate results.

### API Integration
- **GitHub Feed**: Pulls latest repositories from `https://api.github.com/users/m25ys/repos?sort=updated&per_page=6`, filters out forks, and renders cards with stars/language/updated date. Includes retry UI and friendly error copy.
- **Quotes**: Fetches inspirational quotes from `https://api.quotable.io/quotes?limit=3` with loading, error, and fallback states to avoid blank content.

### AI Features

#### AI Quote Generator
- **Time-Aware Content**: Different quotes based on time of day
- **Smooth Animations**: Fade in/out transitions
- **Auto-Refresh**: New quotes every 30 seconds
- **Contextual Messages**: Morning motivation, evening reflection, etc.

#### AI Suggestion System
- **Context-Aware Tips**: Helpful suggestions about website features
- **Non-Intrusive Notifications**: Temporary popup notifications
- **Smart Content**: Tips about dark mode, responsiveness, accessibility

### Animation System
- **IntersectionObserver API**: Elements animate when entering viewport
- **Staggered Animations**: Alternating slide-in effects for visual interest
- **CSS Transitions**: Smooth, performant animations
- **Performance Optimized**: Minimal DOM manipulation and efficient rendering

### Enhanced Theme Handling
- **Persistent Storage**: Theme preference saved in localStorage
- **System Integration**: Respects system color scheme preferences
- **Dynamic Updates**: Real-time theme switching with smooth transitions
- **Icon Management**: Automatic icon updates (🌙/☀️)

### Visitor Memory & Session Timer
- **Name Persistence**: Stores `visitor-name` in `localStorage`, updates greeting instantly via a custom `visitorNameChanged` event.
- **Session Timer**: Lightweight interval updates `#sessionTimer` every second to show time on site.

### Advanced Contact Form
- **Real-Time Validation**: Instant feedback with color-coded borders
- **Animated Feedback**: Success/error messages with fade animations
- **Enhanced UX**: Auto-hiding success messages, improved error states
- **Export Functionality**: Individual and bulk message export to .txt files

## Accessibility
- **Semantic HTML**: Proper landmarks, headings, and list structures
- **Focus Management**: Enhanced keyboard navigation and focus handling
- **ARIA Support**: Live regions, labels, and screen reader compatibility
- **Color Contrast**: High-contrast themes with visible focus indicators
- **Keyboard Navigation**: Full keyboard accessibility for all interactive elements

## Performance Considerations
- **No External Frameworks**: Pure vanilla JavaScript for optimal performance
- **Efficient Animations**: CSS-based transitions with minimal JavaScript
- **Lazy Loading**: Images load lazily for better performance
- **Optimized API Calls**: Efficient error handling and retry mechanisms
- **Minimal DOM Manipulation**: Efficient event handling and updates

## State and Storage
- **localStorage Keys**:
  - `preferred-theme`: string `"light"` or `"dark"`
  - `contact-messages`: JSON array of message objects `{ name, email, message, date }`
  - `project-preferences`: `{ filter: 'all'|'ai'|'web'|'data', sort: 'newest'|'oldest'|'alpha' }`
  - `visitor-name`: stored string for personalized greeting

## API Integration Details
- **Quotes**: `https://api.quotable.io/quotes?limit=3`
- **GitHub**: `https://api.github.com/users/m25ys/repos?sort=updated&per_page=6`
- **Error Handling**: Network errors, HTTP errors, and empty responses
- **Retry Mechanism**: User-initiated retry for failed requests
- **Loading States**: Visual feedback during API calls
- **Fallback Content**: Graceful degradation when API is unavailable

## Animation System
- **IntersectionObserver**: Efficient viewport detection
- **CSS Transitions**: Smooth, hardware-accelerated animations
- **Staggered Effects**: Visual interest through timing variations
- **Performance**: Minimal impact on page performance

## How to Run Locally
1. Open the folder in VS Code
2. Install the "Live Server" extension (by Ritwick Dey)
3. Right-click `index.html` → "Open with Live Server"
4. The site opens at a local URL (e.g., `http://127.0.0.1:5500`)
5. **Note**: Some features require a local server due to CORS restrictions on API calls

## Browser Support
- **Modern Browsers**: Chrome, Edge, Firefox, Safari (latest versions)
- **Required Features**: 
  - `classList`, `localStorage`, `matchMedia`, `Blob`
  - CSS custom properties, `IntersectionObserver`, `fetch` API
  - ES6+ features (arrow functions, template literals, destructuring)

## Known Limitations
- **API Dependency**: Quote and GitHub feeds require internet connection (friendly fallbacks provided)
- **CORS Restrictions**: API calls may not work when opening HTML directly
- **No Server Storage**: Messages persist only in user's browser
- **External Images**: Project images are placeholders

## Future Improvements
- **Real Project Assets**: Replace placeholder images with actual project screenshots
- **Email Integration**: Add server endpoint or service for real email delivery
- **Testing Suite**: Add unit tests for validation and API functions
- **Internationalization**: Multi-language support for content
- **PWA Features**: Add service worker for offline functionality
- **Performance Monitoring**: Add analytics and performance tracking
