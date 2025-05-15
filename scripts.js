
// DOM Elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('Document loaded!');
    initializeApp();
});

// ============================
// App Initialization
// ============================
function initializeApp() {
    // Initialize navigation
    initNavigation();
    
    // Initialize auth functionality
    initAuth();
    
    // Initialize course data
    loadCourses();
    
    // Set up event listeners
    setupEventListeners();
    
    // Check if user is logged in
    checkLoginStatus();
}

// ============================
// Navigation & UI
// ============================
function initNavigation() {
    // Page navigation
    const navLinks = {
        'home-link': 'home-section',
        'courses-link': 'courses-section',
        'dashboard-link': 'dashboard-section',
        'about-link': 'about-section',
        'footer-home-link': 'home-section',
        'footer-courses-link': 'courses-section',
        'footer-dashboard-link': 'dashboard-section',
        'footer-about-link': 'about-section'
    };
    
    // Set up click handlers for navigation
    Object.keys(navLinks).forEach(linkId => {
        const link = document.getElementById(linkId);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                navigateTo(navLinks[linkId]);
            });
        }
    });
    
    // Mobile menu toggle
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
}

function navigateTo(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => section.classList.remove('active'));
    
    // Show selected section
    const activeSection = document.getElementById(sectionId);
    if (activeSection) {
        activeSection.classList.add('active');
        
        // Update active nav link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Find and activate the correct nav link
        const linkId = Object.keys(navLinksMap).find(key => navLinksMap[key] === sectionId);
        if (linkId) {
            const activeLink = document.getElementById(linkId);
            if (activeLink) activeLink.classList.add('active');
        }
        
        // Close mobile menu if open
        closeMobileMenu();
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Map of nav link IDs to their target sections
const navLinksMap = {
    'home-link': 'home-section',
    'courses-link': 'courses-section',
    'dashboard-link': 'dashboard-section',
    'about-link': 'about-section'
};

function toggleMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.classList.toggle('active');
    }
}

function closeMobileMenu() {
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu && mobileMenu.classList.contains('active')) {
        mobileMenu.classList.remove('active');
    }
}

// ============================
// Toast Notifications
// ============================
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    
    // Set message
    toastMessage.textContent = message;
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle';
    }
    
    // Show toast
    toast.classList.add('active');
    
    // Hide toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('active');
    }, 3000);
    
    // Close on click
    const closeToast = document.querySelector('.close-toast');
    if (closeToast) {
        closeToast.addEventListener('click', () => {
            toast.classList.remove('active');
        });
    }
}

// ============================
// Authentication
// ============================
function initAuth() {
    // Auth modal elements
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const closeModalButton = document.querySelector('.close-modal');
    const getStartedButton = document.getElementById('get-started-button');
    
    // Login button click
    if (loginButton) {
        loginButton.addEventListener('click', () => {
            showAuthModal('login');
        });
    }
    
    // Register button click
    if (registerButton) {
        registerButton.addEventListener('click', () => {
            showAuthModal('register');
        });
    }
    
    // Get started button click
    if (getStartedButton) {
        getStartedButton.addEventListener('click', () => {
            if (isLoggedIn()) {
                navigateTo('courses-section');
            } else {
                showAuthModal('register');
            }
        });
    }
    
    // Switch between login and register forms
    if (switchToRegister) {
        switchToRegister.addEventListener('click', (e) => {
            e.preventDefault();
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
        });
    }
    
    if (switchToLogin) {
        switchToLogin.addEventListener('click', (e) => {
            e.preventDefault();
            registerForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }
    
    // Close modal
    if (closeModalButton) {
        closeModalButton.addEventListener('click', () => {
            closeAuthModal();
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeAuthModal();
        }
    });
    
    // Form submissions
    const loginFormElement = document.getElementById('login-form-element');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', handleLogin);
    }
    
    const registerFormElement = document.getElementById('register-form-element');
    if (registerFormElement) {
        registerFormElement.addEventListener('submit', handleRegister);
    }
    
    // Logout button
    const logoutButton = document.getElementById('logout-button');
    if (logoutButton) {
        logoutButton.addEventListener('click', handleLogout);
    }
}

function showAuthModal(formType) {
    const modal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    // Show modal
    modal.classList.add('active');
    
    // Show correct form
    if (formType === 'login') {
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    } else {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.classList.remove('active');
    }
    
    // Reset forms
    const loginForm = document.getElementById('login-form-element');
    const registerForm = document.getElementById('register-form-element');
    
    if (loginForm) loginForm.reset();
    if (registerForm) registerForm.reset();
    
    // Clear error messages
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
        error.classList.remove('active');
    });
    
    // Clear input errors
    const inputs = document.querySelectorAll('.input-error');
    inputs.forEach(input => input.classList.remove('input-error'));
}

