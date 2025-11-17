// ============================================
// Data Management and Storage
// ============================================

class DataManager {
    constructor() {
        this.loadData();
    }

    loadData() {
        this.events = JSON.parse(localStorage.getItem('photoEvents') || '[]');
        this.students = JSON.parse(localStorage.getItem('photoStudents') || '[]');
        this.photos = JSON.parse(localStorage.getItem('photoPhotos') || '[]');

        // Initialize with sample data if empty
        if (this.students.length === 0) {
            this.initializeSampleData();
        }
    }

    initializeSampleData() {
        this.students = [
            { id: this.generateId(), name: 'Emma Johnson', class: '3rd Grade - Mrs. Smith' },
            { id: this.generateId(), name: 'Liam Chen', class: '3rd Grade - Mrs. Smith' },
            { id: this.generateId(), name: 'Olivia Martinez', class: '4th Grade - Mr. Davis' },
            { id: this.generateId(), name: 'Noah Williams', class: '4th Grade - Mr. Davis' },
            { id: this.generateId(), name: 'Ava Brown', class: '5th Grade - Ms. Johnson' },
            { id: this.generateId(), name: 'Ethan Davis', class: '5th Grade - Ms. Johnson' }
        ];
        this.saveStudents();
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Events
    addEvent(event) {
        event.id = this.generateId();
        event.createdAt = new Date().toISOString();
        this.events.push(event);
        this.saveEvents();
        return event;
    }

    getEvents() {
        return this.events;
    }

    getEvent(id) {
        return this.events.find(e => e.id === id);
    }

    deleteEvent(id) {
        this.events = this.events.filter(e => e.id !== id);
        this.photos = this.photos.filter(p => p.eventId !== id);
        this.saveEvents();
        this.savePhotos();
    }

    saveEvents() {
        localStorage.setItem('photoEvents', JSON.stringify(this.events));
    }

    // Students
    addStudent(student) {
        student.id = this.generateId();
        this.students.push(student);
        this.saveStudents();
        return student;
    }

    getStudents() {
        return this.students;
    }

    getStudent(id) {
        return this.students.find(s => s.id === id);
    }

    deleteStudent(id) {
        this.students = this.students.filter(s => s.id !== id);
        // Remove student from photo tags
        this.photos.forEach(photo => {
            photo.tags = photo.tags.filter(tagId => tagId !== id);
        });
        this.saveStudents();
        this.savePhotos();
    }

    saveStudents() {
        localStorage.setItem('photoStudents', JSON.stringify(this.students));
    }

    // Photos
    addPhoto(photo) {
        photo.id = this.generateId();
        photo.uploadedAt = new Date().toISOString();
        this.photos.push(photo);
        this.savePhotos();
        return photo;
    }

    getPhotos(eventId = null) {
        if (eventId) {
            return this.photos.filter(p => p.eventId === eventId);
        }
        return this.photos;
    }

    getPhoto(id) {
        return this.photos.find(p => p.id === id);
    }

    updatePhotoTags(photoId, tags) {
        const photo = this.getPhoto(photoId);
        if (photo) {
            photo.tags = tags;
            this.savePhotos();
        }
    }

    deletePhoto(id) {
        this.photos = this.photos.filter(p => p.id !== id);
        this.savePhotos();
    }

    savePhotos() {
        localStorage.setItem('photoPhotos', JSON.stringify(this.photos));
    }

    // Get unique classes
    getClasses() {
        const classes = [...new Set(this.students.map(s => s.class))];
        return classes.sort();
    }
}

// ============================================
// UI Controller
// ============================================

class UIController {
    constructor(dataManager) {
        this.dataManager = dataManager;
        this.currentRole = 'teacher';
        this.currentTab = 'events';
        this.currentEventId = null;
        this.currentPhotoId = null;
        this.uploadedPhotos = [];

        this.initializeElements();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        // Views
        this.teacherView = document.getElementById('teacherView');
        this.parentView = document.getElementById('parentView');

        // Role selector
        this.roleSelector = document.getElementById('roleSelector');

        // Tabs
        this.tabBtns = document.querySelectorAll('.tab-btn');
        this.eventsTab = document.getElementById('eventsTab');
        this.studentsTab = document.getElementById('studentsTab');
        this.uploadTab = document.getElementById('uploadTab');

        // Events
        this.createEventBtn = document.getElementById('createEventBtn');
        this.eventForm = document.getElementById('eventForm');
        this.newEventForm = document.getElementById('newEventForm');
        this.cancelEventBtn = document.getElementById('cancelEventBtn');
        this.eventsList = document.getElementById('eventsList');

        // Students
        this.addStudentBtn = document.getElementById('addStudentBtn');
        this.studentForm = document.getElementById('studentForm');
        this.newStudentForm = document.getElementById('newStudentForm');
        this.cancelStudentBtn = document.getElementById('cancelStudentBtn');
        this.studentsList = document.getElementById('studentsList');

        // Upload
        this.uploadEventSelect = document.getElementById('uploadEventSelect');
        this.uploadArea = document.getElementById('uploadArea');
        this.uploadZone = document.getElementById('uploadZone');
        this.photoInput = document.getElementById('photoInput');
        this.photosPreview = document.getElementById('photosPreview');

        // Parent view
        this.parentEventSelect = document.getElementById('parentEventSelect');
        this.studentFilter = document.getElementById('studentFilter');
        this.classFilter = document.getElementById('classFilter');
        this.clearFiltersBtn = document.getElementById('clearFiltersBtn');
        this.photoCount = document.getElementById('photoCount');
        this.photoGallery = document.getElementById('photoGallery');

        // Modals
        this.tagModal = document.getElementById('tagModal');
        this.closeTagModal = document.getElementById('closeTagModal');
        this.tagPhotoImg = document.getElementById('tagPhotoImg');
        this.studentCheckboxes = document.getElementById('studentCheckboxes');
        this.saveTagsBtn = document.getElementById('saveTagsBtn');
        this.cancelTagsBtn = document.getElementById('cancelTagsBtn');

        this.viewModal = document.getElementById('viewModal');
        this.closeViewModal = document.getElementById('closeViewModal');
        this.viewPhotoImg = document.getElementById('viewPhotoImg');
        this.photoTags = document.getElementById('photoTags');
        this.downloadPhotoBtn = document.getElementById('downloadPhotoBtn');
        this.closeViewBtn = document.getElementById('closeViewBtn');
    }

