// script.js - Enhanced Portfolio Website
// Utility: on DOM ready
function onReady(cb) {
	if (document.readyState === 'loading') {
		document.addEventListener('DOMContentLoaded', cb, { once: true });
	} else { cb(); }
}

// Static project catalog used for filtering/sorting
const PROJECT_DATA = [
	{
		id: 'recipe-marketplace',
		title: 'Recipe Marketplace (Vite/React + Express/Mongo)',
		category: 'web',
		description: 'Role-based user/chef/admin flows with JWT auth, context state, and CRUD for recipes, collections, shopping lists, and moderation.',
		date: '2025-09-01',
		image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=800&auto=format&fit=crop',
		tags: ['React', 'Express', 'MongoDB', 'JWT'],
		live: null,
		code: 'https://github.com/m25ys'
	},
	{
		id: 'air-quality-classifier',
		title: 'Air-Quality Classifier (KNN / RBF-SVM / DNN)',
		category: 'data',
		description: 'Scaled Kaggle pollution dataset and compared KNN, RBF-SVM, and deep NN with k-fold evaluation for Good/Moderate/Poor/Hazardous classes.',
		date: '2025-07-10',
		image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=800&auto=format&fit=crop',
		tags: ['Python', 'ML', 'Cross-Validation'],
		live: null,
		code: 'https://github.com/m25ys'
	},
	{
		id: 'data-engineering-pipeline',
		title: 'Automated Data Engineering Pipeline',
		category: 'data',
		description: 'Apps Script + JS pipeline for JSON transformation, large-scale dataset merging, and robust extraction with error handling.',
		date: '2025-06-01',
		image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=900&auto=format&fit=crop',
		tags: ['Apps Script', 'ETL', 'Automation'],
		live: null,
		code: 'https://github.com/m25ys'
	},
	{
		id: 'llm-customization',
		title: 'Customized LLM Solutions',
		category: 'ai',
		description: 'Tailored LLMs to solve client-specific challenges with domain adaptation and practical guardrails.',
		date: '2025-05-05',
		image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?q=80&w=800&auto=format&fit=crop',
		tags: ['LLM', 'Prompting', 'Fine-tuning'],
		live: null,
		code: 'https://github.com/m25ys'
	},
	{
		id: 'web-portfolio',
		title: 'Responsive Portfolio',
		category: 'web',
		description: 'Multi-section SPA portfolio with accessibility-first animations.',
		date: '2025-04-15',
		image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=900&auto=format&fit=crop',
		tags: ['SPA', 'Accessibility', 'CSS Grid'],
		live: '#top',
		code: 'https://github.com/m25ys'
	}
];

onReady(() => {
	// Init all features
	setupYear();
	setupGreeting();
	setupTheme();
	setupSmoothScroll();
	setupContactForm();
	setupSectionNavigation();
	setupAnimations();
	setupProjectCatalog();
	setupAPI();
	setupGithubFeed();
	setupAIFeatures();
	setupVisitorMemory();
	setupSessionTimer();
});