function handleLogin(e) {
    e.preventDefault();
    
    // Get form values
    const emailInput = document.getElementById('login-email');
    const passwordInput = document.getElementById('login-password');
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    
    // Reset errors
    resetFormErrors('login');
    
    // Validate form
    let isValid = true;
    
    if (!email) {
        showInputError('login-email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showInputError('login-email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!password) {
        showInputError('login-password', 'Password is required');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate API call
        setTimeout(() => {
            // Check if user exists in localStorage
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            const user = users[email];
            
            if (user && user.password === password) {
                // Set current user
                localStorage.setItem('currentUser', JSON.stringify({
                    name: user.name,
                    email: user.email,
                    progress: user.progress || { lessonsCompleted: 0, quizzesPassed: 0 },
                    vocabulary: user.vocabulary || []
                }));
                
                // Close modal
                closeAuthModal();
                
                // Update UI
                updateUIForLoggedInUser();
                
                // Show success toast
                showToast('Logged in successfully!');
                
                // Navigate to dashboard
                navigateTo('dashboard-section');
            } else {
                showInputError('login-email', 'Invalid email or password', true);
                showInputError('login-password', '', true);
            }
        }, 500);
    }
}

function handleRegister(e) {
    e.preventDefault();
    
    // Get form values
    const nameInput = document.getElementById('register-name');
    const emailInput = document.getElementById('register-email');
    const passwordInput = document.getElementById('register-password');
    const confirmPasswordInput = document.getElementById('register-confirm-password');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    // Reset errors
    resetFormErrors('register');
    
    // Validate form
    let isValid = true;
    
    if (!name) {
        showInputError('register-name', 'Name is required');
        isValid = false;
    }
    
    if (!email) {
        showInputError('register-email', 'Email is required');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showInputError('register-email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!password) {
        showInputError('register-password', 'Password is required');
        isValid = false;
    } else if (password.length < 6) {
        showInputError('register-password', 'Password must be at least 6 characters');
        isValid = false;
    }
    
    if (!confirmPassword) {
        showInputError('register-confirm-password', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showInputError('register-confirm-password', 'Passwords do not match');
        isValid = false;
    }
    
    if (isValid) {
        // Simulate API call
        setTimeout(() => {
            // Get existing users from localStorage
            const users = JSON.parse(localStorage.getItem('users') || '{}');
            
            // Check if email already exists
            if (users[email]) {
                showInputError('register-email', 'Email already registered');
                return;
            }
            
            // Add new user
            users[email] = {
                name,
                email,
                password,
                progress: {
                    lessonsCompleted: 0,
                    quizzesPassed: 0
                },
                vocabulary: []
            };
            
            // Save to localStorage
            localStorage.setItem('users', JSON.stringify(users));
            
            // Set as current user
            localStorage.setItem('currentUser', JSON.stringify({
                name,
                email,
                progress: {
                    lessonsCompleted: 0,
                    quizzesPassed: 0
                },
                vocabulary: []
            }));
            
            // Close modal
            closeAuthModal();
            
            // Update UI
            updateUIForLoggedInUser();
            
            // Show success toast
            showToast('Account created successfully!');
            
            // Navigate to dashboard
            navigateTo('dashboard-section');
        }, 500);
    }
}

function handleLogout() {
    // Remove current user from localStorage
    localStorage.removeItem('currentUser');
    
    // Update UI
    updateUIForLoggedOutUser();
    
    // Show toast
    showToast('Logged out successfully!');
    
    // Navigate to home
    navigateTo('home-section');
}

function checkLoginStatus() {
    const currentUser = getCurrentUser();
    
    if (currentUser) {
        updateUIForLoggedInUser();
    } else {
        updateUIForLoggedOutUser();
    }
}

function updateUIForLoggedInUser() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Update navigation
    const authButtons = document.querySelector('.auth-buttons');
    const userProfile = document.getElementById('user-profile');
    const userName = document.getElementById('user-name');
    
    if (authButtons && userProfile && userName) {
        // Hide auth buttons, show user profile
        const loginButton = document.getElementById('login-button');
        const registerButton = document.getElementById('register-button');
        
        if (loginButton) loginButton.classList.add('hidden');
        if (registerButton) registerButton.classList.add('hidden');
        
        userProfile.classList.remove('hidden');
        userName.textContent = currentUser.name;
    }
    
    // Update dashboard
    updateDashboard();
}

function updateUIForLoggedOutUser() {
    // Update navigation
    const authButtons = document.querySelector('.auth-buttons');
    const userProfile = document.getElementById('user-profile');
    
    if (authButtons && userProfile) {
        // Show auth buttons, hide user profile
        const loginButton = document.getElementById('login-button');
        const registerButton = document.getElementById('register-button');
        
        if (loginButton) loginButton.classList.remove('hidden');
        if (registerButton) registerButton.classList.remove('hidden');
        
        userProfile.classList.add('hidden');
    }
    
    // Clear dashboard data
    const dashboardName = document.getElementById('dashboard-name');
    const dashboardEmail = document.getElementById('dashboard-email');
    const lessonsCompleted = document.getElementById('lessons-completed');
    const quizzesPassed = document.getElementById('quizzes-passed');
    const vocabularyList = document.getElementById('vocabulary-list');
    
    if (dashboardName) dashboardName.textContent = 'User Name';
    if (dashboardEmail) dashboardEmail.textContent = 'user@example.com';
    if (lessonsCompleted) lessonsCompleted.textContent = '0';
    if (quizzesPassed) quizzesPassed.textContent = '0';
    
    if (vocabularyList) {
        vocabularyList.innerHTML = `
            <p id="empty-vocabulary-message">Your vocabulary list is empty. Add words to start learning!</p>
        `;
    }
}

function updateDashboard() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Update profile info
    const dashboardName = document.getElementById('dashboard-name');
    const dashboardEmail = document.getElementById('dashboard-email');
    
    if (dashboardName) dashboardName.textContent = currentUser.name;
    if (dashboardEmail) dashboardEmail.textContent = currentUser.email;
    
    // Update progress stats
    const lessonsCompleted = document.getElementById('lessons-completed');
    const quizzesPassed = document.getElementById('quizzes-passed');
    
    if (lessonsCompleted && currentUser.progress) {
        lessonsCompleted.textContent = currentUser.progress.lessonsCompleted;
    }
    
    if (quizzesPassed && currentUser.progress) {
        quizzesPassed.textContent = currentUser.progress.quizzesPassed;
    }
    
    // Update vocabulary list
    updateVocabularyList();
}

// ============================
// Vocabulary Functions
// ============================
function setupVocabularyListeners() {
    const addWordButton = document.getElementById('add-word-button');
    const cancelAddWordButton = document.getElementById('cancel-add-word');
    const saveNewWordButton = document.getElementById('save-new-word');
    const lookupWordButton = document.getElementById('lookup-word');
    
    if (addWordButton) {
        addWordButton.addEventListener('click', () => {
            const addWordForm = document.getElementById('add-word-form');
            if (addWordForm) {
                addWordForm.classList.remove('hidden');
            }
        });
    }
    
    if (cancelAddWordButton) {
        cancelAddWordButton.addEventListener('click', () => {
            const addWordForm = document.getElementById('add-word-form');
            if (addWordForm) {
                addWordForm.classList.add('hidden');
                
                // Reset form
                document.getElementById('new-word').value = '';
                document.getElementById('new-translation').value = '';
                document.getElementById('new-notes').value = '';
            }
        });
    }
    
    if (saveNewWordButton) {
        saveNewWordButton.addEventListener('click', addVocabularyWord);
    }
    
    if (lookupWordButton) {
        lookupWordButton.addEventListener('click', lookupWordDefinition);
    }
}

function updateVocabularyList() {
    const currentUser = getCurrentUser();
    const vocabularyList = document.getElementById('vocabulary-list');
    const emptyVocabMessage = document.getElementById('empty-vocabulary-message');
    
    if (!vocabularyList || !currentUser) return;
    
    // Check if user has vocabulary
    if (currentUser.vocabulary && currentUser.vocabulary.length > 0) {
        // Hide empty message if it exists
        if (emptyVocabMessage) {
            emptyVocabMessage.classList.add('hidden');
        }
        
        // Clear existing items
        vocabularyList.innerHTML = '';
        
        // Add vocabulary items
        currentUser.vocabulary.forEach(item => {
            const vocabItem = createVocabularyItemElement(item);
            vocabularyList.appendChild(vocabItem);
        });
    } else {
        // Show empty message
        vocabularyList.innerHTML = `
            <p id="empty-vocabulary-message">Your vocabulary list is empty. Add words to start learning!</p>
        `;
    }
}

function createVocabularyItemElement(item) {
    const vocabItem = document.createElement('div');
    vocabItem.classList.add('vocabulary-item');
    vocabItem.dataset.id = item.id;
    
    // Item content
    vocabItem.innerHTML = `
        <div class="vocabulary-details">
            <h4>${item.word}</h4>
            <p>${item.translation}</p>
            ${item.notes ? `<p class="notes">${item.notes}</p>` : ''}
        </div>
        <div class="vocabulary-actions">
            <button class="pronunciation-btn" title="Pronounce">
                <i class="fas fa-volume-up"></i>
            </button>
            <button class="edit-btn" title="Edit">
                <i class="fas fa-pencil-alt"></i>
            </button>
            <button class="delete-btn" title="Delete">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `;
    
    // Add event listeners
    const pronounceBtn = vocabItem.querySelector('.pronunciation-btn');
    const editBtn = vocabItem.querySelector('.edit-btn');
    const deleteBtn = vocabItem.querySelector('.delete-btn');
    
    if (pronounceBtn) {
        pronounceBtn.addEventListener('click', () => {
            pronounceWord(item.word);
        });
    }
    
    if (editBtn) {
        editBtn.addEventListener('click', () => {
            showEditVocabularyForm(item.id);
        });
    }
    
    if (deleteBtn) {
        deleteBtn.addEventListener('click', () => {
            deleteVocabularyWord(item.id);
        });
    }
    
    return vocabItem;
}

function addVocabularyWord() {
    const wordInput = document.getElementById('new-word');
    const translationInput = document.getElementById('new-translation');
    const notesInput = document.getElementById('new-notes');
    
    if (!wordInput || !translationInput) return;
    
    const word = wordInput.value.trim();
    const translation = translationInput.value.trim();
    const notes = notesInput.value.trim();
    
    // Validate inputs
    if (!word) {
        showToast('Please enter a word', 'error');
        return;
    }
    
    if (!translation) {
        showToast('Please enter a translation or definition', 'error');
        return;
    }
    
    // Get current user
    const currentUser = getCurrentUser();
    if (!currentUser) {
        showToast('Please log in to add vocabulary', 'error');
        return;
    }
    
    // Create new vocabulary item
    const newItem = {
        id: Date.now().toString(),
        word,
        translation,
        notes: notes || ''
    };
    
    // Add to user's vocabulary
    if (!currentUser.vocabulary) {
        currentUser.vocabulary = [];
    }
    
    currentUser.vocabulary.unshift(newItem);
    
    // Save updated user data
    saveCurrentUser(currentUser);
    
    // Update vocabulary list
    updateVocabularyList();
    
    // Reset and hide form
    wordInput.value = '';
    translationInput.value = '';
    notesInput.value = '';
    
    const addWordForm = document.getElementById('add-word-form');
    if (addWordForm) {
        addWordForm.classList.add('hidden');
    }
    
    // Show success message
    showToast(`"${word}" added to your vocabulary`);
}

function showEditVocabularyForm(itemId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.vocabulary) return;
    
    // Find the vocabulary item
    const item = currentUser.vocabulary.find(item => item.id === itemId);
    if (!item) return;
    
    // Find the vocabulary item element
    const itemElement = document.querySelector(`.vocabulary-item[data-id="${itemId}"]`);
    if (!itemElement) return;
    
    // Create edit form
    const editForm = document.createElement('div');
    editForm.classList.add('vocabulary-edit-form');
    editForm.innerHTML = `
        <div class="form-group">
            <label for="edit-word-${itemId}">Word</label>
            <input type="text" id="edit-word-${itemId}" value="${item.word}">
        </div>
        <div class="form-group">
            <label for="edit-translation-${itemId}">Translation</label>
            <input type="text" id="edit-translation-${itemId}" value="${item.translation}">
        </div>
        <div class="form-group">
            <label for="edit-notes-${itemId}">Notes (optional)</label>
            <textarea id="edit-notes-${itemId}">${item.notes || ''}</textarea>
        </div>
        <div class="form-buttons">
            <button id="cancel-edit-${itemId}" class="btn btn-outline">Cancel</button>
            <button id="save-edit-${itemId}" class="btn btn-primary">Save</button>
        </div>
    `;
    
    // Hide the original content and show edit form
    itemElement.style.display = 'none';
    itemElement.parentNode.insertBefore(editForm, itemElement.nextSibling);
    
    // Add event listeners
    const cancelButton = document.getElementById(`cancel-edit-${itemId}`);
    const saveButton = document.getElementById(`save-edit-${itemId}`);
    
    if (cancelButton) {
        cancelButton.addEventListener('click', () => {
            editForm.remove();
            itemElement.style.display = 'flex';
        });
    }
    
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            updateVocabularyWord(itemId);
        });
    }
}

