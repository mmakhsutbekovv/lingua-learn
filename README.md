# LinguaLearn

LinguaLearn is a web-based platform designed to help users learn new languages through interactive lessons, exercises, and personalized learning paths.

## Features

- **User Authentication**: Secure login and signup functionality using LocalStorage.
- **Course Browsing**: Explore courses by language (e.g., French, Spanish, German) and proficiency level (beginner, intermediate, advanced).
- **Interactive Lessons**: Engage with lessons that include content, vocabulary, exercises, and quizzes.
- **Vocabulary Management**: Add, edit, and delete vocabulary words with a lookup feature using an external dictionary API.
- **Progress Tracking**: Monitor your learning progress (lessons completed, quizzes passed) on the dashboard.

## Technologies Used

- **HTML**: Provides the structure of the web application.
- **CSS**: Handles styling with a responsive, mobile-friendly design using custom properties and modern layouts.
- **JavaScript**: Adds interactivity, including navigation, authentication, course management, and vocabulary features.
- **LocalStorage**: Persists user data such as authentication details, progress, and vocabulary.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/lingua-learn.git
   ```
   Replace `yourusername` with your GitHub username.

2. **Open the application**:
   - Open `Final.html` in a web browser to start using LinguaLearn.

## Usage

- **Sign Up / Log In**: Create an account or log in to access the dashboard and courses.
- **Browse Courses**: Navigate to the "Courses" section to view available courses.
- **Start Learning**: Select a course and begin with its lessons, which include vocabulary and exercises.
- **Manage Vocabulary**: Add new words to your vocabulary list from the dashboard, with options to edit or delete them.
- **Track Progress**: Check your lessons completed and quizzes passed on the dashboard.

## Project Analysis

### Purpose
LinguaLearn aims to provide an accessible and interactive platform for language learners, focusing on practical skills like greetings, numbers, and sentence structure.

### Structure
- **Frontend**: Single-page application with sections for home, courses, dashboard, and about.
- **Navigation**: Responsive navigation with a mobile menu toggle.
- **Styling**: Uses CSS custom properties for theming and a grid-based layout for responsiveness.
- **Interactivity**: JavaScript handles dynamic content loading, form validation, and user interactions.

### Key Components
- **Authentication**: Simulated API calls with LocalStorage for user management.
- **Courses**: Mock data for French, Spanish, and German courses, with lessons, vocabulary, and exercises.
- **Dashboard**: Displays user profile, learning statistics, and a vocabulary manager.
- **Feedback**: Toast notifications provide success/error messages.

### Potential Improvements
- **Backend Integration**: Replace LocalStorage with a server-side database for persistent data storage.
- **Audio Features**: Add native speaker audio for pronunciation practice (currently uses SpeechSynthesis or API audio).
- **Expanded Content**: Include more courses, lessons, and interactive elements like games.
- **Accessibility**: Enhance ARIA attributes and keyboard navigation.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for enhancements or bug fixes.

## License

This project is licensed under the MIT License.