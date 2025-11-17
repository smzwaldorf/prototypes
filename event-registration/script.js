// Data Storage Keys
const STORAGE_KEYS = {
    EVENTS: 'school_events',
    REGISTRATIONS: 'event_registrations',
    PROFILE: 'parent_profile',
    CUSTOM_FIELDS_COUNTER: 'custom_fields_counter'
};

// Global State
let currentEventId = null;
let customFieldsCounter = 0;

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    // Load custom fields counter
    const savedCounter = localStorage.getItem(STORAGE_KEYS.CUSTOM_FIELDS_COUNTER);
    if (savedCounter) {
        customFieldsCounter = parseInt(savedCounter);
    }

    // Set up event listeners
    setupEventListeners();

    // Load parent profile if exists
    loadParentProfile();
}

function setupEventListeners() {
    // Event form submission
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
        eventForm.addEventListener('submit', handleEventSubmit);
    }

    // Profile form submission
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileSubmit);
    }

    // Registration form submission
    const registrationForm = document.getElementById('registration-form');
    if (registrationForm) {
        registrationForm.addEventListener('submit', handleRegistrationSubmit);
    }
}

// ===== SCREEN AND TAB NAVIGATION =====

function selectRole(role) {
    if (role === 'teacher') {
        showScreen('teacher-dashboard');
        loadTeacherEvents();
    } else if (role === 'parent') {
        showScreen('parent-dashboard');
        loadParentEvents();
        loadMyRegistrations();
    }
}

function showScreen(screenId) {
    // Hide all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Show selected screen
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
    }
}

function showTeacherTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('#teacher-dashboard .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('#teacher-dashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Reload events list if switching to it
    if (tabId === 'events-list') {
        loadTeacherEvents();
    }
}