function updateVocabularyWord(itemId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.vocabulary) return;
    
    // Get form values
    const wordInput = document.getElementById(`edit-word-${itemId}`);
    const translationInput = document.getElementById(`edit-translation-${itemId}`);
    const notesInput = document.getElementById(`edit-notes-${itemId}`);
    
    if (!wordInput || !translationInput) return;
    
    const word = wordInput.value.trim();
    const translation = translationInput.value.trim();
    const notes = notesInput ? notesInput.value.trim() : '';
    
    // Validate inputs
    if (!word || !translation) {
        showToast('Word and translation are required', 'error');
        return;
    }
    
    // Find the vocabulary item
    const itemIndex = currentUser.vocabulary.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    // Update the item
    currentUser.vocabulary[itemIndex] = {
        ...currentUser.vocabulary[itemIndex],
        word,
        translation,
        notes
    };
    
    // Save updated user data
    saveCurrentUser(currentUser);
    
    // Update vocabulary list
    updateVocabularyList();
    
    // Show success message
    showToast(`"${word}" updated`);
}

function deleteVocabularyWord(itemId) {
    const currentUser = getCurrentUser();
    if (!currentUser || !currentUser.vocabulary) return;
    
    // Find the vocabulary item
    const itemIndex = currentUser.vocabulary.findIndex(item => item.id === itemId);
    if (itemIndex === -1) return;
    
    // Store word for message
    const word = currentUser.vocabulary[itemIndex].word;
    
    // Remove from vocabulary
    currentUser.vocabulary.splice(itemIndex, 1);
    
    // Save updated user data
    saveCurrentUser(currentUser);
    
    // Update vocabulary list
    updateVocabularyList();
    
    // Show success message
    showToast(`"${word}" removed from your vocabulary`);
}

async function lookupWordDefinition() {
    const wordInput = document.getElementById('new-word');
    const translationInput = document.getElementById('new-translation');
    
    if (!wordInput || !translationInput) return;
    
    const word = wordInput.value.trim();
    
    if (!word) {
        showToast('Please enter a word to look up', 'error');
        return;
    }
    
    // Show loading state
    lookupWordButton.disabled = true;
    lookupWordButton.textContent = 'Looking up...';
    
    try {
        // Use Free Dictionary API
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        
        if (!response.ok) {
            throw new Error('Word not found');
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0].meanings && data[0].meanings[0]) {
            // Get definition from API response
            const definition = data[0].meanings[0].definitions[0].definition;
            
            // Set definition as translation
            translationInput.value = definition;
            
            // Show success message
            showToast(`Definition found for "${word}"`);
        } else {
            throw new Error('No definition found');
        }
    } catch (error) {
        console.error('Error looking up word:', error);
        showToast(`Could not find definition for "${word}"`, 'error');
    } finally {
        // Reset button state
        lookupWordButton.disabled = false;
        lookupWordButton.textContent = 'Look up';
    }
}

