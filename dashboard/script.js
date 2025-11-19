// Prototypes Configuration
// Add new prototypes to this array as they are created
const prototypes = [
    // Example prototype structure:
    // {
    //     id: 'attendance-tracker',
    //     name: 'Attendance Tracker',
    //     description: 'Simple interface to track student attendance with daily records and weekly summaries.',
    //     category: 'tracking',
    //     icon: '📋',
    //     path: '../attendance-tracker/index.html',
    //     added: '2024-01-15'
    // },
    // Add your prototypes here
];

// State management
let currentFilter = 'all';
let currentSearch = '';

// DOM Elements
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const prototypesGrid = document.getElementById('prototypesGrid');
const emptyState = document.getElementById('emptyState');
const noPrototypes = document.getElementById('noPrototypes');
const totalPrototypesEl = document.getElementById('totalPrototypes');
const categoriesCountEl = document.getElementById('categoriesCount');
const recentlyAddedEl = document.getElementById('recentlyAdded');

// Initialize app on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

/**
 * Initialize the application
 */
function initializeApp() {
    updateStats();
    renderPrototypes();
    checkForNoPrototypes();
}

/**
 * Setup event listeners for search and filter
 */
function setupEventListeners() {
    // Search input
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value.toLowerCase();
        filterPrototypes();
    });

    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            // Update filter
            currentFilter = e.target.dataset.category;
            filterPrototypes();
        });
    });
}

/**
 * Render all prototype cards
 */
function renderPrototypes() {
    prototypesGrid.innerHTML = '';

    if (prototypes.length === 0) {
        return;
    }

    prototypes.forEach(prototype => {
        const card = createPrototypeCard(prototype);
        prototypesGrid.appendChild(card);
    });
}

/**
 * Create a prototype card element
 * @param {Object} prototype - Prototype data
 * @returns {HTMLElement} Card element
 */
function createPrototypeCard(prototype) {
    const card = document.createElement('div');
    card.className = 'prototype-card';
    card.dataset.category = prototype.category;
    card.dataset.name = prototype.name.toLowerCase();
    card.dataset.description = prototype.description.toLowerCase();

    card.innerHTML = `
        <div class="card-header">
            <div class="card-icon">${prototype.icon}</div>
            <h3 class="card-title">${prototype.name}</h3>
            <span class="card-category">${prototype.category}</span>
        </div>
        <div class="card-body">
            <p class="card-description">${prototype.description}</p>
        </div>
        <div class="card-footer">
            <a href="${prototype.path}" class="card-link">Open Prototype</a>
        </div>
    `;

    return card;
}

/**
 * Filter prototypes based on current search and category
 */
function filterPrototypes() {
    const cards = document.querySelectorAll('.prototype-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const category = card.dataset.category;
        const name = card.dataset.name;
        const description = card.dataset.description;

        // Check category filter
        const categoryMatch = currentFilter === 'all' || category === currentFilter;

        // Check search filter
        const searchMatch = currentSearch === '' ||
            name.includes(currentSearch) ||
            description.includes(currentSearch);

        // Show/hide card
        if (categoryMatch && searchMatch) {
            card.classList.remove('hidden');
            visibleCount++;
        } else {
            card.classList.add('hidden');
        }
    });

    // Show/hide empty state
    if (visibleCount === 0 && prototypes.length > 0) {
        emptyState.classList.add('show');
    } else {
        emptyState.classList.remove('show');
    }
}

/**
 * Update statistics
 */
function updateStats() {
    // Total prototypes
    totalPrototypesEl.textContent = prototypes.length;

    // Unique categories
    const categories = new Set(prototypes.map(p => p.category));
    categoriesCountEl.textContent = categories.size;

    // Recently added (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentCount = prototypes.filter(p => {
        const addedDate = new Date(p.added);
        return addedDate >= thirtyDaysAgo;
    }).length;

    recentlyAddedEl.textContent = recentCount;
}

/**
 * Check if there are no prototypes and show appropriate message
 */
function checkForNoPrototypes() {
    if (prototypes.length === 0) {
        noPrototypes.classList.add('show');
        prototypesGrid.style.display = 'none';
    } else {
        noPrototypes.classList.remove('show');
        prototypesGrid.style.display = 'grid';
    }
}

/**
 * Add a new prototype dynamically
 * This function can be used to add prototypes programmatically
 * @param {Object} prototype - Prototype data
 */
function addPrototype(prototype) {
    prototypes.push(prototype);
    updateStats();
    renderPrototypes();
    checkForNoPrototypes();
}

/**
 * Get prototypes by category
 * @param {string} category - Category name
 * @returns {Array} Filtered prototypes
 */
function getPrototypesByCategory(category) {
    return prototypes.filter(p => p.category === category);
}

/**
 * Search prototypes
 * @param {string} query - Search query
 * @returns {Array} Matching prototypes
 */
function searchPrototypes(query) {
    const lowerQuery = query.toLowerCase();
    return prototypes.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
}

// Export functions for potential use in console or other scripts
window.dashboardAPI = {
    addPrototype,
    getPrototypesByCategory,
    searchPrototypes,
    prototypes
};
