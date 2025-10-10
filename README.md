# Personal Portfolio Website

A fast, accessible, responsive portfolio website you can deploy using **GitHub Pages**.

## Features
- Semantic, accessible HTML structure (skip link, proper landmarks, aria attributes)
- Responsive design with CSS Grid & flexbox
- Light/Dark theme toggle with localStorage persistence
- Projects data loaded from `assets/data/projects.json` (easy to update & extend)
- Simple filter buttons on Projects page
- Progressive enhancement friendly (content visible without JS)
- Ready for GitHub Pages deployment (static assets only)
- SEO meta tags + JSON-LD structured data on `index.html`

## Structure
```
assets/
  css/styles.css
  js/main.js
  js/projects.js
  data/projects.json
## Features
- Semantic, accessible structure (skip link, landmarks, keyboard friendly)
- Gradient Flat + Subtle Depth design using Tailwind CSS utilities
- Light/Dark theme toggle with localStorage (custom JS)
- Projects rendered from `assets/data/projects.json` (JSON-driven)
- Category filtering (client-side)
- Minimal custom CSS (largely utility-first)
- GitHub Pages CI workflow builds Tailwind automatically
- Optional PHP includes (`header.php`, `footer.php`) are available for local XAMPP development, but the primary site is static HTML ready for GitHub Pages
- SEO meta + structured data (see `index.html` JSON-LD)
## Getting Started Locally
## Structure
   ```bash
index.html (static HTML version)
index.php (PHP version using includes)
   git clone https://github.com/<your-username>/<your-repo>.git
   cd <your-repo>
## Getting Started Locally
Clone and install dependencies:

```powershell
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev
```

Open `index.html` (or use a local server). The dev script watches `src/styles.css` and outputs `assets/css/tailwind.css`.

### Using PHP with XAMPP
Place the project inside your XAMPP `htdocs` (already done if you are here). Then visit:
```
http://localhost/portfolio%20website/index.php
```
Edit `header.php` / `footer.php` once; changes propagate site‑wide.

If you only need static hosting (GitHub Pages), you can ignore the `.php` files.
   git add .
## Deploy to GitHub Pages
   git push origin main
### GitHub Actions Workflow
Already configured in `.github/workflows/pages-example.yml` to:
1. Install Node dependencies
2. Run Tailwind build (`npm run build`)
3. Upload artifacts for Pages deployment

If you rename the workflow file, keep the pages permissions and steps intact.
4. For project site:
   - Select Branch: `main` (root) and save
## Performance Tips
- Optimize images (prefer `.webp` / modern formats)
- Consider self-hosting the Inter font or using system UI stack
- Use `loading="lazy"` for below-the-fold images
- Purge is handled automatically by Tailwind content config

## Tailwind Design Tokens
Defined in `tailwind.config.js`:
- `colors.brand.*` – primary hue scale
- `backgroundImage.gradient-flat` – base soft gradient
- `boxShadow.subtle` / `boxShadow.depth` – depth elevation steps

Adjust gradients or add new semantic aliases under `theme.extend`.

## Future Enhancements (Ideas)
- Add a service worker for offline caching
- Add RSS feed for blog
- Fetch starred or pinned repos dynamically from GitHub API
- Add motion-reduced ambient gradient animation
- Implement search across blog posts (later)
- Consider adding a custom domain (Settings → Pages → Custom domain)
\n### Tailwind Build Commands
Dev (watch): `npm run dev`  |  Production: `npm run build`

Ensure `assets/css/tailwind.css` is committed for environments without build pipelines (if skipping GitHub Actions).

## Adding Blog Posts Later
You can:
- Keep it manual: Create `blog/post-slug.html` pages and link them.
- Use a static site generator (11ty, Astro, Jekyll) later without rewriting structure.

## Accessibility Notes
- Color contrast aims for WCAG AA.
- Focus states preserved and visible.
- Skip link improves keyboard navigation.
- Content readable with JavaScript disabled.

## Performance Tips
- Optimize images (use `.webp` where possible).
- Add `<link rel="preconnect" ...>` for any external fonts/APIs (currently none used).
- Inline critical CSS if you expand styles significantly.

## License
This project is released under the MIT License (see `LICENSE`).

## Future Enhancements (Ideas)
- Add a service worker for offline caching
- Add RSS feed for blog
- Add micro-interactions (reduced motion friendly)
- Add Google Analytics or Plausible (privacy friendly) tracking
- Replace JSON data with GitHub API fetch of pinned repos

---
Enjoy building your site! ✨