function pronounceWord(word) {
    // Check if speech synthesis is supported
    if ('speechSynthesis' in window) {
        // Create utterance
        const utterance = new SpeechSynthesisUtterance(word);
        
        // Optional: Set language
        // utterance.lang = 'en-US';
        
        // Speak
        window.speechSynthesis.speak(utterance);
    } else {
        // Fallback for browsers that don't support speech synthesis
        lookupWordPronunciation(word);
    }
}

async function lookupWordPronunciation(word) {
    try {
        // Use Dictionary API to get pronunciation audio
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
        
        if (!response.ok) {
            throw new Error('Word not found');
        }
        
        const data = await response.json();
        
        if (data && data[0] && data[0].phonetics) {
            // Try to find a phonetic with audio
            const phonetic = data[0].phonetics.find(p => p.audio);
            
            if (phonetic && phonetic.audio) {
                // Create and play audio element
                const audio = new Audio(phonetic.audio);
                audio.play();
            } else {
                throw new Error('No audio available');
            }
        } else {
            throw new Error('No pronunciation available');
        }
    } catch (error) {
        console.error('Error getting pronunciation:', error);
        showToast(`Could not play pronunciation for "${word}"`, 'error');
    }
}

// ============================
// Course Functions
// ============================
function loadCourses() {
    fetchCourses()
        .then(courses => {
            // Populate home page popular courses
            populatePopularCourses(courses);
            
            // Populate courses page
            populateCoursesPage(courses);
            
            // Set up course detail links
            setupCourseDetailLinks();
        })
        .catch(error => {
            console.error('Error loading courses:', error);
            showToast('Failed to load courses', 'error');
        });
}

function fetchCourses() {
    // In a real application, this would be an API call
    // For this example, we'll return mock data
    return Promise.resolve(coursesData);
}

function populatePopularCourses(courses) {
    const popularCoursesContainer = document.querySelector('.popular-courses .courses-grid');
    if (!popularCoursesContainer) return;
    
    // Clear existing content
    popularCoursesContainer.innerHTML = '';
    
    // Take up to 3 random courses
    const popularCourses = [...courses]
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);
    
    // Add course cards
    popularCourses.forEach(course => {
        const courseCard = createCourseCardElement(course);
        popularCoursesContainer.appendChild(courseCard);
    });
}

function populateCoursesPage(courses) {
    const coursesContainer = document.querySelector('.all-courses');
    if (!coursesContainer) return;
    
    // Clear existing content
    coursesContainer.innerHTML = '';
    
    // Add course cards
    courses.forEach(course => {
        const courseCard = createCourseCardElement(course);
        coursesContainer.appendChild(courseCard);
    });
    
    // Set up filter buttons
    setupCourseFilters(courses);
}

function createCourseCardElement(course) {
    const courseCard = document.createElement('div');
    courseCard.classList.add('course-card');
    courseCard.dataset.courseId = course.id;
    courseCard.dataset.language = course.language.toLowerCase();
    courseCard.dataset.level = course.level;
    
    // Card content
    courseCard.innerHTML = `
        <img src="${course.image}" alt="${course.title}" class="course-card-image">
        <div class="course-card-content">
            <div class="course-card-badges">
                <span class="badge badge-outline">${course.language}</span>
                <span class="badge badge-filled">${capitalizeFirstLetter(course.level)}</span>
            </div>
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <button class="btn btn-primary view-course-btn" data-course-id="${course.id}">View Course</button>
        </div>
    `;
    
    // Add click event
    courseCard.querySelector('.view-course-btn').addEventListener('click', (e) => {
        e.preventDefault();
        viewCourseDetails(course.id);
    });
    
    return courseCard;
}

function setupCourseFilters(courses) {
    // Language filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter courses
            const filter = button.dataset.filter;
            filterCoursesByLanguage(filter);
        });
    });
    
    // Level tabs
    const levelTabs = document.querySelectorAll('.tab-btn');
    levelTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active tab
            levelTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Filter courses
            const level = tab.dataset.level;
            filterCoursesByLevel(level);
        });
    });
    
    // Search input
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
        searchInput.addEventListener('input', () => {
            searchCourses(searchInput.value);
        });
    }
}