// Footer year
function setupYear() {
	const yearEl = document.getElementById('year');
	if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

// Enhanced time-based greeting with automatic updates and emojis
function setupGreeting() {
	const el = document.getElementById('greeting');
	if (!el) return;

	function updateGreeting() {
		const now = new Date();
		const h = now.getHours();

		let text = 'Welcome';
		let emoji = '👋';
		const savedName = localStorage.getItem('visitor-name');
		
		if (h >= 5 && h < 12) {
			text = 'Good morning';
			emoji = '🌅';
		} else if (h >= 12 && h < 17) {
			text = 'Good afternoon';
			emoji = '🌞';
		} else if (h >= 17 && h < 22) {
			text = 'Good evening';
			emoji = '🌙';
		} else {
			text = 'Good night';
			emoji = '🌌';
		}

		const suffix = savedName ? `, ${savedName}` : '';
		el.textContent = `${text}${suffix} ${emoji}`;
	}

	updateGreeting();
	setInterval(updateGreeting, 60000); // Update every minute
	document.addEventListener('visitorNameChanged', updateGreeting);
}

// Theme toggle with persistence and system preference
function setupTheme() {
	const root = document.documentElement;
	const btn = document.getElementById('themeToggle');
	const key = 'preferred-theme';

	const stored = localStorage.getItem(key);
	const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

	function apply(theme) {
		root.setAttribute('data-theme', theme);
		if (btn) btn.querySelector('.toggle-icon').textContent = theme === 'light' ? '🌙' : '☀️';
	}

	let initial = 'light';
	if (stored === 'dark' || stored === 'light') initial = stored;
	else initial = systemDark ? 'dark' : 'light';
	apply(initial);

	if (window.matchMedia) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
			const saved = localStorage.getItem(key);
			if (!saved) apply(e.matches ? 'dark' : 'light');
		});
	}

	btn?.addEventListener('click', () => {
		const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
		const next = current === 'dark' ? 'light' : 'dark';
		localStorage.setItem(key, next);
		apply(next);
	});
}

// Smooth scroll with accessibility
function setupSmoothScroll() {
	const links = document.querySelectorAll('a[href^="#"]');
	links.forEach(a => {
		a.addEventListener('click', e => {
			const id = a.getAttribute('href');
			if (!id || id === '#') return;
			const target = document.querySelector(id);
			if (!target) return;
			setTimeout(() => {
				target.setAttribute('tabindex', '-1');
				target.focus({ preventScroll: true });
			}, 300);
		});
	});
}

// Dynamic section navigation
function setupSectionNavigation() {
	const navLinks = document.querySelectorAll('.nav-link');
	const sections = document.querySelectorAll('.section');

	function updateActiveSection() {
		const scrollPos = window.scrollY + 100;
		sections.forEach(section => {
			const sectionTop = section.offsetTop;
			const sectionHeight = section.offsetHeight;
			const sectionId = section.getAttribute('id');
			if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
				navLinks.forEach(link => {
					link.classList.remove('active');
					if (link.getAttribute('data-section') === sectionId) {
						link.classList.add('active');
					}
				});
			}
		});
	}

	updateActiveSection();
	let ticking = false;
	function onScroll() {
		if (!ticking) {
			requestAnimationFrame(() => {
				updateActiveSection();
				ticking = false;
			});
			ticking = true;
		}
	}
	window.addEventListener('scroll', onScroll);

	navLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault();
			const targetId = link.getAttribute('data-section');
			const targetSection = document.getElementById(targetId);
			if (targetSection) {
				targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		});
	});
}

// IntersectionObserver animations
function setupAnimations() {
	if (!('IntersectionObserver' in window)) {
		document.querySelectorAll(`
			.project-card, .repo-card, .timeline-item, .about-text, .contact-form,
			.hero-copy, .hero-visual, .about-photo-wrap, .contact-info, .api-data-section
		`).forEach(el => el.classList.add('visible'));
		return;
	}

	const observer = new IntersectionObserver(entries => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add('visible');
				observer.unobserve(entry.target);
			}
		});
	}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

	document.querySelectorAll(`
		.project-card, .repo-card, .timeline-item, .about-text, .contact-form,
		.hero-copy, .hero-visual, .about-photo-wrap, .contact-info, .api-data-section
	`).forEach((el, i) => {
		el.classList.add(i % 2 === 0 ? 'slide-in-left' : 'slide-in-right');
		observer.observe(el);
	});

	document.querySelectorAll('.section').forEach(section => {
		section.classList.add('fade-in');
		observer.observe(section);
	});
}

