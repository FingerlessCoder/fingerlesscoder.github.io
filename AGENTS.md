# AGENTS.md - Coding Guidelines for fingerlesscoder.github.io

This document provides guidelines and commands for agentic coding agents operating in this repository.

## Project Overview

Astro 5.0 static site with TypeScript and Tailwind CSS, deployed to GitHub Pages. Portfolio website with 4 pages (index, about, projects, contact).

## Build Commands

```bash
# Development server with hot reload
npm run dev

# Production build (includes type checking)
npm run build

# Preview production build locally
npm run preview

# Run Astro CLI directly
npm run astro -- --help
```

## Type Checking

Type checking is integrated into the build process via `astro check`. Run:
```bash
npx astro check
```

## Tailwind CSS

Tailwind is configured via `@astrojs/tailwind` integration. Custom colors and design tokens are in `tailwind.config.mjs`.

## Code Style Guidelines

### TypeScript

- Use strict TypeScript mode (extends `astro/tsconfigs/strict`)
- Define interfaces for all data structures (see `src/types/index.ts`)
- Use explicit types for function parameters and return values
- Prefer interfaces over types for object shapes
- Use `Record<K, T>` instead of `{ [key: string]: T }`
- Use `Array<T>` syntax instead of `T[]` for clarity in complex types

### Imports

- Use absolute imports with `~/` prefix for internal modules
- Group imports: external packages first, then internal components/layouts
- Use named imports for components: `import { Header } from '~/components'`
- Sort imports alphabetically within groups

### Astro Components

- Props interface must be defined with `interface Props`
- Use `Astro.props` for receiving props in server components
- Extract JavaScript to frontmatter (between `---` fences)
- Put styles in `src/styles/global.css` or use Tailwind utilities
- Keep components focused: one responsibility per component

### Naming Conventions

- **Components**: PascalCase (`Header.astro`, `Footer.astro`)
- **Pages**: kebab-case (`projects.astro`, `contact.astro`)
- **Files**: kebab-case for everything except components
- **Variables**: camelCase (`featuredProjects`, `currentPage`)
- **Constants**: SCREAMING_SNAKE_CASE for true constants
- **Types/Interfaces**: PascalCase (`Project`, `NavigationItem`)
- **CSS classes**: kebab-case for Tailwind, camelCase for custom classes

### Tailwind CSS

- Use utility classes for 95% of styling
- Custom animations in `src/styles/global.css`
- Custom colors in `tailwind.config.mjs` (`brand`, `accent`, `red`, `yellow`)
- Avoid custom CSS; prefer Tailwind equivalents
- Use `hover:` and `focus:` states for interactivity

### Error Handling

- Let TypeScript catch type errors at build time
- Use optional chaining (`?.`) and nullish coalescing (`??`) for safe access
- Validate external data (JSON imports) with TypeScript interfaces
- Astro components render statically; no try/catch needed in template
- Use `console.error` for runtime errors in scripts

### File Organization

```
src/
├── components/     # Reusable UI components
├── layouts/        # Page layouts with shared HTML structure
├── pages/          # Route-based pages (auto-routed by filename)
├── data/           # JSON data files (projects.json)
├── styles/         # Global CSS and Tailwind directives
├── scripts/        # TypeScript/JavaScript for client-side interactivity
└── types/          # TypeScript type definitions
public/             # Static assets (images, favicon)
```

### Client-Side Scripts

- Put inline scripts in Astro components using `<script>` tags
- For complex logic, create `.ts` files in `src/scripts/`
- Scripts are bundled by Vite (Astro's bundler)
- Use `document.addEventListener('DOMContentLoaded', ...)` pattern

### GitHub Pages Deployment

- GitHub Actions workflow in `.github/workflows/deploy.yml`
- Push to `main` triggers automatic deployment
- Build output goes to `dist/` directory
- Workflow runs `npm run build` which executes `astro check && astro build`

### Adding New Pages

1. Create `src/pages/[name].astro`
2. Import Layout component
3. Wrap content in `<Layout>` with title and currentPage props
4. Link from navigation in `src/components/Header.astro`

### Adding New Projects

Edit `src/data/projects.json`:
```json
{
  "name": "Project Name",
  "description": "Brief description",
  "github": "https://github.com/user/repo",
  "tags": ["Tag1", "Tag2"],
  "category": "web",  // web, tooling, library, or game
  "image": "/project-image.png",
  "featured": true
}
```

### Testing Changes

```bash
# 1. Run type check
npx astro check

# 2. Build production output
npm run build

# 3. Preview locally
npm run preview
```

Verify all 4 pages render correctly in the build output (`dist/` directory).

## Key Files

- `astro.config.mjs` - Astro configuration
- `tailwind.config.mjs` - Tailwind design tokens
- `src/types/index.ts` - TypeScript definitions
- `src/layouts/Layout.astro` - Main layout component
- `src/data/projects.json` - Portfolio projects data