function filterCoursesByLanguage(language) {
    const courseCards = document.querySelectorAll('.all-courses .course-card');
    
    courseCards.forEach(card => {
        if (language === 'all' || card.dataset.language === language) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function filterCoursesByLevel(level) {
    const courseCards = document.querySelectorAll('.all-courses .course-card');
    
    courseCards.forEach(card => {
        if (level === 'all' || card.dataset.level === level) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function searchCourses(query) {
    const courseCards = document.querySelectorAll('.all-courses .course-card');
    const normalizedQuery = query.toLowerCase();
    
    courseCards.forEach(card => {
        const title = card.querySelector('h3').textContent.toLowerCase();
        const description = card.querySelector('p').textContent.toLowerCase();
        
        if (title.includes(normalizedQuery) || description.includes(normalizedQuery)) {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

function setupCourseDetailLinks() {
    const viewCourseButtons = document.querySelectorAll('.view-course-btn');
    
    viewCourseButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const courseId = button.dataset.courseId;
            viewCourseDetails(courseId);
        });
    });
    
    // Back to courses button
    const backToCoursesBtn = document.getElementById('back-to-courses');
    if (backToCoursesBtn) {
        backToCoursesBtn.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo('courses-section');
        });
    }
}

function viewCourseDetails(courseId) {
    // Find the course
    const course = coursesData.find(c => c.id === courseId);
    if (!course) {
        showToast('Course not found', 'error');
        return;
    }
    
    // Update course header
    const courseHeader = document.getElementById('course-header');
    if (courseHeader) {
        courseHeader.innerHTML = `
            <div class="course-header-content">
                <div class="course-title-section">
                    <div class="course-badges">
                        <span class="badge badge-outline">${course.language}</span>
                        <span class="badge badge-filled">${capitalizeFirstLetter(course.level)}</span>
                    </div>
                    <h1>${course.title}</h1>
                    <p class="course-description">${course.description}</p>
                </div>
                <div>
                    <button id="start-course-btn" class="btn btn-large btn-primary" data-course-id="${course.id}">Start Learning</button>
                </div>
            </div>
        `;
    }
    
    // Update course image
    const courseImage = document.getElementById('course-image');
    if (courseImage) {
        courseImage.innerHTML = `
            <img src="${course.image}" alt="${course.title}">
        `;
    }
    
    // Update course stats
    const totalLessons = document.getElementById('total-lessons');
    const courseLevel = document.getElementById('course-level');
    
    if (totalLessons) totalLessons.textContent = `${course.lessons.length} lessons`;
    if (courseLevel) courseLevel.textContent = capitalizeFirstLetter(course.level);
    
    // Update lessons list
    const lessonsContainer = document.getElementById('lessons-container');
    if (lessonsContainer) {
        lessonsContainer.innerHTML = '';
        
        if (course.lessons.length > 0) {
            course.lessons.forEach((lesson, index) => {
                const lessonCard = document.createElement('div');
                lessonCard.classList.add('lesson-card');
                lessonCard.dataset.courseId = course.id;
                lessonCard.dataset.lessonId = lesson.id;
                
                lessonCard.innerHTML = `
                    <div class="lesson-card-content">
                        <div class="lesson-number">${index + 1}</div>
                        <div class="lesson-details">
                            <h3>${lesson.title}</h3>
                            <p>${lesson.description}</p>
                        </div>
                    </div>
                `;
                
                // Add click event
                lessonCard.addEventListener('click', () => {
                    viewLesson(course.id, lesson.id, index);
                });
                
                lessonsContainer.appendChild(lessonCard);
            });
        } else {
            lessonsContainer.innerHTML = `
                <div class="empty-lessons">
                    <p>No lessons available for this course yet.</p>
                </div>
            `;
        }
    }
    
    // Set up start course button
    const startCourseBtn = document.getElementById('start-course-btn');
    if (startCourseBtn && course.lessons.length > 0) {
        startCourseBtn.addEventListener('click', () => {
            // Start first lesson
            viewLesson(course.id, course.lessons[0].id, 0);
        });
    }
    
    // Show course detail section
    navigateTo('course-detail-section');
}

function viewLesson(courseId, lessonId, lessonIndex) {
    // Find the course and lesson
    const course = coursesData.find(c => c.id === courseId);
    if (!course) {
        showToast('Course not found', 'error');
        return;
    }
    
    const lesson = course.lessons.find(l => l.id === lessonId);
    if (!lesson) {
        showToast('Lesson not found', 'error');
        return;
    }
    
    // Update lesson header
    const lessonTitle = document.getElementById('current-lesson-title');
    const lessonNumber = document.getElementById('current-lesson-number');
    const totalLessons = document.getElementById('total-course-lessons');
    const backCourseTitle = document.getElementById('back-course-title');
    const lessonProgress = document.getElementById('lesson-progress');
    
    if (lessonTitle) lessonTitle.textContent = lesson.title;
    if (lessonNumber) lessonNumber.textContent = lessonIndex + 1;
    if (totalLessons) totalLessons.textContent = course.lessons.length;
    if (backCourseTitle) backCourseTitle.textContent = `Back to ${course.title}`;
    if (lessonProgress) lessonProgress.style.width = '0%';
    
    // Update lesson content
    const lessonContent = document.getElementById('lesson-content');
    if (lessonContent) {
        // Sanitize HTML content (in a real application, use a proper sanitizer library)
        lessonContent.innerHTML = lesson.content;
        
        // Add vocabulary section if lesson has vocabulary
        if (lesson.vocabulary && lesson.vocabulary.length > 0) {
            const vocabularySection = document.createElement('div');
            vocabularySection.classList.add('vocabulary-section');
            vocabularySection.innerHTML = `
                <h3>Key Vocabulary</h3>
                <div class="vocabulary-grid">
                    ${lesson.vocabulary.map(item => `
                        <div class="vocabulary-card">
                            <h4>${item.word}</h4>
                            <p>${item.translation}</p>
                            <button class="pronunciation-btn" data-word="${item.word}">
                                <i class="fas fa-volume-up"></i> Pronounce
                            </button>
                        </div>
                    `).join('')}
                </div>
            `;
            
            lessonContent.appendChild(vocabularySection);
            
            // Add pronunciation listeners
            const pronounceBtns = vocabularySection.querySelectorAll('.pronunciation-btn');
            pronounceBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const word = btn.dataset.word;
                    if (word) pronounceWord(word);
                });
            });
        }
    }
    
    // Set up exercises and quiz
    setupLessonExercises(lesson);
    
    // Update back button
    const backToCourseBtnHandle = document.getElementById('back-to-course');
    if (backToCourseBtnHandle) {
        backToCourseBtnHandle.setAttribute('data-course-id', courseId);
        backToCourseBtnHandle.addEventListener('click', (e) => {
            e.preventDefault();
            viewCourseDetails(courseId);
        });
    }
    
    // Update next button
    const nextLessonBtn = document.getElementById('next-lesson-button');
    if (nextLessonBtn) {
        // Hide by default
        nextLessonBtn.style.display = 'none';
        
        // Show if not last lesson
        if (lessonIndex < course.lessons.length - 1) {
            nextLessonBtn.style.display = 'block';
            nextLessonBtn.addEventListener('click', () => {
                const nextLesson = course.lessons[lessonIndex + 1];
                viewLesson(courseId, nextLesson.id, lessonIndex + 1);
            });
        }
    }
    
    // Show exercises after delay
    setTimeout(() => {
        const lessonExercises = document.getElementById('lesson-exercises');
        if (lessonExercises) {
            lessonExercises.classList.remove('hidden');
        }
        
        // Update progress
        if (lessonProgress) lessonProgress.style.width = '50%';
    }, 1000);
    
    // Show lesson section
    navigateTo('lesson-section');
    
    // Update user progress
    updateUserLessonProgress();
}

function setupLessonExercises(lesson) {
    const exercisesContainer = document.getElementById('exercises-container');
    if (!exercisesContainer) return;
    
    // Clear existing content
    exercisesContainer.innerHTML = '';
    
    // Add exercises
    if (lesson.exercises && lesson.exercises.length > 0) {
        lesson.exercises.forEach((exercise, index) => {
            const exerciseElement = document.createElement('div');
            exerciseElement.classList.add('exercise');
            exerciseElement.dataset.exerciseId = exercise.id;
            
            // Exercise content based on type
            let exerciseContent = `
                <div class="question">${index + 1}. ${exercise.question}</div>
            `;
            
            if (exercise.type === 'multiple-choice') {
                exerciseContent += `
                    <div class="options">
                        ${exercise.options.map(option => `
                            <label class="option">
                                <input type="radio" name="exercise-${exercise.id}" value="${option}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                `;
            } else if (exercise.type === 'fill-in-blank') {
                // Split the question into parts before and after the blank
                const parts = exercise.question.split('____');
                
                exerciseContent = `
                    <div class="question">${index + 1}. Fill in the blank:</div>
                    <div class="fill-blank">
                        ${parts[0]}
                        <input type="text" class="fill-blank-input" data-exercise-id="${exercise.id}">
                        ${parts[1] || ''}
                    </div>
                `;
                
                if (exercise.hint) {
                    exerciseContent += `
                        <div class="hint">
                            <em>Hint: ${exercise.hint}</em>
                        </div>
                    `;
                }
            } else if (exercise.type === 'translation') {
                exerciseContent += `
                    <div class="translation-exercise">
                        <input type="text" class="translation-input" data-exercise-id="${exercise.id}" placeholder="Your translation">
                    </div>
                `;
            }
            
            exerciseElement.innerHTML = exerciseContent;
            exercisesContainer.appendChild(exerciseElement);
        });
        
        // Set up check answers button
        const checkAnswersBtn = document.getElementById('check-answers-button');
        if (checkAnswersBtn) {
            checkAnswersBtn.addEventListener('click', () => {
                checkExerciseAnswers(lesson.exercises);
            });
        }
    } else {
        exercisesContainer.innerHTML = `
            <div class="no-exercises">
                <p>No exercises available for this lesson.</p>
            </div>
        `;
        
        // Hide check answers button
        const checkAnswersBtn = document.getElementById('check-answers-button');
        if (checkAnswersBtn) {
            checkAnswersBtn.style.display = 'none';
        }
    }
    
    // Set up quiz
    setupLessonQuiz(lesson);
}