// Project filtering/sorting with persistence
function setupProjectCatalog() {
	const list = document.getElementById('projectList');
	const empty = document.getElementById('projectEmpty');
	const filterBtns = document.querySelectorAll('.filter-btn');
	const sortSelect = document.getElementById('sortSelect');
	if (!list || !empty || !sortSelect) return;

	const storageKey = 'project-preferences';
	let prefs = { filter: 'all', sort: 'newest' };
	try {
		const saved = JSON.parse(localStorage.getItem(storageKey) || '{}');
		prefs = { ...prefs, ...saved };
	} catch { /* ignore */ }

	function persist() {
		localStorage.setItem(storageKey, JSON.stringify(prefs));
	}

	function formatDate(dateStr) {
		return new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(dateStr));
	}

	function render() {
		const filtered = PROJECT_DATA.filter(p => prefs.filter === 'all' ? true : p.category === prefs.filter);
		const sorted = [...filtered].sort((a, b) => {
			if (prefs.sort === 'alpha') return a.title.localeCompare(b.title);
			const aDate = new Date(a.date).getTime();
			const bDate = new Date(b.date).getTime();
			return prefs.sort === 'oldest' ? aDate - bDate : bDate - aDate;
		});

		if (!sorted.length) {
			list.innerHTML = '';
			empty.hidden = false;
			return;
		}

		list.innerHTML = sorted.map(p => `
			<article class="project-card fade-in" data-category="${p.category}">
				<div class="project-media">
					<img src="${p.image}" alt="${p.title}" loading="lazy" decoding="async" />
				</div>
				<div class="project-body">
					<div class="project-meta">
						<span class="chip">${p.category.toUpperCase()}</span>
						<span class="muted">${formatDate(p.date)}</span>
					</div>
					<h3 class="project-title">${p.title}</h3>
					<p>${p.description}</p>
					<div class="tag-list">
						${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}
					</div>
					<div class="project-actions">
						${p.live ? `<a href="${p.live}" class="btn btn-ghost" target="_blank" rel="noopener">Live</a>` : `<button class="btn btn-ghost" type="button" disabled aria-disabled="true">Live</button>`}
						${p.code ? `<a href="${p.code}" class="btn btn-ghost" target="_blank" rel="noopener">Code</a>` : `<button class="btn btn-ghost" type="button" disabled aria-disabled="true">Code</button>`}
					</div>
				</div>
			</article>
		`).join('');

		empty.hidden = true;
		requestAnimationFrame(() => {
			list.querySelectorAll('.project-card').forEach((card, i) =>
				setTimeout(() => card.classList.add('visible'), i * 120)
			);
		});
	}

	filterBtns.forEach(btn => {
		const value = btn.getAttribute('data-filter');
		if (value === prefs.filter) btn.classList.add('active');
		btn.addEventListener('click', () => {
			filterBtns.forEach(b => b.classList.remove('active'));
			btn.classList.add('active');
			prefs.filter = value;
			persist();
			render();
		});
	});

	if (prefs.sort) sortSelect.value = prefs.sort;
	sortSelect.addEventListener('change', () => {
		prefs.sort = sortSelect.value;
		persist();
		render();
	});

	render();
}

// ✅ Fixed API integration for Daily Inspiration
function setupAPI() {
	const apiContent = document.getElementById('apiContent');
	const apiLoading = document.getElementById('apiLoading');
	const apiError = document.getElementById('apiError');
	const apiSuccess = document.getElementById('apiSuccess');
	const retryBtn = document.getElementById('retryBtn');
	if (!apiContent) return;

	async function fetchQuotes() {
		try {
			apiLoading.style.display = 'flex';
			apiError.style.display = 'none';
			apiSuccess.style.display = 'none';

			// ✅ Correct Quotable API endpoint
			const response = await fetch('https://api.quotable.io/quotes?limit=3');
			if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

			const data = await response.json();
			const quotes = data.results;

			if (!quotes || quotes.length === 0) throw new Error('No quotes available');
			displayQuotes(quotes);
		} catch (error) {
			console.error('API Error:', error);
			// ✅ Graceful fallback if API fails
			const backupQuotes = [
				{ content: "Stay curious, keep learning 🌱", author: "Unknown" },
				{ content: "Every small step counts toward greatness ✨", author: "Unknown" },
				{ content: "Consistency beats intensity 🔥", author: "Unknown" }
			];
			displayQuotes(backupQuotes);
		}
	}

	function displayQuotes(quotes) {
		apiLoading.style.display = 'none';
		apiError.style.display = 'none';
		apiSuccess.style.display = 'grid';
		apiSuccess.innerHTML = quotes.map(quote => `
			<div class="quote-card fade-in">
				<div class="quote-text">"${quote.content}"</div>
				<div class="quote-author">— ${quote.author}</div>
			</div>
		`).join('');

		apiSuccess.querySelectorAll('.quote-card').forEach((card, i) =>
			setTimeout(() => card.classList.add('visible'), i * 200)
		);
	}

	retryBtn?.addEventListener('click', fetchQuotes);
	fetchQuotes(); // initial load
}

