// Global state management
const state = {
    wishes: [],
    currentView: 'parent',
    upvotedWishes: new Set()
};

// Initialize app on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initializeEventListeners();
    renderParentView();
    updateDashboardStats();
});

// Load data from localStorage
function loadData() {
    const savedWishes = localStorage.getItem('schoolWishes');
    const savedUpvotes = localStorage.getItem('upvotedWishes');

    if (savedWishes) {
        state.wishes = JSON.parse(savedWishes);
    }

    if (savedUpvotes) {
        state.upvotedWishes = new Set(JSON.parse(savedUpvotes));
    }
}

// Save data to localStorage
function saveData() {
    localStorage.setItem('schoolWishes', JSON.stringify(state.wishes));
    localStorage.setItem('upvotedWishes', JSON.stringify([...state.upvotedWishes]));
}

// Initialize event listeners
function initializeEventListeners() {
    // Role switching
    document.getElementById('parentViewBtn').addEventListener('click', () => switchView('parent'));
    document.getElementById('adminViewBtn').addEventListener('click', () => switchView('admin'));

    // Wish form submission
    document.getElementById('wishForm').addEventListener('submit', handleWishSubmit);

    // Anonymous checkbox
    document.getElementById('submitAnonymous').addEventListener('change', handleAnonymousToggle);

    // Parent view filters
    document.getElementById('parentStatusFilter').addEventListener('change', renderParentView);
    document.getElementById('parentCategoryFilter').addEventListener('change', renderParentView);
    document.getElementById('parentSortBy').addEventListener('change', renderParentView);

    // Admin view filters
    document.getElementById('adminStatusFilter').addEventListener('change', renderAdminView);
    document.getElementById('adminCategoryFilter').addEventListener('change', renderAdminView);
    document.getElementById('adminSortBy').addEventListener('change', renderAdminView);

    // Modal close
    const modal = document.getElementById('wishModal');
    const closeBtn = document.querySelector('.close');

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Switch between parent and admin views
function switchView(view) {
    state.currentView = view;

    // Update buttons
    const parentBtn = document.getElementById('parentViewBtn');
    const adminBtn = document.getElementById('adminViewBtn');

    if (view === 'parent') {
        parentBtn.classList.add('active');
        adminBtn.classList.remove('active');
        document.getElementById('parentView').classList.add('active');
        document.getElementById('adminView').classList.remove('active');
        renderParentView();
    } else {
        adminBtn.classList.add('active');
        parentBtn.classList.remove('active');
        document.getElementById('adminView').classList.add('active');
        document.getElementById('parentView').classList.remove('active');
        renderAdminView();
        updateDashboardStats();
    }
}

// Handle anonymous submission toggle
function handleAnonymousToggle(e) {
    const parentNameGroup = document.getElementById('parentNameGroup');
    const parentNameInput = document.getElementById('parentName');

    if (e.target.checked) {
        parentNameGroup.style.display = 'none';
        parentNameInput.removeAttribute('required');
    } else {
        parentNameGroup.style.display = 'flex';
        parentNameInput.setAttribute('required', 'required');
    }
}

// Handle wish form submission
function handleWishSubmit(e) {
    e.preventDefault();

    const title = document.getElementById('wishTitle').value.trim();
    const description = document.getElementById('wishDescription').value.trim();
    const category = document.getElementById('wishCategory').value;
    const isAnonymous = document.getElementById('submitAnonymous').checked;
    const parentName = document.getElementById('parentName').value.trim();

    if (!title || !description) {
        alert('Please fill in all required fields');
        return;
    }

    if (!isAnonymous && !parentName) {
        alert('Please enter your name or submit anonymously');
        return;
    }

    const wish = {
        id: generateId(),
        title,
        description,
        category,
        author: isAnonymous ? 'Anonymous' : parentName,
        isAnonymous,
        status: 'new',
        upvotes: 0,
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    state.wishes.unshift(wish);
    saveData();

    // Reset form
    document.getElementById('wishForm').reset();
    document.getElementById('parentNameGroup').style.display = 'flex';
    document.getElementById('parentName').setAttribute('required', 'required');

    // Show success message
    alert('Your wish has been submitted successfully!');

    // Refresh view
    renderParentView();
}

// Generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Render parent view
function renderParentView() {
    const container = document.getElementById('parentWishList');
    const statusFilter = document.getElementById('parentStatusFilter').value;
    const categoryFilter = document.getElementById('parentCategoryFilter').value;
    const sortBy = document.getElementById('parentSortBy').value;

    let filteredWishes = filterWishes(statusFilter, categoryFilter);
    filteredWishes = sortWishes(filteredWishes, sortBy);

    if (filteredWishes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <div class="empty-state-text">No wishes found. Be the first to submit a wish!</div>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredWishes.map(wish => createWishCard(wish, 'parent')).join('');

    // Add upvote event listeners
    filteredWishes.forEach(wish => {
        const upvoteBtn = document.getElementById(`upvote-${wish.id}`);
        if (upvoteBtn) {
            upvoteBtn.addEventListener('click', () => handleUpvote(wish.id));
        }
    });
}

// Render admin view
function renderAdminView() {
    const container = document.getElementById('adminWishList');
    const statusFilter = document.getElementById('adminStatusFilter').value;
    const categoryFilter = document.getElementById('adminCategoryFilter').value;
    const sortBy = document.getElementById('adminSortBy').value;

    let filteredWishes = filterWishes(statusFilter, categoryFilter);
    filteredWishes = sortWishes(filteredWishes, sortBy);

    if (filteredWishes.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📋</div>
                <div class="empty-state-text">No wishes to manage yet.</div>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredWishes.map(wish => createWishCard(wish, 'admin')).join('');

    // Add click event listeners for admin cards
    filteredWishes.forEach(wish => {
        const card = document.getElementById(`wish-card-${wish.id}`);
        if (card) {
            card.addEventListener('click', () => openWishModal(wish.id));
        }
    });
}

// Filter wishes
function filterWishes(statusFilter, categoryFilter) {
    return state.wishes.filter(wish => {
        const statusMatch = statusFilter === 'all' || wish.status === statusFilter;
        const categoryMatch = categoryFilter === 'all' || wish.category === categoryFilter;
        return statusMatch && categoryMatch;
    });
}

// Sort wishes
function sortWishes(wishes, sortBy) {
    const sorted = [...wishes];

    switch (sortBy) {
        case 'recent':
            sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            break;
        case 'oldest':
            sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
            break;
        case 'popular':
            sorted.sort((a, b) => b.upvotes - a.upvotes);
            break;
    }

    return sorted;
}

// Create wish card HTML
function createWishCard(wish, viewType) {
    const isUpvoted = state.upvotedWishes.has(wish.id);
    const upvotedClass = isUpvoted ? 'upvoted' : '';
    const cardClass = viewType === 'admin' ? 'wish-card admin-wish-card' : 'wish-card';

    return `
        <div class="${cardClass}" id="wish-card-${wish.id}">
            <div class="wish-card-header">
                <div class="wish-card-main">
                    <h3 class="wish-card-title">${escapeHtml(wish.title)}</h3>
                    <div class="wish-card-meta">
                        <span>👤 ${escapeHtml(wish.author)}</span>
                        <span>📅 ${formatDate(wish.createdAt)}</span>
                        <span class="category-badge">${getCategoryLabel(wish.category)}</span>
                    </div>
                </div>
                <div class="upvote-btn ${upvotedClass}" id="upvote-${wish.id}">
                    <span class="upvote-icon">▲</span>
                    <span class="upvote-count">${wish.upvotes}</span>
                </div>
            </div>
            <div class="wish-card-description">${escapeHtml(wish.description)}</div>
            <div class="wish-card-footer">
                <span class="status-badge status-${wish.status}">${getStatusLabel(wish.status)}</span>
                ${wish.comments.length > 0 ? `<span>💬 ${wish.comments.length} comment${wish.comments.length > 1 ? 's' : ''}</span>` : ''}
            </div>
        </div>
    `;
}

// Handle upvote
function handleUpvote(wishId) {
    const wish = state.wishes.find(w => w.id === wishId);
    if (!wish) return;

    if (state.upvotedWishes.has(wishId)) {
        // Remove upvote
        state.upvotedWishes.delete(wishId);
        wish.upvotes = Math.max(0, wish.upvotes - 1);
    } else {
        // Add upvote
        state.upvotedWishes.add(wishId);
        wish.upvotes += 1;
    }

    wish.updatedAt = new Date().toISOString();
    saveData();

    // Re-render current view
    if (state.currentView === 'parent') {
        renderParentView();
    } else {
        renderAdminView();
    }
}

// Open wish modal (admin view)
function openWishModal(wishId) {
    const wish = state.wishes.find(w => w.id === wishId);
    if (!wish) return;

    const modal = document.getElementById('wishModal');
    const modalBody = document.getElementById('modalBody');

    modalBody.innerHTML = `
        <div class="modal-body">
            <div class="modal-header">
                <h2 class="modal-title">${escapeHtml(wish.title)}</h2>
                <div class="modal-meta">
                    <span>👤 ${escapeHtml(wish.author)}</span>
                    <span>📅 ${formatDate(wish.createdAt)}</span>
                    <span class="category-badge">${getCategoryLabel(wish.category)}</span>
                    <span>▲ ${wish.upvotes} upvote${wish.upvotes !== 1 ? 's' : ''}</span>
                </div>
            </div>

            <div class="modal-description">
                ${escapeHtml(wish.description)}
            </div>

            <div class="modal-section">
                <h3>Update Status</h3>
                <div class="status-selector">
                    <button class="status-option ${wish.status === 'new' ? 'selected' : ''}" data-status="new">New</button>
                    <button class="status-option ${wish.status === 'under-review' ? 'selected' : ''}" data-status="under-review">Under Review</button>
                    <button class="status-option ${wish.status === 'planned' ? 'selected' : ''}" data-status="planned">Planned</button>
                    <button class="status-option ${wish.status === 'in-progress' ? 'selected' : ''}" data-status="in-progress">In Progress</button>
                    <button class="status-option ${wish.status === 'completed' ? 'selected' : ''}" data-status="completed">Completed</button>
                    <button class="status-option ${wish.status === 'declined' ? 'selected' : ''}" data-status="declined">Declined</button>
                </div>
            </div>

            <div class="modal-section">
                <h3>Comments & Feedback</h3>
                <form class="comment-form" id="commentForm-${wish.id}">
                    <textarea id="commentText-${wish.id}" rows="3" placeholder="Add a comment or feedback..." required></textarea>
                    <button type="submit" class="btn btn-primary btn-small">Add Comment</button>
                </form>

                <div class="comments-section">
                    <div class="comments-list" id="commentsList-${wish.id}">
                        ${wish.comments.length > 0 ? wish.comments.map(comment => `
                            <div class="comment">
                                <div class="comment-header">
                                    <span class="comment-author">👨‍🏫 ${escapeHtml(comment.author)}</span>
                                    <span class="comment-date">${formatDate(comment.createdAt)}</span>
                                </div>
                                <div class="comment-text">${escapeHtml(comment.text)}</div>
                            </div>
                        `).join('') : '<p style="color: var(--text-secondary); font-size: 0.875rem;">No comments yet.</p>'}
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.classList.add('active');

    // Add status change listeners
    const statusButtons = modalBody.querySelectorAll('.status-option');
    statusButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const newStatus = btn.dataset.status;
            updateWishStatus(wishId, newStatus);

            // Update button states
            statusButtons.forEach(b => b.classList.remove('selected'));
            btn.classList.add('selected');
        });
    });

    // Add comment form listener
    const commentForm = document.getElementById(`commentForm-${wish.id}`);
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const commentText = document.getElementById(`commentText-${wish.id}`).value.trim();
        if (commentText) {
            addComment(wishId, commentText);
            document.getElementById(`commentText-${wish.id}`).value = '';

            // Refresh modal content
            openWishModal(wishId);
        }
    });
}

// Update wish status
function updateWishStatus(wishId, newStatus) {
    const wish = state.wishes.find(w => w.id === wishId);
    if (!wish) return;

    wish.status = newStatus;
    wish.updatedAt = new Date().toISOString();
    saveData();

    // Update dashboard stats if in admin view
    if (state.currentView === 'admin') {
        updateDashboardStats();
        renderAdminView();
    }
}

// Add comment to wish
function addComment(wishId, commentText) {
    const wish = state.wishes.find(w => w.id === wishId);
    if (!wish) return;

    const comment = {
        id: generateId(),
        author: 'School Admin',
        text: commentText,
        createdAt: new Date().toISOString()
    };

    wish.comments.push(comment);
    wish.updatedAt = new Date().toISOString();
    saveData();

    // Refresh admin view if visible
    if (state.currentView === 'admin') {
        renderAdminView();
    }
}

// Update dashboard statistics
function updateDashboardStats() {
    const total = state.wishes.length;
    const newWishes = state.wishes.filter(w => w.status === 'new').length;
    const inProgress = state.wishes.filter(w => w.status === 'in-progress').length;
    const completed = state.wishes.filter(w => w.status === 'completed').length;

    document.getElementById('totalWishes').textContent = total;
    document.getElementById('newWishes').textContent = newWishes;
    document.getElementById('inProgressWishes').textContent = inProgress;
    document.getElementById('completedWishes').textContent = completed;
}

// Utility functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        if (diffHours === 0) {
            const diffMinutes = Math.floor(diffTime / (1000 * 60));
            return diffMinutes <= 1 ? 'Just now' : `${diffMinutes} minutes ago`;
        }
        return diffHours === 1 ? '1 hour ago' : `${diffHours} hours ago`;
    } else if (diffDays === 1) {
        return 'Yesterday';
    } else if (diffDays < 7) {
        return `${diffDays} days ago`;
    } else {
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    }
}

function getStatusLabel(status) {
    const labels = {
        'new': 'New',
        'under-review': 'Under Review',
        'planned': 'Planned',
        'in-progress': 'In Progress',
        'completed': 'Completed',
        'declined': 'Declined'
    };
    return labels[status] || status;
}

function getCategoryLabel(category) {
    const labels = {
        'facilities': '🏫 Facilities',
        'curriculum': '📚 Curriculum',
        'activities': '⚽ Activities',
        'resources': '🖥️ Resources',
        'other': '📌 Other'
    };
    return labels[category] || category;
}