function checkExerciseAnswers(exercises) {
    let correctAnswers = 0;
    
    exercises.forEach(exercise => {
        let userAnswer;
        
        if (exercise.type === 'multiple-choice') {
            const selectedOption = document.querySelector(`input[name="exercise-${exercise.id}"]:checked`);
            userAnswer = selectedOption ? selectedOption.value : null;
        } else if (exercise.type === 'fill-in-blank') {
            const input = document.querySelector(`.fill-blank-input[data-exercise-id="${exercise.id}"]`);
            userAnswer = input ? input.value.trim() : null;
        } else if (exercise.type === 'translation') {
            const input = document.querySelector(`.translation-input[data-exercise-id="${exercise.id}"]`);
            userAnswer = input ? input.value.trim() : null;
        }
        
        // Check if answer is correct
        if (userAnswer) {
            const isCorrect = userAnswer.toLowerCase() === exercise.correctAnswer.toLowerCase();
            
            if (isCorrect) {
                correctAnswers++;
                
                // Mark correct
                const exerciseElement = document.querySelector(`.exercise[data-exercise-id="${exercise.id}"]`);
                if (exerciseElement) {
                    exerciseElement.classList.add('correct');
                }
            }
        }
    });
    
    // Show feedback
    const exerciseFeedback = document.getElementById('exercise-feedback');
    if (exerciseFeedback) {
        exerciseFeedback.innerHTML = `
            <p>You got ${correctAnswers} out of ${exercises.length} correct!</p>
        `;
        
        if (correctAnswers === exercises.length) {
            exerciseFeedback.classList.add('feedback-success');
            exerciseFeedback.classList.remove('feedback-error');
            exerciseFeedback.innerHTML += `<p>Great job! You can now proceed to the quiz.</p>`;
            
            // Show quiz
            const lessonQuiz = document.getElementById('lesson-quiz');
            if (lessonQuiz) {
                lessonQuiz.classList.remove('hidden');
            }
            
            // Update progress
            const lessonProgress = document.getElementById('lesson-progress');
            if (lessonProgress) lessonProgress.style.width = '75%';
        } else {
            exerciseFeedback.classList.add('feedback-error');
            exerciseFeedback.classList.remove('feedback-success');
            exerciseFeedback.innerHTML += `<p>Try again! Review your answers and correct any mistakes.</p>`;
        }
        
        exerciseFeedback.classList.remove('hidden');
    }
}

function setupLessonQuiz(lesson) {
    const quizContainer = document.getElementById('quiz-container');
    if (!quizContainer) return;
    
    // Clear existing content
    quizContainer.innerHTML = '';
    
    // Create quiz questions from lesson exercises (simplified for this example)
    if (lesson.exercises && lesson.exercises.length > 0) {
        // Use the first 3 exercises or all if fewer
        const quizQuestions = lesson.exercises.slice(0, 3);
        
        quizQuestions.forEach((question, index) => {
            const questionElement = document.createElement('div');
            questionElement.classList.add('quiz-question');
            questionElement.dataset.questionId = question.id;
            
            // Question content based on type
            let questionContent = `
                <div class="question">${index + 1}. ${question.question}</div>
            `;
            
            if (question.type === 'multiple-choice') {
                questionContent += `
                    <div class="options">
                        ${question.options.map(option => `
                            <label class="option">
                                <input type="radio" name="quiz-${question.id}" value="${option}">
                                <span>${option}</span>
                            </label>
                        `).join('')}
                    </div>
                `;
            } else if (question.type === 'fill-in-blank' || question.type === 'translation') {
                questionContent += `
                    <div class="translation-exercise">
                        <input type="text" class="quiz-input" data-question-id="${question.id}" placeholder="Your answer">
                    </div>
                `;
            }
            
            questionElement.innerHTML = questionContent;
            quizContainer.appendChild(questionElement);
        });
        
        // Set up submit quiz button
        const submitQuizBtn = document.getElementById('submit-quiz-button');
        if (submitQuizBtn) {
            submitQuizBtn.addEventListener('click', () => {
                submitQuiz(quizQuestions);
            });
        }
    } else {
        quizContainer.innerHTML = `
            <div class="no-quiz">
                <p>No quiz available for this lesson.</p>
            </div>
        `;
        
        // Hide submit button
        const submitQuizBtn = document.getElementById('submit-quiz-button');
        if (submitQuizBtn) {
            submitQuizBtn.style.display = 'none';
        }
    }
}

function submitQuiz(questions) {
    let correctAnswers = 0;
    
    questions.forEach(question => {
        let userAnswer;
        
        if (question.type === 'multiple-choice') {
            const selectedOption = document.querySelector(`input[name="quiz-${question.id}"]:checked`);
            userAnswer = selectedOption ? selectedOption.value : null;
        } else {
            const input = document.querySelector(`.quiz-input[data-question-id="${question.id}"]`);
            userAnswer = input ? input.value.trim() : null;
        }
        
        // Check if answer is correct
        if (userAnswer) {
            const isCorrect = userAnswer.toLowerCase() === question.correctAnswer.toLowerCase();
            if (isCorrect) correctAnswers++;
        }
    });
    
    // Show results
    const quizResults = document.getElementById('quiz-results');
    if (quizResults) {
        const score = Math.round((correctAnswers / questions.length) * 100);
        quizResults.innerHTML = `
            <h3>Quiz Results</h3>
            <p>You scored ${score}% (${correctAnswers} out of ${questions.length} correct)</p>
        `;
        
        if (score >= 70) {
            quizResults.classList.add('feedback-success');
            quizResults.classList.remove('feedback-error');
            quizResults.innerHTML += `<p>Congratulations! You passed the quiz.</p>`;
            
            // Update user progress
            updateUserQuizProgress();
        } else {
            quizResults.classList.add('feedback-error');
            quizResults.classList.remove('feedback-success');
            quizResults.innerHTML += `<p>You need to score at least 70% to pass. Try again!</p>`;
        }
        
        quizResults.classList.remove('hidden');
    }
    
    // Update progress
    const lessonProgress = document.getElementById('lesson-progress');
    if (lessonProgress) lessonProgress.style.width = '100%';
}

