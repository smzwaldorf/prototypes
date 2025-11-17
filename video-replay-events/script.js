// Application State
const state = {
    currentUser: null,
    currentDate: new Date(),
    events: []
};

// Sample Events Data (with YouTube video IDs)
// Note: In a real application, this would come from a backend
const sampleEvents = [
    {
        id: 1,
        title: "Welcome Back Assembly",
        description: "Principal's welcome speech and introduction of new staff members. Special performances by the school choir.",
        date: new Date(2025, 10, 5, 9, 0), // November 5, 2025, 9:00 AM
        duration: "45 minutes",
        speaker: "Principal Johnson",
        youtubeId: "dQw4w9WgXcQ" // Sample YouTube ID
    },
    {
        id: 2,
        title: "Parent-Teacher Information Night",
        description: "Overview of curriculum, classroom expectations, and upcoming events for the school year.",
        date: new Date(2025, 10, 12, 18, 30), // November 12, 2025, 6:30 PM
        duration: "1 hour 30 minutes",
        speaker: "Teaching Staff",
        youtubeId: "jNQXAC9IVRw" // Sample YouTube ID
    },
    {
        id: 3,
        title: "Science Fair Presentations",
        description: "Top 10 student presentations from this year's science fair competition. Amazing projects!",
        date: new Date(2025, 10, 20, 14, 0), // November 20, 2025, 2:00 PM
        duration: "2 hours",
        speaker: "Student Presenters",
        youtubeId: "9bZkp7q19f0" // Sample YouTube ID
    },
    {
        id: 4,
        title: "Winter Concert Rehearsal",
        description: "Dress rehearsal for the winter concert featuring band, choir, and orchestra performances.",
        date: new Date(2025, 11, 10, 19, 0), // December 10, 2025, 7:00 PM
        duration: "1 hour 15 minutes",
        speaker: "Music Department",
        youtubeId: "kJQP7kiw5Fk" // Sample YouTube ID
    },
    {
        id: 5,
        title: "Career Day Keynote",
        description: "Guest speaker discusses career opportunities in technology and innovation.",
        date: new Date(2025, 11, 15, 10, 0), // December 15, 2025, 10:00 AM
        duration: "50 minutes",
        speaker: "Dr. Sarah Chen, Tech Entrepreneur",
        youtubeId: "3fumBcKC6RE" // Sample YouTube ID
    },
    {
        id: 6,
        title: "Holiday Celebration",
        description: "End of year celebration with performances, awards, and community building activities.",
        date: new Date(2025, 11, 20, 15, 0), // December 20, 2025, 3:00 PM
        duration: "2 hours",
        speaker: "Entire School Community",
        youtubeId: "yPYZpwSpKmA" // Sample YouTube ID
    }
];

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const appScreen = document.getElementById('appScreen');
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const logoutBtn = document.getElementById('logoutBtn');
const welcomeMessage = document.getElementById('welcomeMessage');
const currentMonthDisplay = document.getElementById('currentMonth');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const eventsList = document.getElementById('eventsList');
const noEventsMessage = document.getElementById('noEvents');
const videoModal = document.getElementById('videoModal');
const closeModalBtn = document.getElementById('closeModal');
const modalEventTitle = document.getElementById('modalEventTitle');
const modalEventDetails = document.getElementById('modalEventDetails');
const videoPlayer = document.getElementById('videoPlayer');

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
});

// Initialize the application
function initializeApp() {
    // Load events
    state.events = sampleEvents;

    // Check if user is already logged in
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        state.currentUser = JSON.parse(savedUser);
        showApp();
    } else {
        showLogin();
    }
}

// Setup event listeners
function setupEventListeners() {
    loginForm.addEventListener('submit', handleLogin);
    logoutBtn.addEventListener('click', handleLogout);
    prevMonthBtn.addEventListener('click', () => navigateMonth(-1));
    nextMonthBtn.addEventListener('click', () => navigateMonth(1));
    closeModalBtn.addEventListener('click', closeVideoModal);

    // Close modal when clicking outside
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });

    // Keyboard navigation for modal
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !videoModal.classList.contains('hidden')) {
            closeVideoModal();
        }
    });
}

// Handle login
function handleLogin(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();

    if (username) {
        // In a real app, this would validate against a backend
        state.currentUser = {
            username: username,
            loginTime: new Date().toISOString()
        };

        // Save to localStorage
        localStorage.setItem('currentUser', JSON.stringify(state.currentUser));

        showApp();
    }
}