// Live GitHub feed
function setupGithubFeed() {
	const grid = document.getElementById('githubGrid');
	const loading = document.getElementById('githubLoading');
	const errorEl = document.getElementById('githubError');
	const retry = document.getElementById('githubRetry');
	if (!grid || !loading || !errorEl) return;

	async function fetchRepos() {
		loading.style.display = 'grid';
		errorEl.hidden = true;
		try {
			const resp = await fetch('https://api.github.com/users/m25ys/repos?sort=updated&per_page=6');
			if (!resp.ok) throw new Error(`GitHub responded with ${resp.status}`);
			const data = await resp.json();
			const repos = data.filter(r => !r.fork).slice(0, 6);
			if (!repos.length) throw new Error('No repositories found');
			renderRepos(repos);
		} catch (err) {
			console.error('GitHub API error', err);
			showError();
		}
	}

	function renderRepos(repos) {
		loading.style.display = 'none';
		grid.querySelectorAll('.repo-card').forEach(el => el.remove());
		const cards = repos.map(repo => `
			<article class="repo-card fade-in">
				<div class="repo-header">
					<h3><a href="${repo.html_url}" target="_blank" rel="noopener">${repo.name}</a></h3>
					<span class="repo-updated">Updated ${new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric' }).format(new Date(repo.updated_at))}</span>
				</div>
				<p>${repo.description || 'No description provided.'}</p>
				<div class="repo-meta">
					<span class="chip">${repo.language || 'n/a'}</span>
					<span class="muted">⭐ ${repo.stargazers_count}</span>
				</div>
			</article>
		`).join('');
		grid.insertAdjacentHTML('beforeend', cards);
		grid.querySelectorAll('.repo-card').forEach((card, i) =>
			setTimeout(() => card.classList.add('visible'), i * 120)
		);
	}

	function showError() {
		loading.style.display = 'none';
		errorEl.hidden = false;
	}

	retry?.addEventListener('click', fetchRepos);
	fetchRepos();
}