    attachEventListeners() {
        // Role switching
        this.roleSelector.addEventListener('change', (e) => {
            this.switchRole(e.target.value);
        });

        // Tabs
        this.tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Events
        this.createEventBtn.addEventListener('click', () => {
            this.eventForm.classList.remove('hidden');
        });

        this.cancelEventBtn.addEventListener('click', () => {
            this.eventForm.classList.add('hidden');
            this.newEventForm.reset();
        });

        this.newEventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCreateEvent();
        });

        // Students
        this.addStudentBtn.addEventListener('click', () => {
            this.studentForm.classList.remove('hidden');
        });

        this.cancelStudentBtn.addEventListener('click', () => {
            this.studentForm.classList.add('hidden');
            this.newStudentForm.reset();
        });

        this.newStudentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleAddStudent();
        });

        // Upload
        this.uploadEventSelect.addEventListener('change', (e) => {
            this.currentEventId = e.target.value;
            if (this.currentEventId) {
                this.uploadArea.classList.remove('hidden');
                this.renderUploadedPhotos();
            } else {
                this.uploadArea.classList.add('hidden');
            }
        });

        this.uploadZone.addEventListener('click', () => {
            this.photoInput.click();
        });

        this.photoInput.addEventListener('change', (e) => {
            this.handlePhotoUpload(e.target.files);
        });

        // Drag and drop
        this.uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            this.uploadZone.classList.add('drag-over');
        });

        this.uploadZone.addEventListener('dragleave', () => {
            this.uploadZone.classList.remove('drag-over');
        });

        this.uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            this.uploadZone.classList.remove('drag-over');
            this.handlePhotoUpload(e.dataTransfer.files);
        });

        // Tag modal
        this.closeTagModal.addEventListener('click', () => {
            this.closeModal(this.tagModal);
        });

        this.cancelTagsBtn.addEventListener('click', () => {
            this.closeModal(this.tagModal);
        });

        this.saveTagsBtn.addEventListener('click', () => {
            this.handleSaveTags();
        });

        // View modal
        this.closeViewModal.addEventListener('click', () => {
            this.closeModal(this.viewModal);
        });

        this.closeViewBtn.addEventListener('click', () => {
            this.closeModal(this.viewModal);
        });

        this.downloadPhotoBtn.addEventListener('click', () => {
            this.handleDownloadPhoto();
        });

        // Parent filters
        this.parentEventSelect.addEventListener('change', () => {
            this.renderPhotoGallery();
        });

        this.studentFilter.addEventListener('change', () => {
            this.renderPhotoGallery();
        });

        this.classFilter.addEventListener('change', () => {
            this.renderPhotoGallery();
        });

        this.clearFiltersBtn.addEventListener('click', () => {
            this.parentEventSelect.value = '';
            this.studentFilter.value = '';
            this.classFilter.value = '';
            this.renderPhotoGallery();
        });
    }

    render() {
        this.switchRole(this.currentRole);
    }

    switchRole(role) {
        this.currentRole = role;
        this.roleSelector.value = role;

        if (role === 'teacher') {
            this.teacherView.classList.remove('hidden');
            this.parentView.classList.add('hidden');
            this.renderTeacherView();
        } else {
            this.teacherView.classList.add('hidden');
            this.parentView.classList.remove('hidden');
            this.renderParentView();
        }
    }

    switchTab(tab) {
        this.currentTab = tab;

        // Update tab buttons
        this.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });

        // Update tab content
        this.eventsTab.classList.toggle('active', tab === 'events');
        this.studentsTab.classList.toggle('active', tab === 'students');
        this.uploadTab.classList.toggle('active', tab === 'upload');

        // Render appropriate content
        if (tab === 'events') {
            this.renderEventsList();
        } else if (tab === 'students') {
            this.renderStudentsList();
        } else if (tab === 'upload') {
            this.renderUploadTab();
        }
    }

    renderTeacherView() {
        this.switchTab(this.currentTab);
    }

    // ============================================
    // Events Management
    // ============================================

    renderEventsList() {
        const events = this.dataManager.getEvents();

        if (events.length === 0) {
            this.eventsList.innerHTML = '<p class="text-center" style="color: var(--text-secondary);">No events created yet. Click "Create Event" to get started.</p>';
            return;
        }

        this.eventsList.innerHTML = events.map(event => {
            const photoCount = this.dataManager.getPhotos(event.id).length;
            const eventDate = new Date(event.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            return `
                <div class="event-card">
                    <h3>${this.escapeHtml(event.name)}</h3>
                    <p class="event-date">📅 ${eventDate}</p>
                    ${event.description ? `<p class="event-description">${this.escapeHtml(event.description)}</p>` : ''}
                    <p class="event-stats">📸 ${photoCount} photo${photoCount !== 1 ? 's' : ''}</p>
                    <div class="event-actions">
                        <button class="btn btn-danger btn-small" onclick="ui.deleteEvent('${event.id}')">Delete</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    handleCreateEvent() {
        const name = document.getElementById('eventName').value;
        const date = document.getElementById('eventDate').value;
        const description = document.getElementById('eventDescription').value;

        this.dataManager.addEvent({ name, date, description });

        this.eventForm.classList.add('hidden');
        this.newEventForm.reset();
        this.renderEventsList();
        this.renderUploadEventSelect();
        this.renderParentEventSelect();
    }

    deleteEvent(id) {
        if (confirm('Are you sure you want to delete this event and all its photos?')) {
            this.dataManager.deleteEvent(id);
            this.renderEventsList();
            this.renderUploadEventSelect();
            this.renderParentEventSelect();
        }
    }

    // ============================================
    // Students Management
    // ============================================

    renderStudentsList() {
        const students = this.dataManager.getStudents();

        if (students.length === 0) {
            this.studentsList.innerHTML = '<p class="text-center" style="color: var(--text-secondary);">No students added yet.</p>';
            return;
        }

        this.studentsList.innerHTML = students.map(student => `
            <div class="student-card">
                <div class="student-info">
                    <h4>${this.escapeHtml(student.name)}</h4>
                    <p class="student-class">${this.escapeHtml(student.class)}</p>
                </div>
                <button class="btn btn-danger btn-small" onclick="ui.deleteStudent('${student.id}')">Delete</button>
            </div>
        `).join('');
    }

    handleAddStudent() {
        const name = document.getElementById('studentName').value;
        const studentClass = document.getElementById('studentClass').value;

        this.dataManager.addStudent({ name, class: studentClass });

        this.studentForm.classList.add('hidden');
        this.newStudentForm.reset();
        this.renderStudentsList();
        this.renderStudentFilter();
        this.renderClassFilter();
    }

    deleteStudent(id) {
        if (confirm('Are you sure you want to delete this student?')) {
            this.dataManager.deleteStudent(id);
            this.renderStudentsList();
            this.renderStudentFilter();
            this.renderClassFilter();
        }
    }

    // ============================================
    // Upload & Tagging
    // ============================================

    renderUploadTab() {
        this.renderUploadEventSelect();
        if (this.currentEventId) {
            this.renderUploadedPhotos();
        }
    }

    renderUploadEventSelect() {
        const events = this.dataManager.getEvents();
        const options = events.map(event =>
            `<option value="${event.id}">${this.escapeHtml(event.name)}</option>`
        ).join('');

        this.uploadEventSelect.innerHTML = '<option value="">-- Select an event --</option>' + options;
        this.uploadEventSelect.value = this.currentEventId || '';
    }

    handlePhotoUpload(files) {
        if (!this.currentEventId) {
            alert('Please select an event first');
            return;
        }

        const fileArray = Array.from(files);
        let processed = 0;

        fileArray.forEach(file => {
            if (!file.type.startsWith('image/')) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                const photo = this.dataManager.addPhoto({
                    eventId: this.currentEventId,
                    data: e.target.result,
                    tags: []
                });

                processed++;
                if (processed === fileArray.length) {
                    this.renderUploadedPhotos();
                    this.photoInput.value = '';
                }
            };
            reader.readAsDataURL(file);
        });
    }

    renderUploadedPhotos() {
        if (!this.currentEventId) {
            this.photosPreview.innerHTML = '';
            return;
        }

        const photos = this.dataManager.getPhotos(this.currentEventId);

        if (photos.length === 0) {
            this.photosPreview.innerHTML = '<p class="text-center" style="color: var(--text-secondary);">No photos uploaded yet.</p>';
            return;
        }

        this.photosPreview.innerHTML = photos.map(photo => {
            const tags = photo.tags.map(tagId => {
                const student = this.dataManager.getStudent(tagId);
                return student ? `<span class="tag">${this.escapeHtml(student.name)}</span>` : '';
            }).join('');

            return `
                <div class="photo-preview-card">
                    <img src="${photo.data}" alt="Photo" class="photo-preview-img">
                    <div class="photo-preview-info">
                        <div class="photo-tags-preview">
                            ${tags || '<span style="color: var(--text-secondary); font-size: 0.875rem;">No tags</span>'}
                        </div>
                        <div class="photo-preview-actions">
                            <button class="btn btn-primary btn-small" onclick="ui.openTagModal('${photo.id}')">Tag Students</button>
                            <button class="btn btn-danger btn-small" onclick="ui.deletePhoto('${photo.id}')">Delete</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    openTagModal(photoId) {
        this.currentPhotoId = photoId;
        const photo = this.dataManager.getPhoto(photoId);

        if (!photo) return;

        this.tagPhotoImg.src = photo.data;
        this.renderStudentCheckboxes(photo.tags);
        this.tagModal.classList.remove('hidden');
    }

    renderStudentCheckboxes(selectedTags = []) {
        const students = this.dataManager.getStudents();

        this.studentCheckboxes.innerHTML = students.map(student => `
            <label class="checkbox-label">
                <input type="checkbox" value="${student.id}" ${selectedTags.includes(student.id) ? 'checked' : ''}>
                <span>${this.escapeHtml(student.name)} (${this.escapeHtml(student.class)})</span>
            </label>
        `).join('');
    }

    handleSaveTags() {
        const checkboxes = this.studentCheckboxes.querySelectorAll('input[type="checkbox"]:checked');
        const tags = Array.from(checkboxes).map(cb => cb.value);

        this.dataManager.updatePhotoTags(this.currentPhotoId, tags);
        this.closeModal(this.tagModal);
        this.renderUploadedPhotos();
        this.renderPhotoGallery();
    }

    deletePhoto(id) {
        if (confirm('Are you sure you want to delete this photo?')) {
            this.dataManager.deletePhoto(id);
            this.renderUploadedPhotos();
            this.renderPhotoGallery();
        }
    }

    // ============================================
    // Parent View
    // ============================================

    renderParentView() {
        this.renderParentEventSelect();
        this.renderStudentFilter();
        this.renderClassFilter();
        this.renderPhotoGallery();
    }

    renderParentEventSelect() {
        const events = this.dataManager.getEvents();
        const options = events.map(event =>
            `<option value="${event.id}">${this.escapeHtml(event.name)}</option>`
        ).join('');

        this.parentEventSelect.innerHTML = '<option value="">-- All Events --</option>' + options;
    }

    renderStudentFilter() {
        const students = this.dataManager.getStudents();
        const options = students.map(student =>
            `<option value="${student.id}">${this.escapeHtml(student.name)}</option>`
        ).join('');

        this.studentFilter.innerHTML = '<option value="">-- All Students --</option>' + options;
    }

    renderClassFilter() {
        const classes = this.dataManager.getClasses();
        const options = classes.map(cls =>
            `<option value="${cls}">${this.escapeHtml(cls)}</option>`
        ).join('');

        this.classFilter.innerHTML = '<option value="">-- All Classes --</option>' + options;
    }

    renderPhotoGallery() {
        let photos = this.dataManager.getPhotos();

        // Apply filters
        const eventFilter = this.parentEventSelect.value;
        const studentFilterValue = this.studentFilter.value;
        const classFilterValue = this.classFilter.value;

        if (eventFilter) {
            photos = photos.filter(p => p.eventId === eventFilter);
        }

        if (studentFilterValue) {
            photos = photos.filter(p => p.tags.includes(studentFilterValue));
        }

        if (classFilterValue) {
            photos = photos.filter(p => {
                return p.tags.some(tagId => {
                    const student = this.dataManager.getStudent(tagId);
                    return student && student.class === classFilterValue;
                });
            });
        }

        // Update count
        this.photoCount.textContent = `Showing ${photos.length} photo${photos.length !== 1 ? 's' : ''}`;

        // Render gallery
        if (photos.length === 0) {
            this.photoGallery.innerHTML = '<p class="text-center" style="color: var(--text-secondary);">No photos match your filters.</p>';
            return;
        }

        this.photoGallery.innerHTML = photos.map(photo => {
            const event = this.dataManager.getEvent(photo.eventId);
            const tags = photo.tags.map(tagId => {
                const student = this.dataManager.getStudent(tagId);
                return student ? `<span class="tag">${this.escapeHtml(student.name)}</span>` : '';
            }).join('');

            return `
                <div class="gallery-card" onclick="ui.openViewModal('${photo.id}')">
                    <img src="${photo.data}" alt="Photo" class="gallery-img">
                    <div class="gallery-info">
                        <div class="gallery-tags">
                            ${tags || '<span style="color: var(--text-secondary); font-size: 0.875rem;">No tags</span>'}
                        </div>
                        <p class="gallery-event">${event ? this.escapeHtml(event.name) : 'Unknown Event'}</p>
                    </div>
                </div>
            `;
        }).join('');
    }

    openViewModal(photoId) {
        this.currentPhotoId = photoId;
        const photo = this.dataManager.getPhoto(photoId);

        if (!photo) return;

        this.viewPhotoImg.src = photo.data;

        const tags = photo.tags.map(tagId => {
            const student = this.dataManager.getStudent(tagId);
            return student ? `<span class="tag">${this.escapeHtml(student.name)} (${this.escapeHtml(student.class)})</span>` : '';
        }).join('');

        this.photoTags.innerHTML = tags || '<span style="color: var(--text-secondary);">No students tagged</span>';

        this.viewModal.classList.remove('hidden');
    }

    handleDownloadPhoto() {
        const photo = this.dataManager.getPhoto(this.currentPhotoId);
        if (!photo) return;

        const link = document.createElement('a');
        link.href = photo.data;
        link.download = `photo-${this.currentPhotoId}.jpg`;
        link.click();
    }

    // ============================================
    // Utilities
    // ============================================

    closeModal(modal) {
        modal.classList.add('hidden');
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ============================================
// Initialize Application
// ============================================

let dataManager;
let ui;

document.addEventListener('DOMContentLoaded', () => {
    dataManager = new DataManager();
    ui = new UIController(dataManager);
});
