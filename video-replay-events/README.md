# School Event Video Replays

A simple, self-contained web application that allows parents to view recorded videos of school events they may have missed. Built with pure HTML, CSS, and JavaScript - no dependencies required.

## Features

### Parent Access
- **Simple Login System**: Parents can login with any username/password (demo mode)
- **Persistent Sessions**: Login state is saved using localStorage
- **Secure Logout**: Clear logout functionality

### Event Calendar
- **Monthly Navigation**: Browse events by month using previous/next buttons
- **Organized Display**: Events are displayed chronologically within each month
- **Event Details**: Each event shows:
  - Date and time
  - Duration
  - Speaker/presenter information
  - Event description

### Video Playback
- **YouTube Integration**: Embedded YouTube player for each event
- **Modal Viewer**: Full-screen modal popup for comfortable viewing
- **Responsive Player**: Video player adapts to screen size
- **Easy Navigation**: Click any event to start watching

### User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Clean Interface**: Modern, intuitive design
- **Fast Loading**: No external dependencies, loads instantly

## Usage Instructions

### For Parents

1. **Open the Application**
   - Open `index.html` in any modern web browser
   - The login screen will appear

2. **Login**
   - Enter any username and password (this is a demo)
   - Click "Login" to access the event replays

3. **Browse Events**
   - View the current month's events on the main screen
   - Use the ◄ and ► buttons to navigate between months
   - Events are organized chronologically

4. **Watch Videos**
   - Click on any event card to open the video player
   - The video will play in a modal window
   - Click the × button or press ESC to close the video

5. **Logout**
   - Click the "Logout" button in the top right corner
   - Your session will end and you'll return to the login screen

### For School Administrators

#### Adding New Events

To add new events, edit the `script.js` file and add entries to the `sampleEvents` array:

```javascript
{
    id: 7,
    title: "Your Event Title",
    description: "Detailed description of the event",
    date: new Date(2025, 11, 25, 14, 0), // Month is 0-indexed (11 = December)
    duration: "1 hour",
    speaker: "Speaker Name",
    youtubeId: "YOUR_YOUTUBE_VIDEO_ID"
}
```

**Getting YouTube Video ID:**
- From a YouTube URL like: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- The video ID is: `dQw4w9WgXcQ` (everything after `v=`)

#### Customizing Appearance

Edit `style.css` to customize colors and styling. Key variables are at the top:

```css
:root {
    --primary-color: #2563eb;  /* Main brand color */
    --background-color: #f8fafc;  /* Page background */
    --surface-color: #ffffff;  /* Card backgrounds */
    /* ... more variables ... */
}
```

## Technical Details

### Files Structure
```
video-replay-events/
├── index.html    # Main HTML structure
├── style.css     # All styling and responsive design
├── script.js     # Application logic and data
└── README.md     # This file
```

### Technologies Used
- **HTML5**: Semantic markup, accessibility features
- **CSS3**: Modern layout (Flexbox, Grid), CSS variables, media queries
- **JavaScript ES6+**: Event handling, DOM manipulation, localStorage
- **YouTube IFrame API**: Embedded video playback

### Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Data Storage
- **localStorage**: Stores user login state
- **In-Memory**: Event data is stored in JavaScript (can be extended to use localStorage)

### Accessibility Features
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- Focus management in modals
- Reduced motion support for users with motion sensitivity

## Sample Events Included

The prototype includes 6 sample events:

1. **Welcome Back Assembly** (November 2025)
2. **Parent-Teacher Information Night** (November 2025)
3. **Science Fair Presentations** (November 2025)
4. **Winter Concert Rehearsal** (December 2025)
5. **Career Day Keynote** (December 2025)
6. **Holiday Celebration** (December 2025)

## Future Enhancements

Potential features for production deployment:

- **Backend Integration**: Connect to a real authentication system
- **Database**: Store events in a database instead of JavaScript
- **Admin Panel**: Web interface for adding/editing events
- **Search Functionality**: Search events by title, speaker, or date
- **Filtering**: Filter by event type, speaker, or topic
- **Favorites**: Allow parents to bookmark favorite events
- **Comments**: Enable parents to leave comments or questions
- **Download Option**: Allow downloading videos for offline viewing
- **Notifications**: Email or push notifications for new events
- **Analytics**: Track which events are most viewed

## Customization Guide

### Changing Login Requirements

To implement real authentication, modify the `handleLogin` function in `script.js`:

```javascript
function handleLogin(e) {
    e.preventDefault();

    const username = usernameInput.value.trim();
    const password = passwordInput.value;

    // Add your authentication logic here
    // Example: fetch('/api/login', { method: 'POST', body: ... })
}
```

### Adding Event Categories

To add categories, update the event object structure and add filtering:

```javascript
{
    id: 1,
    title: "Event Title",
    category: "assembly", // Add category
    // ... other fields
}
```

### Changing Date Format

Modify date formatting in the `createEventCard` function:

```javascript
const dateString = event.date.toLocaleDateString('en-US', {
    // Customize format options here
});
```

## Support

For issues or questions:
1. Check this README for common solutions
2. Review the code comments in each file
3. Test in a different browser
4. Ensure JavaScript is enabled

## License

This prototype is for educational purposes. Customize as needed for your school's requirements.

---

**Note**: This is a prototype application. For production use, implement proper authentication, backend storage, and security measures.
