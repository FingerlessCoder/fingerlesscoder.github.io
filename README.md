# Personal Portfolio Website

A fast, accessible, responsive portfolio website built with **Astro** and **Tailwind CSS**, deployed to **GitHub Pages**.

## Features

- 🚀 **Built with Astro** - Modern static site generator with zero JS by default
- 🎨 **Tailwind CSS** - Utility-first styling with custom design tokens
- 📱 **Fully Responsive** - Mobile-first design with desktop support
- 🌙 **Theme Toggle** - Light/Dark mode with localStorage persistence
- 📦 **TypeScript** - Full type safety for data and components
- ♿ **Accessible** - Semantic HTML, ARIA attributes, skip links
- 🔍 **SEO Ready** - Meta tags, proper heading hierarchy
- ⚡ **Fast** - Static HTML output, minimal JavaScript

## Tech Stack

- **Framework:** Astro 5.0
- **Styling:** Tailwind CSS 3.4
- **Language:** TypeScript
- **Deployment:** GitHub Pages

## Project Structure

```
fingerlesscoder.github.io/
├── src/
│   ├── components/
│   │   ├── Header.astro      # Navigation header
│   │   └── Footer.astro      # Site footer
│   ├── layouts/
│   │   └── Layout.astro      # Main layout component
│   ├── pages/
│   │   ├── index.astro       # Homepage
│   │   ├── about.astro       # About page
│   │   ├── projects.astro    # Projects portfolio
│   │   └── contact.astro     # Contact form
│   ├── data/
│   │   └── projects.json     # Projects data (easy to update)
│   ├── styles/
│   │   └── global.css        # Custom CSS with animations
│   └── types/
│       └── index.ts          # TypeScript definitions
├── public/                   # Static assets (images)
├── astro.config.mjs          # Astro configuration
├── tailwind.config.mjs       # Tailwind configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/FingerlessCoder/fingerlesscoder.github.io.git
cd fingerlesscoder.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see the site.

### Build Commands

```bash
# Development with hot reload
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

## Managing Projects

Add or edit projects in `src/data/projects.json`:

```json
{
  "name": "Project Name",
  "description": "Project description",
  "github": "https://github.com/username/repo",
  "tags": ["React", "TypeScript"],
  "category": "web",
  "image": "/project-image.png",
  "featured": true
}
```

### Categories

- `web` - Web applications
- `tooling` - Developer tools
- `library` - Open source libraries
- `game` - Games

## Deployment

### GitHub Pages (Automatic)

Push to the `main` branch and GitHub Actions will automatically build and deploy the site.

1. Go to Repository Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `gh-pages` / `(root)`
4. Save

### Manual Deployment

```bash
npm run build
# The output is in the dist/ directory
```

## Customization

### Colors

Edit `tailwind.config.mjs` to customize the color palette:

```javascript
colors: {
  brand: { ... },   // Grayscale scale
  accent: { ... },  // Purple/violet accent
  red: { ... },     // Semantic red
  yellow: { ... },  // Semantic yellow
}
```

### Animations

Custom animations are defined in `src/styles/global.css`:

- `animate-blob` - Floating background shapes
- `animate-float` - Particle effects
- `animate-fade-in-up` - Entrance animations
- `animate-gradient-shift` - Background gradient movement

## Accessibility

- Skip to content link
- Proper ARIA labels
- Keyboard navigation support
- Focus states preserved
- Color contrast WCAG AA compliant
- Reduced motion support

## License

MIT License - see `LICENSE` file.

---

Built with ❤️ using Astro & Tailwind CSS
