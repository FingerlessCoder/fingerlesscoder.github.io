# Portfolio Website - PHP Architecture (Archived)

Note: This repository previously included a PHP-driven version of the site (uses `header.php` / `footer.php` + `config.php`). The project has been converted to static HTML for GitHub Pages deployment. The PHP files are retained here for reference and local XAMPP development, but the live site now uses the pre-rendered `.html` files in the repo root.

---

A maintainable, PHP-powered portfolio website with Tailwind CSS and centralized configuration.

## ✨ Features
- **Centralized Configuration**: All site settings, navigation, and content in `config.php`
- **Reusable Components**: Header, footer, and utility functions for consistent styling
- **Data Management**: Projects managed through PHP arrays with API endpoints
- **Clean URLs**: `.htaccess` removes `.php` extensions for professional URLs
- **Security**: Protected config files, security headers, and input sanitization
- **Performance**: Gzip compression, asset caching, and optimized delivery
- **SEO**: Dynamic meta tags, structured data, and semantic HTML
- **Responsive**: Tailwind CSS with gradient flat design and subtle depth

## 📁 Project Structure
```
portfolio-website/
├── config.php              # Site configuration & data
├── functions.php            # Helper functions & utilities
├── header.php              # Shared header template
├── footer.php              # Shared footer template
├── index.php               # Homepage
├── about.php               # About page
├── projects.php            # Projects showcase
├── blog.php                # Blog (coming soon)
├── contact.php             # Contact form
├── 404.php                 # Error page
├── .htaccess               # URL rewriting & security
├── api/
│   └── projects.php        # JSON API for projects
├── assets/
│   ├── css/tailwind.css    # Compiled Tailwind CSS
│   └── js/
│       ├── main.js         # Theme toggle & navigation
│       └── projects.js     # Dynamic project rendering
└── src/
    └── styles.css          # Tailwind input file
```

## 🚀 Getting Started

### Prerequisites
- PHP 7.4+ with Apache
- Node.js 18+ for Tailwind builds
- XAMPP/WAMP or similar local server

### Installation
1. **Clone and setup**:
   ```bash
   git clone <your-repo>
   cd portfolio-website
   npm install
   ```

2. **Build Tailwind CSS**:
   ```bash
   npm run build
   ```

3. **Access the site**:
   ```
   http://localhost/portfolio-website/
   ```

### Development Workflow
- **CSS Changes**: Run `npm run dev` for watch mode
- **Content Updates**: Edit `config.php` arrays
- **New Pages**: Copy existing PHP structure, update `$active` variable

## 🛠 Maintenance Guide

### Adding Projects
Edit `$projects` array in `config.php`:
```php
$projects[] = [
    'name' => 'New Project',
    'description' => 'Project description',
    'url' => 'https://github.com/user/repo',
    'tags' => ['React', 'API'],
    'category' => 'web',
    'featured' => true
];
```

### Updating Site Information
Modify constants in `config.php`:
```php
define('SITE_NAME', 'Your Name');
define('SITE_TAGLINE', 'Your tagline');
// ... other settings
```

### Adding Navigation Items
Update `$navigation` array in `config.php`:
```php
$navigation['newpage'] = [
    'title' => 'New Page',
    'url' => 'newpage.php',
    'description' => 'Page description'
];
```

### Customizing Design
- **Colors**: Edit `tailwind.config.js` brand colors
- **Components**: Modify `src/styles.css` @apply rules
- **Layout**: Update Tailwind classes in PHP templates

## 🔧 Configuration Options

### Site Settings (`config.php`)
- `SITE_NAME`: Website title
- `SITE_TAGLINE`: Hero section headline
- `SITE_DESCRIPTION`: Meta description
- `SITE_URL`: Canonical URL
- `SITE_AUTHOR`: Author name

### Navigation (`$navigation` array)
- Automatic active state management
- SEO-friendly descriptions
- Easy reordering and additions

### Projects (`$projects` array)
- Category filtering support
- Featured project highlighting
- Tag-based organization
- Direct GitHub integration

### Social Links (`$socialLinks` array)
- Icon and URL management
- Easy addition of new platforms
- Consistent styling

## 🌐 URL Structure
- Clean URLs without `.php` extensions
- SEO-friendly paths
- Automatic redirects from old URLs
- Custom 404 error handling

## 🔒 Security Features
- Config file access protection
- XSS protection headers
- Content type validation
- Input sanitization (`e()` function)
- CSRF protection ready

## 📊 Performance Optimizations
- Gzip compression enabled
- Static asset caching (1 month)
- Optimized Tailwind CSS (purged)
- Lazy loading support
- Efficient PHP templating

## 🎨 Design System
- **Brand Colors**: Customizable in `tailwind.config.js`
- **Typography**: Inter font with system fallbacks
- **Shadows**: Subtle and depth variants
- **Gradients**: Flat background with accent overlays
- **Components**: Button, card, chip utilities

## 🚀 Deployment

### XAMPP/Local Development
- Place in `htdocs/portfolio website/`
- Ensure mod_rewrite is enabled
- Set appropriate file permissions

### Production Server
- Upload all files except `node_modules/`
- Ensure Apache mod_rewrite is enabled
- Update `SITE_URL` in `config.php`
- Set proper file permissions (644 for files, 755 for directories)

### GitHub Pages Alternative
For static hosting, use the original HTML files with the generated `tailwind.css`.

## 📝 Customization Examples

### Adding a New Page
```php
<?php
$active = 'services';
$pageMeta = [
    'title' => 'Services | ' . SITE_NAME,
    'description' => 'Professional web development services'
];
include 'header.php';
?>
<div class="max-w-4xl mx-auto px-4 py-16">
    <h1>Services</h1>
    <!-- Your content -->
</div>
<?php include 'footer.php'; ?>
```

### Adding Custom Styling
In `src/styles.css`:
```css
@layer components {
  .service-card {
    @apply card hover:scale-105 transition-transform;
  }
}
```

## 🤝 Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License
MIT License - see LICENSE file for details.

---

**Built with care using PHP, Tailwind CSS, and modern web standards.**