// Handle logout
function handleLogout() {
    // Clear user data
    state.currentUser = null;
    localStorage.removeItem('currentUser');

    // Reset form
    loginForm.reset();

    // Show login screen
    showLogin();
}

// Show login screen
function showLogin() {
    loginScreen.classList.remove('hidden');
    appScreen.classList.add('hidden');
}

// Show main app
function showApp() {
    loginScreen.classList.add('hidden');
    appScreen.classList.remove('hidden');

    // Update welcome message
    welcomeMessage.textContent = `Welcome, ${state.currentUser.username}`;

    // Display events for current month
    updateCalendarDisplay();
}

// Navigate between months
function navigateMonth(direction) {
    state.currentDate = new Date(
        state.currentDate.getFullYear(),
        state.currentDate.getMonth() + direction,
        1
    );
    updateCalendarDisplay();
}

// Update calendar display
function updateCalendarDisplay() {
    // Update month/year display
    const monthName = state.currentDate.toLocaleString('default', {
        month: 'long',
        year: 'numeric'
    });
    currentMonthDisplay.textContent = monthName;

    // Filter events for current month
    const eventsThisMonth = filterEventsByMonth(state.events, state.currentDate);

    // Display events
    displayEvents(eventsThisMonth);
}

// Filter events by month
function filterEventsByMonth(events, date) {
    return events.filter(event => {
        return event.date.getMonth() === date.getMonth() &&
               event.date.getFullYear() === date.getFullYear();
    }).sort((a, b) => a.date - b.date); // Sort by date
}

// Display events in the list
function displayEvents(events) {
    // Clear existing events
    eventsList.innerHTML = '';

    if (events.length === 0) {
        noEventsMessage.classList.remove('hidden');
        return;
    }

    noEventsMessage.classList.add('hidden');

    events.forEach(event => {
        const eventCard = createEventCard(event);
        eventsList.appendChild(eventCard);
    });
}

// Create event card element
function createEventCard(event) {
    const card = document.createElement('div');
    card.className = 'event-card';
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `View ${event.title} video`);

    // Format date
    const dateString = event.date.toLocaleDateString('default', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    const timeString = event.date.toLocaleTimeString('default', {
        hour: 'numeric',
        minute: '2-digit'
    });

    card.innerHTML = `
        <div class="event-date">${dateString}</div>
        <h3>${event.title}</h3>
        <p>${event.description}</p>
        <div class="event-meta">
            <span>⏰ ${timeString}</span>
            <span>⏱️ ${event.duration}</span>
            <span>🎤 ${event.speaker}</span>
        </div>
    `;

    // Add click handler to open video
    card.addEventListener('click', () => openVideoModal(event));

    // Add keyboard support
    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openVideoModal(event);
        }
    });

    return card;
}

// Open video modal
function openVideoModal(event) {
    // Set modal content
    modalEventTitle.textContent = event.title;

    modalEventDetails.innerHTML = `
        <p><strong>Date:</strong> ${event.date.toLocaleDateString('default', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        })} at ${event.date.toLocaleTimeString('default', {
            hour: 'numeric',
            minute: '2-digit'
        })}</p>
        <p><strong>Speaker:</strong> ${event.speaker}</p>
        <p><strong>Duration:</strong> ${event.duration}</p>
        <p><strong>Description:</strong> ${event.description}</p>
    `;

    // Set YouTube video
    const embedUrl = `https://www.youtube.com/embed/${event.youtubeId}`;
    videoPlayer.src = embedUrl;

    // Show modal
    videoModal.classList.remove('hidden');

    // Trap focus in modal
    closeModalBtn.focus();
}

// Close video modal
function closeVideoModal() {
    // Stop video playback
    videoPlayer.src = '';

    // Hide modal
    videoModal.classList.add('hidden');
}

// Utility function to format date
function formatDate(date) {
    return date.toLocaleDateString('default', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
}

// Load sample data (could be expanded to load from localStorage)
function loadEventsFromStorage() {
    const savedEvents = localStorage.getItem('schoolEvents');
    if (savedEvents) {
        try {
            const parsed = JSON.parse(savedEvents);
            // Convert date strings back to Date objects
            return parsed.map(event => ({
                ...event,
                date: new Date(event.date)
            }));
        } catch (e) {
            console.error('Error loading events:', e);
            return sampleEvents;
        }
    }
    return sampleEvents;
}

// Save events to storage (for future admin functionality)
function saveEventsToStorage(events) {
    localStorage.setItem('schoolEvents', JSON.stringify(events));
}