// AI-inspired features
function setupAIFeatures() {
	const aiQuoteEl = document.getElementById('aiQuote');
	const aiSuggestionBtn = document.getElementById('aiSuggestionBtn');

	function generateAIQuote() {
		const now = new Date();
		const h = now.getHours();
		const quotes = {
			morning: [
				"Start your day with purpose and watch opportunities unfold 🌅",
				"Every morning brings new possibilities - seize them! ☀️",
				"Rise and shine! Your potential is limitless today 💪"
			],
			afternoon: [
				"Midday momentum - keep pushing forward! 🌞",
				"The afternoon sun reminds us to stay bright and focused ✨",
				"Halfway through the day, halfway to your goals 🎯"
			],
			evening: [
				"Evening reflections bring wisdom for tomorrow 🌙",
				"Wind down with gratitude for today's achievements 🙏",
				"The evening sky holds promises of tomorrow's success 🌆"
			],
			night: [
				"Night brings rest, dreams, and preparation for greatness 🌌",
				"Sleep well knowing tomorrow holds new opportunities 💤",
				"The stars remind us that even in darkness, there's light ✨"
			]
		};

		let timeCategory = 'evening';
		if (h >= 5 && h < 12) timeCategory = 'morning';
		else if (h >= 12 && h < 17) timeCategory = 'afternoon';
		else if (h >= 17 && h < 22) timeCategory = 'evening';
		else timeCategory = 'night';

		const timeQuotes = quotes[timeCategory];
		return timeQuotes[Math.floor(Math.random() * timeQuotes.length)];
	}

	function showAIQuote() {
		if (!aiQuoteEl) return;
		const quote = generateAIQuote();
		aiQuoteEl.textContent = quote;
		aiQuoteEl.classList.add('show');
		setTimeout(() => aiQuoteEl.classList.remove('show'), 5000);
	}

	function showAISuggestion() {
		const suggestions = [
			"💡 Try switching to dark mode for better eye comfort at night",
			"🎨 The color scheme adapts to your system preferences automatically",
			"📱 This site is fully responsive - try resizing your browser!",
			"⌨️ Use keyboard navigation for accessibility - try Tab to navigate",
			"🔄 Refresh the page to see new inspirational quotes",
			"💾 Your contact messages are saved locally in your browser",
			"🌙 The greeting updates automatically based on the time of day",
			"✨ Hover over elements to see smooth animations in action"
		];
		const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)];

		const notification = document.createElement('div');
		notification.textContent = randomSuggestion;
		notification.style.cssText = `
			position: fixed; top: 20px; right: 20px;
			background: var(--elev-1);
			border: 1px solid var(--border);
			border-radius: var(--radius-sm);
			padding: 12px 16px; color: var(--text);
			box-shadow: var(--shadow-md);
			z-index: 1000; max-width: 300px;
			animation: fadeInUp 0.3s ease;
		`;
		document.body.appendChild(notification);
		setTimeout(() => {
			notification.style.animation = 'fadeInUp 0.3s ease reverse';
			setTimeout(() => notification.remove(), 300);
		}, 4000);
	}

	aiSuggestionBtn?.addEventListener('click', showAISuggestion);
	setTimeout(showAIQuote, 1000);
	setInterval(showAIQuote, 30000);
}

// Remember visitor name and update greeting
function setupVisitorMemory() {
	const input = document.getElementById('visitorNameInput');
	const btn = document.getElementById('saveNameBtn');
	const status = document.getElementById('visitorNameStatus');
	const subtitle = document.querySelector('.hero-subtitle');
	const defaultSubtitle = subtitle?.textContent || '';
	if (!input || !btn || !status) return;

	const key = 'visitor-name';
	const saved = localStorage.getItem(key);

	function applyName(value) {
		if (value) {
			status.textContent = `Saved! Hi ${value}, great to see you.`;
			if (subtitle) subtitle.textContent = `Great to see you, ${value}!`;
			document.dispatchEvent(new CustomEvent('visitorNameChanged'));
		} else {
			status.textContent = 'Stored locally for a warmer welcome.';
			if (subtitle) subtitle.textContent = defaultSubtitle;
		}
	}

	if (saved) applyName(saved);
	if (saved) input.value = saved;

	btn.addEventListener('click', () => {
		const value = input.value.trim();
		if (!value) {
			status.textContent = 'Please add your name to personalize the greeting.';
			return;
		}
		localStorage.setItem(key, value);
		applyName(value);
	});
}

// Simple session timer for visitor engagement
function setupSessionTimer() {
	const el = document.getElementById('sessionTimer');
	if (!el) return;
	let seconds = 0;
	setInterval(() => {
		seconds += 1;
		const mins = String(Math.floor(seconds / 60)).padStart(2, '0');
		const secs = String(seconds % 60).padStart(2, '0');
		el.textContent = `Time on site: ${mins}:${secs}`;
	}, 1000);
}