function showParentTab(tabId) {
    // Update tab buttons
    document.querySelectorAll('#parent-dashboard .tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('#parent-dashboard .tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    // Reload appropriate content
    if (tabId === 'browse-events') {
        loadParentEvents();
    } else if (tabId === 'my-registrations') {
        loadMyRegistrations();
    }
}

// ===== DATA MANAGEMENT =====

function getEvents() {
    const events = localStorage.getItem(STORAGE_KEYS.EVENTS);
    return events ? JSON.parse(events) : [];
}

function saveEvents(events) {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
}

function getRegistrations() {
    const registrations = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
    return registrations ? JSON.parse(registrations) : [];
}

function saveRegistrations(registrations) {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
}

function getProfile() {
    const profile = localStorage.getItem(STORAGE_KEYS.PROFILE);
    return profile ? JSON.parse(profile) : null;
}

function saveProfile(profile) {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

// ===== EVENT MANAGEMENT (TEACHER) =====

function loadTeacherEvents() {
    const events = getEvents();
    const registrations = getRegistrations();
    const container = document.getElementById('teacher-events-container');

    if (events.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <h3>No events yet</h3>
                <p>Create your first event to get started</p>
            </div>
        `;
        return;
    }

    container.innerHTML = events.map(event => {
        const eventRegistrations = registrations.filter(r => r.eventId === event.id);
        const totalAttendees = eventRegistrations.reduce((sum, r) => sum + parseInt(r.attendees), 0);
        const attendedCount = eventRegistrations.filter(r => r.attended).length;

        return `
            <div class="event-card" onclick="viewEventDetails('${event.id}')">
                <div class="event-card-header">
                    <h3 class="event-card-title">${event.title}</h3>
                </div>
                <div class="event-card-meta">
                    <div class="event-meta-item">
                        <span>📅</span>
                        <span>${formatDate(event.date)} at ${event.time}</span>
                    </div>
                    <div class="event-meta-item">
                        <span>📍</span>
                        <span>${event.location}</span>
                    </div>
                </div>
                <p class="event-card-description">${event.description}</p>
                <div class="event-card-footer">
                    <div>
                        <span class="event-badge badge-info">${eventRegistrations.length} registrations</span>
                        <span class="event-badge badge-success">${totalAttendees} attendees</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function addCustomField() {
    customFieldsCounter++;
    localStorage.setItem(STORAGE_KEYS.CUSTOM_FIELDS_COUNTER, customFieldsCounter.toString());

    const container = document.getElementById('custom-fields-list');
    const fieldId = `custom-field-${customFieldsCounter}`;

    const fieldHtml = `
        <div class="custom-field-item" id="${fieldId}">
            <input type="text" placeholder="Field Label (e.g., Lunch Choice)" class="field-label">
            <select class="field-type">
                <option value="text">Text</option>
                <option value="select">Dropdown</option>
            </select>
            <input type="text" placeholder="Options (comma-separated)" class="field-options" style="display:none;">
            <button type="button" onclick="removeCustomField('${fieldId}')">×</button>
        </div>
    `;

    container.insertAdjacentHTML('beforeend', fieldHtml);

    // Add listener for type change
    const field = document.getElementById(fieldId);
    const typeSelect = field.querySelector('.field-type');
    const optionsInput = field.querySelector('.field-options');

    typeSelect.addEventListener('change', () => {
        if (typeSelect.value === 'select') {
            optionsInput.style.display = 'block';
        } else {
            optionsInput.style.display = 'none';
        }
    });
}

function removeCustomField(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        field.remove();
    }
}

function handleEventSubmit(e) {
    e.preventDefault();

    const eventId = document.getElementById('event-id').value;
    const title = document.getElementById('event-title').value;
    const description = document.getElementById('event-description').value;
    const date = document.getElementById('event-date').value;
    const time = document.getElementById('event-time').value;
    const location = document.getElementById('event-location').value;
    const capacity = document.getElementById('event-capacity').value;
    const includeLunch = document.getElementById('event-lunch').checked;

    // Get custom fields
    const customFields = [];
    document.querySelectorAll('#custom-fields-list .custom-field-item').forEach(field => {
        const label = field.querySelector('.field-label').value;
        const type = field.querySelector('.field-type').value;
        const options = field.querySelector('.field-options').value;

        if (label) {
            customFields.push({
                label,
                type,
                options: type === 'select' ? options.split(',').map(o => o.trim()) : []
            });
        }
    });

    // Add lunch field if checked
    if (includeLunch) {
        customFields.push({
            label: 'Lunch Choice',
            type: 'select',
            options: ['Meat', 'Vegetables', 'No Lunch']
        });
    }

    const event = {
        id: eventId || Date.now().toString(),
        title,
        description,
        date,
        time,
        location,
        capacity: capacity || null,
        customFields,
        createdAt: eventId ? getEvents().find(e => e.id === eventId).createdAt : new Date().toISOString()
    };

    const events = getEvents();
    const existingIndex = events.findIndex(e => e.id === event.id);

    if (existingIndex >= 0) {
        events[existingIndex] = event;
    } else {
        events.push(event);
    }

    saveEvents(events);

    // Reset form and switch to events list
    document.getElementById('event-form').reset();
    document.getElementById('event-id').value = '';
    document.getElementById('custom-fields-list').innerHTML = '';
    document.getElementById('form-title').textContent = 'Create New Event';

    // Switch to events list tab
    showTeacherTab('events-list');
    loadTeacherEvents();

    // Show success message
    showAlert('Event saved successfully!', 'success');
}

function viewEventDetails(eventId) {
    currentEventId = eventId;
    const events = getEvents();
    const event = events.find(e => e.id === eventId);

    if (!event) return;

    const registrations = getRegistrations().filter(r => r.eventId === eventId);
    const totalAttendees = registrations.reduce((sum, r) => sum + parseInt(r.attendees), 0);

    // Populate modal
    document.getElementById('modal-event-title').textContent = event.title;
    document.getElementById('modal-event-info').innerHTML = `
        <div class="event-info">
            <div class="event-info-item">
                <strong>Description:</strong>
                <span>${event.description}</span>
            </div>
            <div class="event-info-item">
                <strong>Date & Time:</strong>
                <span>${formatDate(event.date)} at ${event.time}</span>
            </div>
            <div class="event-info-item">
                <strong>Location:</strong>
                <span>${event.location}</span>
            </div>
            ${event.capacity ? `
                <div class="event-info-item">
                    <strong>Capacity:</strong>
                    <span>${totalAttendees} / ${event.capacity}</span>
                </div>
            ` : ''}
        </div>
    `;

    document.getElementById('modal-registration-count').textContent = registrations.length;

    // Populate registrations
    const registrationsList = document.getElementById('modal-registrations-list');

    if (registrations.length === 0) {
        registrationsList.innerHTML = `
            <div class="empty-state">
                <p>No registrations yet</p>
            </div>
        `;
    } else {
        registrationsList.innerHTML = registrations.map(reg => {
            const customFieldsHtml = reg.customFields ? reg.customFields.map(cf =>
                `<div class="registration-detail"><strong>${cf.label}:</strong> ${cf.value}</div>`
            ).join('') : '';

            return `
                <div class="registration-card">
                    <div class="registration-header">
                        <div class="registration-name">${reg.parentName}</div>
                        ${reg.attended ?
                            '<span class="event-badge badge-success">Attended ✓</span>' :
                            '<span class="event-badge badge-warning">Not attended</span>'
                        }
                    </div>
                    <div class="registration-details">
                        <div class="registration-detail"><strong>Student:</strong> ${reg.studentName}</div>
                        <div class="registration-detail"><strong>Class:</strong> ${reg.studentClass}</div>
                        <div class="registration-detail"><strong>Email:</strong> ${reg.parentEmail}</div>
                        <div class="registration-detail"><strong>Phone:</strong> ${reg.parentPhone}</div>
                        <div class="registration-detail"><strong>Attendees:</strong> ${reg.attendees}</div>
                        ${customFieldsHtml}
                    </div>
                    <div class="registration-actions">
                        ${!reg.attended ?
                            `<button onclick="markAttended('${reg.id}')" class="btn-success btn-small">Mark Attended</button>` :
                            `<button onclick="unmarkAttended('${reg.id}')" class="btn-secondary btn-small">Unmark</button>`
                        }
                    </div>
                </div>
            `;
        }).join('');
    }

    // Show modal
    document.getElementById('event-details-modal').classList.add('active');
}

function editEvent() {
    const events = getEvents();
    const event = events.find(e => e.id === currentEventId);

    if (!event) return;

    // Populate form
    document.getElementById('event-id').value = event.id;
    document.getElementById('event-title').value = event.title;
    document.getElementById('event-description').value = event.description;
    document.getElementById('event-date').value = event.date;
    document.getElementById('event-time').value = event.time;
    document.getElementById('event-location').value = event.location;
    document.getElementById('event-capacity').value = event.capacity || '';

    // Clear and populate custom fields
    const customFieldsList = document.getElementById('custom-fields-list');
    customFieldsList.innerHTML = '';

    if (event.customFields) {
        event.customFields.forEach(field => {
            // Skip auto-generated lunch field
            if (field.label === 'Lunch Choice') {
                document.getElementById('event-lunch').checked = true;
                return;
            }

            addCustomField();
            const lastField = customFieldsList.lastElementChild;
            lastField.querySelector('.field-label').value = field.label;
            lastField.querySelector('.field-type').value = field.type;

            if (field.type === 'select') {
                const optionsInput = lastField.querySelector('.field-options');
                optionsInput.style.display = 'block';
                optionsInput.value = field.options.join(', ');
            }
        });
    }

    // Update form title
    document.getElementById('form-title').textContent = 'Edit Event';

    // Close modal and switch to create event tab
    closeModal();
    showTeacherTab('create-event');
}

function deleteEvent() {
    if (!confirm('Are you sure you want to delete this event? This will also delete all registrations.')) {
        return;
    }

    const events = getEvents();
    const filteredEvents = events.filter(e => e.id !== currentEventId);
    saveEvents(filteredEvents);

    // Also delete associated registrations
    const registrations = getRegistrations();
    const filteredRegistrations = registrations.filter(r => r.eventId !== currentEventId);
    saveRegistrations(filteredRegistrations);

    closeModal();
    loadTeacherEvents();
    showAlert('Event deleted successfully', 'success');
}

function cancelEventEdit() {
    document.getElementById('event-form').reset();
    document.getElementById('event-id').value = '';
    document.getElementById('custom-fields-list').innerHTML = '';
    document.getElementById('form-title').textContent = 'Create New Event';
    showTeacherTab('events-list');
}

function closeModal() {
    document.getElementById('event-details-modal').classList.remove('active');
    currentEventId = null;
}

// ===== ATTENDANCE TRACKING =====

function markAttended(registrationId) {
    const registrations = getRegistrations();
    const registration = registrations.find(r => r.id === registrationId);

    if (registration) {
        registration.attended = true;
        saveRegistrations(registrations);
        viewEventDetails(currentEventId);
        showAlert('Marked as attended', 'success');
    }
}

function unmarkAttended(registrationId) {
    const registrations = getRegistrations();
    const registration = registrations.find(r => r.id === registrationId);

    if (registration) {
        registration.attended = false;
        saveRegistrations(registrations);
        viewEventDetails(currentEventId);
        showAlert('Unmarked attendance', 'success');
    }
}

// ===== PARENT FUNCTIONALITY =====

function loadParentProfile() {
    const profile = getProfile();

    if (profile) {
        document.getElementById('parent-name').value = profile.parentName;
        document.getElementById('parent-email').value = profile.parentEmail;
        document.getElementById('parent-phone').value = profile.parentPhone;
        document.getElementById('student-name').value = profile.studentName;
        document.getElementById('student-class').value = profile.studentClass;
    }
}

function handleProfileSubmit(e) {
    e.preventDefault();

    const profile = {
        parentName: document.getElementById('parent-name').value,
        parentEmail: document.getElementById('parent-email').value,
        parentPhone: document.getElementById('parent-phone').value,
        studentName: document.getElementById('student-name').value,
        studentClass: document.getElementById('student-class').value
    };

    saveProfile(profile);
    showAlert('Profile saved successfully!', 'success');
}

function loadParentEvents() {
    const events = getEvents();
    const registrations = getRegistrations();
    const profile = getProfile();
    const container = document.getElementById('parent-events-container');

    if (events.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📅</div>
                <h3>No events available</h3>
                <p>Check back later for upcoming events</p>
            </div>
        `;
        return;
    }

    container.innerHTML = events.map(event => {
        const eventRegistrations = registrations.filter(r => r.eventId === event.id);
        const userRegistration = profile ? eventRegistrations.find(r =>
            r.parentEmail === profile.parentEmail
        ) : null;

        const totalAttendees = eventRegistrations.reduce((sum, r) => sum + parseInt(r.attendees), 0);
        const isFull = event.capacity && totalAttendees >= parseInt(event.capacity);

        return `
            <div class="event-card">
                <div class="event-card-header">
                    <h3 class="event-card-title">${event.title}</h3>
                </div>
                <div class="event-card-meta">
                    <div class="event-meta-item">
                        <span>📅</span>
                        <span>${formatDate(event.date)} at ${event.time}</span>
                    </div>
                    <div class="event-meta-item">
                        <span>📍</span>
                        <span>${event.location}</span>
                    </div>
                    ${event.capacity ? `
                        <div class="event-meta-item">
                            <span>👥</span>
                            <span>${totalAttendees} / ${event.capacity} spots filled</span>
                        </div>
                    ` : ''}
                </div>
                <p class="event-card-description">${event.description}</p>
                <div class="event-card-footer">
                    ${userRegistration ?
                        '<span class="event-badge badge-success">Registered ✓</span>' :
                        isFull ?
                            '<span class="event-badge badge-danger">Full</span>' :
                            `<button onclick="openRegistrationModal('${event.id}')" class="btn-primary btn-small">Register</button>`
                    }
                </div>
            </div>
        `;
    }).join('');
}

function loadMyRegistrations() {
    const profile = getProfile();
    const container = document.getElementById('my-registrations-container');

    if (!profile) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👤</div>
                <h3>No profile found</h3>
                <p>Please create your profile first to view registrations</p>
            </div>
        `;
        return;
    }

    const registrations = getRegistrations().filter(r => r.parentEmail === profile.parentEmail);

    if (registrations.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <h3>No registrations yet</h3>
                <p>Register for events to see them here</p>
            </div>
        `;
        return;
    }

    const events = getEvents();

    container.innerHTML = registrations.map(reg => {
        const event = events.find(e => e.id === reg.eventId);

        if (!event) return '';

        const customFieldsHtml = reg.customFields ? reg.customFields.map(cf =>
            `<div class="event-meta-item"><span>${cf.label}:</span><span>${cf.value}</span></div>`
        ).join('') : '';

        return `
            <div class="event-card">
                <div class="event-card-header">
                    <h3 class="event-card-title">${event.title}</h3>
                </div>
                <div class="event-card-meta">
                    <div class="event-meta-item">
                        <span>📅</span>
                        <span>${formatDate(event.date)} at ${event.time}</span>
                    </div>
                    <div class="event-meta-item">
                        <span>📍</span>
                        <span>${event.location}</span>
                    </div>
                    <div class="event-meta-item">
                        <span>👥</span>
                        <span>${reg.attendees} attendee(s)</span>
                    </div>
                    ${customFieldsHtml}
                </div>
                <div class="event-card-footer">
                    ${reg.attended ?
                        '<span class="event-badge badge-success">Attended ✓</span>' :
                        '<span class="event-badge badge-info">Registered</span>'
                    }
                    <button onclick="cancelRegistration('${reg.id}')" class="btn-danger btn-small">Cancel Registration</button>
                </div>
            </div>
        `;
    }).join('');
}

function openRegistrationModal(eventId) {
    const profile = getProfile();

    if (!profile) {
        alert('Please create your profile first before registering for events.');
        showParentTab('my-profile');
        return;
    }

    const events = getEvents();
    const event = events.find(e => e.id === eventId);

    if (!event) return;

    currentEventId = eventId;

    // Populate modal info
    document.getElementById('reg-modal-event-title').textContent = event.title;
    document.getElementById('reg-modal-event-info').innerHTML = `
        <div class="event-info">
            <div class="event-info-item">
                <strong>Date & Time:</strong>
                <span>${formatDate(event.date)} at ${event.time}</span>
            </div>
            <div class="event-info-item">
                <strong>Location:</strong>
                <span>${event.location}</span>
            </div>
        </div>
    `;

    // Pre-fill form with profile data
    document.getElementById('reg-event-id').value = eventId;
    document.getElementById('reg-parent-name').value = profile.parentName;
    document.getElementById('reg-parent-email').value = profile.parentEmail;
    document.getElementById('reg-parent-phone').value = profile.parentPhone;
    document.getElementById('reg-student-name').value = profile.studentName;
    document.getElementById('reg-student-class').value = profile.studentClass;

    // Add custom fields
    const customFieldsContainer = document.getElementById('reg-custom-fields');
    customFieldsContainer.innerHTML = '';

    if (event.customFields && event.customFields.length > 0) {
        event.customFields.forEach((field, index) => {
            const fieldHtml = field.type === 'select' ? `
                <div class="form-group">
                    <label for="reg-custom-${index}">${field.label} *</label>
                    <select id="reg-custom-${index}" required>
                        <option value="">Select...</option>
                        ${field.options.map(opt => `<option value="${opt}">${opt}</option>`).join('')}
                    </select>
                </div>
            ` : `
                <div class="form-group">
                    <label for="reg-custom-${index}">${field.label} *</label>
                    <input type="text" id="reg-custom-${index}" required>
                </div>
            `;

            customFieldsContainer.insertAdjacentHTML('beforeend', fieldHtml);
        });
    }

    // Show modal
    document.getElementById('registration-modal').classList.add('active');
}

function closeRegistrationModal() {
    document.getElementById('registration-modal').classList.remove('active');
    document.getElementById('registration-form').reset();
    currentEventId = null;
}

function handleRegistrationSubmit(e) {
    e.preventDefault();

    const eventId = document.getElementById('reg-event-id').value;
    const event = getEvents().find(e => e.id === eventId);

    // Collect custom fields
    const customFields = [];
    if (event.customFields) {
        event.customFields.forEach((field, index) => {
            const value = document.getElementById(`reg-custom-${index}`).value;
            customFields.push({
                label: field.label,
                value: value
            });
        });
    }

    const registration = {
        id: Date.now().toString(),
        eventId: eventId,
        parentName: document.getElementById('reg-parent-name').value,
        parentEmail: document.getElementById('reg-parent-email').value,
        parentPhone: document.getElementById('reg-parent-phone').value,
        studentName: document.getElementById('reg-student-name').value,
        studentClass: document.getElementById('reg-student-class').value,
        attendees: document.getElementById('reg-attendees').value,
        customFields: customFields,
        attended: false,
        registeredAt: new Date().toISOString()
    };

    const registrations = getRegistrations();
    registrations.push(registration);
    saveRegistrations(registrations);

    closeRegistrationModal();
    loadParentEvents();
    loadMyRegistrations();
    showAlert('Successfully registered for the event!', 'success');
}

function cancelRegistration(registrationId) {
    if (!confirm('Are you sure you want to cancel this registration?')) {
        return;
    }

    const registrations = getRegistrations();
    const filteredRegistrations = registrations.filter(r => r.id !== registrationId);
    saveRegistrations(filteredRegistrations);

    loadMyRegistrations();
    loadParentEvents();
    showAlert('Registration cancelled', 'success');
}

// ===== UTILITY FUNCTIONS =====

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showAlert(message, type) {
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    alert.style.position = 'fixed';
    alert.style.top = '20px';
    alert.style.right = '20px';
    alert.style.zIndex = '10000';
    alert.style.maxWidth = '400px';
    alert.style.animation = 'slideIn 0.3s ease';

    document.body.appendChild(alert);

    // Remove after 3 seconds
    setTimeout(() => {
        alert.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            alert.remove();
        }, 300);
    }, 3000);
}

// Add CSS animations for alerts
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