function updateUserLessonProgress() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Increment lessons completed
    if (!currentUser.progress) {
        currentUser.progress = { lessonsCompleted: 0, quizzesPassed: 0 };
    }
    
    currentUser.progress.lessonsCompleted++;
    
    // Save updated user data
    saveCurrentUser(currentUser);
    
    // Update dashboard
    updateDashboard();
}

function updateUserQuizProgress() {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    // Increment quizzes passed
    if (!currentUser.progress) {
        currentUser.progress = { lessonsCompleted: 0, quizzesPassed: 0 };
    }
    
    currentUser.progress.quizzesPassed++;
    
    // Save updated user data
    saveCurrentUser(currentUser);
    
    // Update dashboard
    updateDashboard();
}

// ============================
// Utility Functions
// ============================
function setupEventListeners() {
    // Set up vocabulary listeners
    setupVocabularyListeners();
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showInputError(inputId, message, showErrorOnly = false) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(`${inputId}-error`);
    
    if (input && !showErrorOnly) {
        input.classList.add('input-error');
    }
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('active');
    }
}

function resetFormErrors(formPrefix) {
    // Clear error classes from inputs
    const inputs = document.querySelectorAll(`#${formPrefix}-form-element input`);
    inputs.forEach(input => input.classList.remove('input-error'));
    
    // Clear error messages
    const errorMessages = document.querySelectorAll(`#${formPrefix}-form-element .error-message`);
    errorMessages.forEach(error => {
        error.textContent = '';
        error.classList.remove('active');
    });
}

function getCurrentUser() {
    const userJson = localStorage.getItem('currentUser');
    return userJson ? JSON.parse(userJson) : null;
}

function saveCurrentUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    // Also update in users storage
    const users = JSON.parse(localStorage.getItem('users') || '{}');
    if (user.email && users[user.email]) {
        users[user.email] = {
            ...users[user.email],
            progress: user.progress,
            vocabulary: user.vocabulary
        };
        localStorage.setItem('users', JSON.stringify(users));
    }
}