// Enhanced contact form
function setupContactForm() {
	const form = document.getElementById('contactForm');
	const statusEl = document.getElementById('formStatus');
	const exportBtn = document.getElementById('exportBtn');
	if (!form) return;

	function showStatus(msg, ok = true) {
		if (!statusEl) return;
		statusEl.textContent = msg;
		statusEl.className = `form-status ${ok ? 'success' : 'error'}`;
		statusEl.style.display = 'block';
		if (ok) setTimeout(() => statusEl.style.display = 'none', 3000);
	}

	function validate() {
		const name = document.getElementById('name');
		const email = document.getElementById('email');
		const message = document.getElementById('message');
		const nameError = document.getElementById('nameError');
		const emailError = document.getElementById('emailError');
		const messageError = document.getElementById('messageError');
		let ok = true;

		if (!name.value.trim()) {
			nameError.textContent = 'Please enter your name.';
			name.style.borderColor = 'var(--error)';
			ok = false;
		} else {
			nameError.textContent = '';
			name.style.borderColor = 'var(--success)';
		}

		const emailVal = email.value.trim();
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailVal) {
			emailError.textContent = 'Please enter your email.';
			email.style.borderColor = 'var(--error)';
			ok = false;
		} else if (!emailRegex.test(emailVal)) {
			emailError.textContent = 'Please enter a valid email.';
			email.style.borderColor = 'var(--error)';
			ok = false;
		} else {
			emailError.textContent = '';
			email.style.borderColor = 'var(--success)';
		}

		if (!message.value.trim()) {
			messageError.textContent = 'Please enter a message.';
			message.style.borderColor = 'var(--error)';
			ok = false;
		} else {
			messageError.textContent = '';
			message.style.borderColor = 'var(--success)';
		}

		return ok;
	}

	function getMessages() {
		try { return JSON.parse(localStorage.getItem('contact-messages')) || []; }
		catch { return []; }
	}

	function setMessages(arr) { localStorage.setItem('contact-messages', JSON.stringify(arr)); }

	function formatMessage(entry) {
		return [
			'---- Message ----',
			`Name: ${entry.name}`,
			`Email: ${entry.email}`,
			`Date: ${entry.date}`,
			'',
			entry.message,
			'\n'
		].join('\n');
	}

	function downloadAllMessages() {
		const msgs = getMessages();
		if (!msgs.length) return showStatus('No messages to export yet.', false);
		const content = msgs.map(formatMessage).join('\n');
		const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const now = new Date();
		const pad = n => String(n).padStart(2, '0');
		const filename = `messages-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}.txt`;
		const a = document.createElement('a');
		a.href = url; a.download = filename;
		document.body.appendChild(a); a.click();
		URL.revokeObjectURL(url); a.remove();
		showStatus('Messages exported as .txt.');
	}

	const inputs = form.querySelectorAll('input, textarea');
	inputs.forEach(input => {
		input.addEventListener('blur', validate);
		input.addEventListener('input', function() { this.style.borderColor = ''; });
	});

	form.addEventListener('submit', e => {
		e.preventDefault();
		if (!validate()) return showStatus('Please fix the errors above.', false);
		const formData = new FormData(form);
		const entry = {
			name: String(formData.get('name') || '').trim(),
			email: String(formData.get('email') || '').trim(),
			message: String(formData.get('message') || '').trim(),
			date: new Date().toLocaleString()
		};
		const list = getMessages();
		list.push(entry);
		setMessages(list);
		const content = formatMessage(entry);
		const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		const safeName = entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'message';
		a.download = `contact-${safeName}.txt`;
		document.body.appendChild(a); a.click();
		URL.revokeObjectURL(url); a.remove();
		showStatus('Message sent! A .txt file has been downloaded.');
		form.reset();
		inputs.forEach(i => i.style.borderColor = '');
	});
	exportBtn?.addEventListener('click', downloadAllMessages);
}
