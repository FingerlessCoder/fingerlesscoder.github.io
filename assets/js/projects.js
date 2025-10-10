// Dynamically load and render projects from JSON file
(async function () {
  // Default JSON path (relative) — works for project sites and local servers.
  // Absolute '/assets/...' only works for root-hosted sites (username.github.io).
  const PROJECTS_JSON = 'assets/data/projects.json';
  console.log('[projects.js] init, preferred (relative) path', PROJECTS_JSON);

  async function fetchProjects() {
    // Try relative path first (works for project sites and local servers), then fall back to absolute path
    const candidates = [PROJECTS_JSON, '/assets/data/projects.json'];
    for (const url of candidates) {
      try {
        console.log('[projects.js] attempting fetch', url);
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) {
          console.warn('[projects.js] fetch failed for', url, res.status);
          continue;
        }
        const data = await res.json();
        if (!Array.isArray(data)) {
          console.warn('[projects.js] fetched data is not an array from', url);
          continue;
        }
        console.log('[projects.js] fetched', data.length, 'projects from', url);
        return data;
      } catch (err) {
        console.warn('[projects.js] fetch error for', url, err.message || err);
        // try next candidate
      }
    }
    // If all fetch attempts failed, return null to indicate failure (different from empty array)
    return null;
  }

  // Parse existing DOM fallback articles into project objects so filters/stats can be built
  function parseFallbackFromDOM(containerId = 'allProjects') {
    const container = document.getElementById(containerId);
    if (!container) return [];
    const articles = Array.from(container.querySelectorAll('article'));
    const parsed = articles.map(a => {
      const obj = {};
      obj.category = a.dataset.category || 'other';
      // image
      const img = a.querySelector('img');
      obj.image = img ? img.getAttribute('src') : '';
      // name: either link or span inside h3
      const titleAnchor = a.querySelector('h3 a');
      if (titleAnchor) {
        obj.name = titleAnchor.textContent.trim();
        const href = titleAnchor.getAttribute('href');
        if (href && href.includes('github')) obj.github = href;
        else if (href && href !== '#') obj.url = href;
      } else {
        const titleSpan = a.querySelector('h3 span, h3');
        obj.name = titleSpan ? titleSpan.textContent.trim() : '';
      }
      // featured badge
      obj.featured = !!a.querySelector('.inline-flex.items-center, .featured, .badge');
      // description
      const p = a.querySelector('p');
      obj.description = p ? p.textContent.trim() : '';
      // tags
      obj.tags = Array.from(a.querySelectorAll('.tag')).map(t => t.textContent.trim()).filter(Boolean);
      return obj;
    });
    return parsed;
  }

  function createProjectCard(project) {

    const imageSection = project.image ? `
      <a href="${project.url || project.github || '#'}" target="_blank" rel="noopener" class="block mb-4 group/image" draggable="false" oncontextmenu="event.stopPropagation();">
        <img
          src="${project.image}"
          alt="${project.name}"
          loading="lazy"
          width="600"
          height="800"
          style="aspect-ratio:5/4;object-fit:cover;display:block;width:100%;border-radius:0.5rem;background:linear-gradient(to bottom right,#1e293b,#0f172a);"
          draggable="false"
        >
      </a>
    ` : '';

    const featuredBadge = project.featured ? `<span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-500/20 text-accent-300 border border-accent-400/30 ml-2 animate-pulse">
        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
        Featured
    </span>` : '';

    const div = document.createElement('article');
    // Ensure both 'card' and 'group' classes are always present for hover effects
    div.classList.add('card', 'group');
    div.dataset.category = project.category;
    div.innerHTML = `
        ${imageSection}
        <div class="flex items-start justify-between gap-2 mb-2">
      <h3 class="flex-1 flex items-center flex-wrap">
        <span class="text-brand-100 transition-colors duration-200 font-semibold text-lg">${project.name}</span>
        ${featuredBadge}
      </h3>
        </div>
        <p class="text-slate-300 text-sm leading-relaxed mb-4">${project.description}</p>
        <div class="flex flex-wrap gap-2 mt-auto">${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}</div>
    `;
    return div;
  }

  function renderProjects(projects, containerId = 'allProjects') {
    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear existing content
    container.innerHTML = '';

    if (projects.length === 0) {
      container.innerHTML = '<p class="col-span-full text-center text-slate-400 py-12">No projects found.</p>';
      return;
    }

    // Add projects
    projects.forEach(project => container.appendChild(createProjectCard(project)));
  }

  function setupFilters(allProjects) {
    const filterContainer = document.getElementById('filterButtons');
    if (!filterContainer) return;

    // Get unique categories
    const categories = [...new Set(allProjects.map(p => p.category))].sort();

    // Reset and render buttons
    filterContainer.innerHTML = '<button class="filter-btn bg-brand-600 text-white border-brand-600" data-filter="all" aria-pressed="true">All Projects</button>';
    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'filter-btn bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-600';
      button.dataset.filter = category;
      button.setAttribute('aria-pressed', 'false');
      button.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      filterContainer.appendChild(button);
    });

    const updatedFilterButtons = document.querySelectorAll('.filter-btn');
    updatedFilterButtons.forEach(btn => btn.addEventListener('click', () => {
      // Update active state
      updatedFilterButtons.forEach(b => {
        b.classList.remove('bg-brand-600', 'text-white', 'border-brand-600');
        b.classList.add('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300', 'border-slate-300', 'dark:border-slate-600');
        b.setAttribute('aria-pressed', 'false');
      });

      btn.classList.remove('bg-slate-100', 'dark:bg-slate-700', 'text-slate-700', 'dark:text-slate-300', 'border-slate-300', 'dark:border-slate-600');
      btn.classList.add('bg-brand-600', 'text-white', 'border-brand-600');
      btn.setAttribute('aria-pressed', 'true');

      // Filter projects
      const filter = btn.dataset.filter;
      const filtered = filter === 'all' ? allProjects : allProjects.filter(p => p.category === filter);

      // Update stats and render
      updateStats(filtered);
      renderProjects(filtered);
    }));
  }

  function updateStats(projects) {
    const totalProjectsEl = document.getElementById('totalProjects');
    const totalCategoriesEl = document.getElementById('totalCategories');
    const featuredProjectsEl = document.getElementById('featuredProjects');
    const totalTechnologiesEl = document.getElementById('totalTechnologies');

    if (totalProjectsEl) totalProjectsEl.textContent = projects.length;
    if (totalCategoriesEl) totalCategoriesEl.textContent = [...new Set(projects.map(p => p.category))].length;
    if (featuredProjectsEl) featuredProjectsEl.textContent = projects.filter(p => p.featured).length;
    if (totalTechnologiesEl) totalTechnologiesEl.textContent = [...new Set(projects.flatMap(p => p.tags))].length;
  }

  // Initialize
  try {
    // If on projects page
    if (document.getElementById('allProjects')) {
      let projects = await fetchProjects();
      // If fetchProjects returned null it means all attempts failed; parse DOM fallback instead
      if (projects === null) {
        console.warn('[projects.js] fetch failed; parsing fallback DOM for projects');
        projects = parseFallbackFromDOM('allProjects');
      }

      if (Array.isArray(projects) && projects.length > 0) {
        updateStats(projects);
        setupFilters(projects);
        // If projects came from DOM fallback we still want to keep their markup; render only when fetched JSON provided
        renderProjects(projects, 'allProjects');
      } else {
        // projects is an empty array — clear and show a friendly message
        renderProjects([], 'allProjects');
      }
    }

    // If on home page render featured (if element exists)
    if (document.getElementById('projectGrid')) {
      const projects = await fetchProjects();
      if (Array.isArray(projects) && projects.length > 0) {
        const featured = projects.filter(p => p.featured).slice(0, 3);
        renderProjects(featured, 'projectGrid');
      }
    }
  } catch (error) {
    console.error('Failed to initialize projects:', error);
    const container = document.getElementById('allProjects');
    if (container) container.innerHTML = '<p class="col-span-full text-center text-red-400 py-12">Failed to load projects. Please try again later.</p>';
  }
})();