function isLoggedIn() {
    return !!getCurrentUser();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// ============================
// Mock Course Data
// ============================
const coursesData = [
    {
        id: '1',
        title: 'French for Beginners',
        level: 'beginner',
        language: 'French',
        description: 'Start your journey in French with basic vocabulary and simple phrases',
        image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&h=400&q=80',
        lessons: [
            {
                id: '1',
                title: 'Greetings and Introductions',
                description: 'Learn how to greet people and introduce yourself in French',
                content: `
                    <h2>Basic French Greetings</h2>
                    <p>In this lesson, you'll learn the essential French greetings and introductions that are used in everyday conversations.</p>
                    
                    <h3>Common Greetings</h3>
                    <ul>
                        <li><strong>Bonjour</strong> - Hello/Good day (formal, can be used any time of day)</li>
                        <li><strong>Salut</strong> - Hi (informal)</li>
                        <li><strong>Bonsoir</strong> - Good evening</li>
                        <li><strong>Au revoir</strong> - Goodbye</li>
                        <li><strong>À bientôt</strong> - See you soon</li>
                    </ul>
                    
                    <h3>Introducing Yourself</h3>
                    <p>To introduce yourself, you can say:</p>
                    <ul>
                        <li><strong>Je m'appelle [your name]</strong> - My name is [your name]</li>
                        <li><strong>Enchanté(e)</strong> - Nice to meet you</li>
                        <li><strong>Comment vous appelez-vous?</strong> - What is your name? (formal)</li>
                        <li><strong>Comment tu t'appelles?</strong> - What is your name? (informal)</li>
                    </ul>
                    
                    <h3>Basic Conversation</h3>
                    <p>Here's an example of a basic conversation:</p>
                    <p>- Bonjour!<br>- Bonjour! Comment vous appelez-vous?<br>- Je m'appelle Marie. Et vous?<br>- Je m'appelle Pierre. Enchanté!<br>- Enchantée!</p>
                `,
                vocabulary: [
                    { word: 'bonjour', translation: 'hello/good day' },
                    { word: 'salut', translation: 'hi' },
                    { word: 'au revoir', translation: 'goodbye' },
                    { word: 'je m\'appelle', translation: 'my name is' },
                    { word: 'enchanté(e)', translation: 'nice to meet you' },
                ],
                exercises: [
                    {
                        id: '1',
                        type: 'multiple-choice',
                        question: 'How do you say "hello" in French?',
                        options: ['Salut', 'Bonjour', 'Au revoir', 'Bonsoir'],
                        correctAnswer: 'Bonjour',
                    },
                    {
                        id: '2',
                        type: 'fill-in-blank',
                        question: 'To introduce yourself, you say: Je ____ Marie.',
                        correctAnswer: 'm\'appelle',
                        hint: 'This phrase means "My name is"',
                    },
                    {
                        id: '3',
                        type: 'translation',
                        question: 'Translate: "Nice to meet you"',
                        correctAnswer: 'Enchanté',
                    },
                ],
            },
            {
                id: '2',
                title: 'Numbers and Counting',
                description: 'Learn how to count in French from 1 to 20',
                content: `
                    <h2>French Numbers 1-20</h2>
                    <p>Learning to count in French is an essential skill. Let's start with the numbers from 1 to 20.</p>
                    
                    <h3>Numbers 1-10</h3>
                    <ul>
                        <li><strong>1 - Un/Une</strong></li>
                        <li><strong>2 - Deux</strong></li>
                        <li><strong>3 - Trois</strong></li>
                        <li><strong>4 - Quatre</strong></li>
                        <li><strong>5 - Cinq</strong></li>
                        <li><strong>6 - Six</strong></li>
                        <li><strong>7 - Sept</strong></li>
                        <li><strong>8 - Huit</strong></li>
                        <li><strong>9 - Neuf</strong></li>
                        <li><strong>10 - Dix</strong></li>
                    </ul>
                    
                    <h3>Numbers 11-20</h3>
                    <ul>
                        <li><strong>11 - Onze</strong></li>
                        <li><strong>12 - Douze</strong></li>
                        <li><strong>13 - Treize</strong></li>
                        <li><strong>14 - Quatorze</strong></li>
                        <li><strong>15 - Quinze</strong></li>
                        <li><strong>16 - Seize</strong></li>
                        <li><strong>17 - Dix-sept</strong> (literally "ten-seven")</li>
                        <li><strong>18 - Dix-huit</strong> (literally "ten-eight")</li>
                        <li><strong>19 - Dix-neuf</strong> (literally "ten-nine")</li>
                        <li><strong>20 - Vingt</strong></li>
                    </ul>
                    
                    <h3>Using Numbers</h3>
                    <p>Numbers are used in many everyday situations:</p>
                    <ul>
                        <li>Telling time: <strong>Il est huit heures</strong> (It's 8 o'clock)</li>
                        <li>Shopping: <strong>Ça coûte dix euros</strong> (It costs 10 euros)</li>
                        <li>Age: <strong>J'ai vingt ans</strong> (I am 20 years old)</li>
                    </ul>
                `,
                vocabulary: [
                    { word: 'un', translation: 'one' },
                    { word: 'deux', translation: 'two' },
                    { word: 'trois', translation: 'three' },
                    { word: 'dix', translation: 'ten' },
                    { word: 'vingt', translation: 'twenty' },
                ],
                exercises: [
                    {
                        id: '1',
                        type: 'multiple-choice',
                        question: 'What is the French word for "five"?',
                        options: ['Trois', 'Quatre', 'Cinq', 'Six'],
                        correctAnswer: 'Cinq',
                    },
                    {
                        id: '2',
                        type: 'fill-in-blank',
                        question: 'The number that comes after "neuf" is ____.',
                        correctAnswer: 'dix',
                    },
                    {
                        id: '3',
                        type: 'translation',
                        question: 'Translate: "I am sixteen years old" (J\'ai ____ ans)',
                        correctAnswer: 'seize',
                    },
                ],
            },
        ],
    },
    {
        id: '2',
        title: 'Spanish for Beginners',
        level: 'beginner',
        language: 'Spanish',
        description: 'Learn essential Spanish vocabulary and grammar',
        image: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=600&h=400&q=80',
        lessons: [
            {
                id: '1',
                title: 'Greetings in Spanish',
                description: 'Learn the most common Spanish greetings',
                content: `
                    <h2>Spanish Greetings</h2>
                    <p>In this lesson, you'll learn common Spanish greetings and how to introduce yourself.</p>
                    
                    <h3>Formal and Informal Greetings</h3>
                    <ul>
                        <li><strong>Hola</strong> - Hello (universal)</li>
                        <li><strong>Buenos días</strong> - Good morning</li>
                        <li><strong>Buenas tardes</strong> - Good afternoon</li>
                        <li><strong>Buenas noches</strong> - Good evening/Good night</li>
                        <li><strong>Adiós</strong> - Goodbye (formal)</li>
                        <li><strong>Hasta luego</strong> - See you later</li>
                        <li><strong>Hasta mañana</strong> - See you tomorrow</li>
                    </ul>
                    
                    <h3>Introducing Yourself</h3>
                    <p>To introduce yourself in Spanish, you can say:</p>
                    <ul>
                        <li><strong>Me llamo [your name]</strong> - My name is [your name]</li>
                        <li><strong>Soy [your name]</strong> - I am [your name]</li>
                        <li><strong>Mucho gusto</strong> - Nice to meet you</li>
                        <li><strong>¿Cómo te llamas?</strong> - What's your name? (informal)</li>
                        <li><strong>¿Cómo se llama usted?</strong> - What's your name? (formal)</li>
                    </ul>
                `,
                vocabulary: [
                    { word: 'hola', translation: 'hello' },
                    { word: 'buenos días', translation: 'good morning' },
                    { word: 'adiós', translation: 'goodbye' },
                    { word: 'me llamo', translation: 'my name is' },
                    { word: 'mucho gusto', translation: 'nice to meet you' },
                ],
                exercises: [
                    {
                        id: '1',
                        type: 'multiple-choice',
                        question: 'How do you say "hello" in Spanish?',
                        options: ['Adiós', 'Hola', 'Gracias', 'Por favor'],
                        correctAnswer: 'Hola',
                    },
                    {
                        id: '2',
                        type: 'fill-in-blank',
                        question: 'To introduce yourself, you say: ___ llamo Carlos.',
                        correctAnswer: 'Me',
                    },
                    {
                        id: '3',
                        type: 'translation',
                        question: 'Translate: "Good afternoon"',
                        correctAnswer: 'Buenas tardes',
                    },
                ],
            },
        ],
    },
    {
        id: '3',
        title: 'German Intermediate Course',
        level: 'intermediate',
        language: 'German',
        description: 'Enhance your German skills with advanced conversation topics',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&h=400&q=80',
        lessons: [
            {
                id: '1',
                title: 'German Sentence Structure',
                description: 'Learn about the structure of German sentences',
                content: `
                    <h2>German Sentence Structure</h2>
                    <p>Understanding German sentence structure is crucial for intermediate learners.</p>
                    
                    <h3>Word Order in German</h3>
                    <p>German typically follows the Subject-Verb-Object (SVO) structure in main clauses:</p>
                    <ul>
                        <li><strong>Ich lese ein Buch.</strong> (I read a book.)</li>
                        <li><strong>Sie spielt Klavier.</strong> (She plays piano.)</li>
                    </ul>
                    
                    <h3>Verb Position Rules</h3>
                    <p>In German, the conjugated verb must be in the second position in main clauses:</p>
                    <ul>
                        <li><strong>Heute gehe ich zur Arbeit.</strong> (Today I go to work.)</li>
                        <li><strong>Morgen kommt er nach Hause.</strong> (Tomorrow he comes home.)</li>
                    </ul>
                    
                    <h3>Subordinate Clauses</h3>
                    <p>In subordinate clauses, the verb moves to the end:</p>
                    <ul>
                        <li><strong>Ich weiß, dass er kommt.</strong> (I know that he is coming.)</li>
                        <li><strong>Sie fragt, wann wir ankommen.</strong> (She asks when we are arriving.)</li>
                    </ul>
                `,
                vocabulary: [
                    { word: 'lesen', translation: 'to read' },
                    { word: 'spielen', translation: 'to play' },
                    { word: 'gehen', translation: 'to go' },
                    { word: 'kommen', translation: 'to come' },
                    { word: 'wissen', translation: 'to know' },
                ],
                exercises: [
                    {
                        id: '1',
                        type: 'multiple-choice',
                        question: 'In a main clause, where is the conjugated verb placed?',
                        options: ['First position', 'Second position', 'Last position', 'Third position'],
                        correctAnswer: 'Second position',
                    },
                    {
                        id: '2',
                        type: 'fill-in-blank',
                        question: 'In subordinate clauses, the verb moves to the ____ of the clause.',
                        correctAnswer: 'end',
                    },
                    {
                        id: '3',
                        type: 'translation',
                        question: 'Translate: "I know that he is coming."',
                        correctAnswer: 'Ich weiß, dass er kommt',
                    },
                ],
            },
        ],
    },
];