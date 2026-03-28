/* ═══════════════════════════════════════════════════════════════
   Portfolio — Application Logic
   Handles data loading, rendering, navigation, and animations
   ═══════════════════════════════════════════════════════════════ */

// ── Data Loading ────────────────────────────────────────────────
async function loadJSON(path) {
  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`Failed to load ${path}:`, err);
    return [];
  }
}

// ── Format Date ─────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── Project Rendering ───────────────────────────────────────────
function getProjectIcon(tags) {
  if (tags.some(t => t.toLowerCase().includes('python'))) return '🐍';
  if (tags.some(t => t.toLowerCase().includes('react')))  return '⚛️';
  if (tags.some(t => t.toLowerCase().includes('flask')))  return '🌐';
  if (tags.some(t => t.toLowerCase().includes('api')))    return '🔗';
  if (tags.some(t => t.toLowerCase().includes('css')))    return '🎨';
  return '💻';
}

function renderProjectCard(project) {
  const tagsHTML = project.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <article class="card project-card fade-in" data-tags='${JSON.stringify(project.tags)}'>
      <div class="project-icon">${getProjectIcon(project.tags)}</div>
      <h3>${project.title}</h3>
      <p class="project-desc">${project.description}</p>
      <div class="project-footer">
        <div class="tags">${tagsHTML}</div>
        ${project.link && project.link !== '#'
          ? `<a class="project-link" href="${project.link}" target="_blank" rel="noopener noreferrer">View →</a>`
          : `<span class="project-link" style="opacity:0.4">Coming soon</span>`
        }
      </div>
    </article>
  `;
}

function renderProjects(data, container, limit) {
  const items = limit ? data.slice(0, limit) : data;
  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <p>No projects yet — check back soon!</p>
      </div>`;
    return;
  }
  container.innerHTML = items.map(renderProjectCard).join('');
  observeFadeIns();
}

// ── Blog Rendering ──────────────────────────────────────────────
function renderBlogCard(post) {
  const tagsHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <article class="card blog-card fade-in" onclick="window.location.href='blog-post.html?id=${post.id}'">
      <div class="blog-meta">
        <span class="date-pill">${formatDate(post.date)}</span>
        <span>${post.readTime}</span>
      </div>
      <h3>${post.title}</h3>
      <p class="blog-excerpt">${post.excerpt}</p>
      <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
        <div class="tags">${tagsHTML}</div>
        <span class="read-more">Read more →</span>
      </div>
    </article>
  `;
}

function renderBlogList(data, container, limit) {
  const items = limit ? data.slice(0, limit) : data;
  if (items.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📝</div>
        <p>No blog posts yet — check back soon!</p>
      </div>`;
    return;
  }
  container.innerHTML = items.map(renderBlogCard).join('');
  observeFadeIns();
}

// ── Blog Post Rendering ────────────────────────────────────────
function renderBlogPost(data, postId) {
  const post = data.find(p => p.id === postId);
  const header = document.getElementById('post-header');
  const body = document.getElementById('post-body');

  if (!post) {
    header.innerHTML = `<h1>Post Not Found</h1>
      <p class="post-meta">The blog post you're looking for doesn't exist.</p>`;
    body.innerHTML = `<p><a href="blog.html" class="post-back">← Back to Blog</a></p>`;
    return;
  }

  const tagsHTML = post.tags.map(t => `<span class="tag">${t}</span>`).join('');
  header.innerHTML = `
    <h1>${post.title}</h1>
    <div class="post-meta">
      <span>${formatDate(post.date)}</span>
      <span class="separator"></span>
      <span>${post.readTime}</span>
      <span class="separator"></span>
      <div class="tags">${tagsHTML}</div>
    </div>
  `;
  body.innerHTML = post.content;

  // Update page title
  document.title = `${post.title} — Amenyo A. Akeseh`;
}

// ── Tag Filtering (Projects Page) ──────────────────────────────
function setupTagFilter(data, container) {
  // Collect all unique tags
  const allTags = [...new Set(data.flatMap(p => p.tags))];
  const filterBar = document.getElementById('filter-bar');
  if (!filterBar) return;

  filterBar.innerHTML = `<button class="filter-btn active" data-tag="all">All</button>` +
    allTags.map(tag => `<button class="filter-btn" data-tag="${tag}">${tag}</button>`).join('');

  filterBar.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Update active state
    filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const tag = btn.dataset.tag;
    const filtered = tag === 'all' ? data : data.filter(p => p.tags.includes(tag));
    renderProjects(filtered, container);
  });
}

// ── Navigation ──────────────────────────────────────────────────
function setupNavigation() {
  // Active page highlight
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Mobile hamburger
  const toggle = document.getElementById('nav-toggle');
  const links = document.getElementById('nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      // Animate hamburger to X
      toggle.classList.toggle('active');
    });

    // Close menu on link click
    links.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        links.classList.remove('open');
        toggle.classList.remove('active');
      });
    });
  }
}

// ── Scroll Fade-in Observer ─────────────────────────────────────
function observeFadeIns() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in:not(.visible)').forEach(el => observer.observe(el));
}

// ── Theme Toggle ────────────────────────────────────────────────
function setupThemeToggle() {
  const toggle = document.getElementById('theme-toggle');
  if (!toggle) return;

  // Load saved theme
  const saved = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  toggle.textContent = saved === 'light' ? '🌙' : '☀️';
  toggle.setAttribute('aria-label', saved === 'light' ? 'Switch to dark mode' : 'Switch to light mode');

  toggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    toggle.textContent = next === 'light' ? '🌙' : '☀️';
    toggle.setAttribute('aria-label', next === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
  });
}

// ── Initialize ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupNavigation();
  observeFadeIns();
});
