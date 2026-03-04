# Repository Guidelines

## Project Structure & Module Organization
This repository hosts a static portfolio website for GitHub Pages (`ihyonoo.github.io`).
Keep the site root simple and predictable:

- `index.html`: main landing page (required at repo root)
- `assets/css/`: stylesheets (example: `assets/css/main.css`)
- `assets/js/`: client-side scripts (example: `assets/js/main.js`)
- `assets/img/`: images and icons
- `pages/`: optional subpages (about, projects, contact)

Use relative paths so pages work correctly on GitHub Pages.

## Build, Test, and Development Commands
No build step is required unless tooling is added later.

- `python3 -m http.server 5500`: run local preview server
- `open http://localhost:5500` (or browser manually): verify rendering
- `rg --files`: inspect project files quickly

If you add Node tooling, document scripts in `package.json` and keep them minimal.

## Coding Style & Naming Conventions
- Indentation: 2 spaces for HTML/CSS/JS
- File names: `kebab-case` (`project-card.css`, `hero-banner.js`)
- CSS classes: `kebab-case` with semantic names (`project-list`, `site-header`)
- JavaScript: `camelCase` for variables/functions, `PascalCase` for classes

Prefer plain HTML/CSS/JS over heavy frameworks for maintainability and fast load times.

## Testing Guidelines
Current scope is visual and functional validation for static pages:

- test responsive layout at mobile/tablet/desktop widths
- verify all links, buttons, and navigation anchors
- check image paths and 404s in browser devtools
- run Lighthouse and keep performance/accessibility high

When adding automated tests, place them under `tests/` and document run commands.

## Commit & Pull Request Guidelines
Use Conventional Commits:

- `feat: add project gallery section`
- `fix: correct broken resume link`
- `style: refine mobile spacing in hero`

PRs should include a concise summary, before/after screenshots for UI changes, and manual test notes.

## GitHub Pages Notes
This repository name is already correct for user-site publishing.
Deploy from the default branch root (`/`) and ensure `index.html` remains at the top level.
