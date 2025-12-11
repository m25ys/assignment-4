# Mohammed Portfolio — SWE363 Assignment 2

Interactive single-page portfolio showcasing Mohammed's work with dynamic UI, multi-API integrations, and stateful experiences. Built with semantic HTML, modern CSS, and vanilla JavaScript.

## What’s Inside
- **API integrations**: GitHub feed (latest repos from `m25ys`) plus inspirational quotes with graceful fallbacks.
- **Complex logic**: Project catalog filtering and sorting with animated renders and empty states.
- **State management**: Theme persistence, remembered visitor name, saved project filters, contact data exports, and live session timer.
- **UX polish**: Smooth navigation, viewport animations, responsive layout, and accessible form validation.
- **Performance**: Deferred script loading, lazy images, minimal dependencies, and efficient DOM work.

## Running the Site
1. Open `index.html` in your browser, or use VS Code + Live Server for hot reloads.
2. Keep internet access on to load the GitHub and quotes APIs (fallback messages appear if offline).

## Using the New Features
- **Project filters**: Use the category buttons and sort dropdown in the Projects section. Choices persist in `localStorage` so your last view returns.
- **GitHub feed**: Live cards render from the GitHub API; a retry button appears if GitHub is unavailable.
- **Visitor memory**: Enter your name in the hero “Remember your name” box to personalize greetings across visits.
- **Session timer**: The hero shows how long you’ve stayed on the page.
- **Contact form**: Validates fields in real time, saves submissions locally, and exports individual or bulk `.txt` files.

## APIs
- **GitHub**: `https://api.github.com/users/m25ys/repos?sort=updated&per_page=6`
- **Quotes**: `https://api.quotable.io/quotes?limit=3` with local fallback messaging.

## File Structure
- `index.html` — page structure and sections
- `css/style.css` — design system, layout, animations, and new GitHub/feed + filter styles
- `js/script.js` — theme + state handling, API calls, filters/sorting, AI-inspired features, validation
- `docs/technical-documentation.md`, `docs/ai-usage-report.md` — supporting docs
- `assets/` — images

## Compatibility
Modern browsers supporting ES6, Fetch API, CSS variables, and IntersectionObserver.

## License
For academic use as part of SWE363 coursework.

## Contact
- GitHub: [m25ys](https://github.com/m25ys)
- LinkedIn: [Mohammed Alsuhaibani](https://www.linkedin.com/in/mohammed-alsuhaibani-338418279/)
