# CLAUDE.md - Repository Instructions

## Repository Overview

This repository contains a collection of **educational prototypes** - simple, self-contained web applications designed for schools, used by teachers and parents.

## Key Principles

### 1. Self-Contained Prototypes
- Each prototype lives in its own folder
- No shared dependencies between prototypes
- Each prototype should be fully functional on its own

### 2. Frontend Only
- **HTML, CSS, and JavaScript only**
- No backend servers
- No databases
- No 3rd party dependencies (no npm, no CDN imports)
- All code should work by simply opening the HTML file in a browser

### 3. Simple and Educational
- Focus on functionality and usability
- Keep code simple and maintainable
- Suitable for school environments (teachers and parents)

## Repository Structure

```
prototypes/
├── CLAUDE.md (this file)
├── prototype-1/
│   ├── index.html
│   ├── style.css
│   └── script.js
├── prototype-2/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── ...
```

## Creating a New Prototype

When creating a new prototype, follow these steps:

1. **Create a new folder** with a descriptive name (use kebab-case):
   ```
   attendance-tracker/
   grade-calculator/
   homework-planner/
   ```

2. **Required files** in each prototype folder:
   - `index.html` - Main HTML file
   - `style.css` - All styling (no inline styles)
   - `script.js` - All JavaScript functionality

3. **Optional files**:
   - `README.md` - Description of the prototype, features, and usage instructions
   - Additional CSS/JS files if needed for organization

## Guidelines for Development

### HTML
- Use semantic HTML5 elements
- Include proper meta tags (viewport, charset)
- Keep structure clean and accessible
- Add comments for complex sections

### CSS
- Use modern CSS (Flexbox, Grid)
- Keep styles organized and commented
- Use CSS variables for colors and common values
- Make designs responsive (mobile-friendly)
- No external CSS frameworks (no Bootstrap, Tailwind, etc.)

### JavaScript
- Use vanilla JavaScript (no jQuery, React, etc.)
- Write clean, commented code
- Use modern ES6+ features where appropriate
- Handle errors gracefully
- Use localStorage for data persistence when needed
- No external libraries or frameworks

### Best Practices
- **Accessibility**: Use proper ARIA labels, keyboard navigation
- **Responsive Design**: Work on mobile, tablet, and desktop
- **Browser Compatibility**: Test in modern browsers (Chrome, Firefox, Safari, Edge)
- **Code Quality**: Clean, readable, well-commented code
- **User Experience**: Intuitive interfaces suitable for teachers and parents

## Example Prototype Types

Here are some examples of prototypes that would fit this repository:

- **Attendance Tracker** - Simple interface to track student attendance
- **Grade Calculator** - Calculate final grades based on weighted categories
- **Homework Planner** - Calendar-based homework assignment tracker
- **Class Schedule Builder** - Create and manage class schedules
- **Parent-Teacher Communication Log** - Track parent-teacher interactions
- **Student Progress Dashboard** - Visual display of student progress
- **Reading Log** - Track reading minutes and books
- **Behavior Tracker** - Simple positive/negative behavior tracking

## Testing a Prototype

To test any prototype:

1. Navigate to the prototype folder
2. Open `index.html` in a web browser
3. Test all functionality
4. Test on different screen sizes (responsive design)
5. Verify data persistence (if using localStorage)

## Common Patterns

### Data Persistence
Use localStorage for saving data:
```javascript
// Save data
localStorage.setItem('myData', JSON.stringify(data));

// Load data
const data = JSON.parse(localStorage.getItem('myData') || '[]');
```

### Responsive Design
Use CSS media queries:
```css
/* Mobile first */
.container {
  width: 100%;
  padding: 1rem;
}

/* Tablet and up */
@media (min-width: 768px) {
  .container {
    width: 750px;
    margin: 0 auto;
  }
}
```

### Event Handling
Use event delegation for dynamic content:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  // Initialize app
});
```

## When Working with Claude

When asking Claude to create or modify prototypes:

1. **Be specific** about the prototype's purpose and target users
2. **Describe required features** in detail
3. **Specify any constraints** (e.g., must work offline, must support printing)
4. **Request accessibility features** if needed
5. **Ask for documentation** within the code and in README.md

Example prompt:
> "Create a new prototype for tracking student attendance. It should allow teachers to mark students as present, absent, or tardy for each day. Include a weekly summary view and use localStorage to save data. Make it mobile-friendly and include a print-friendly view."

## Maintenance Notes

- Keep prototypes independent - changes to one should not affect others
- Update this CLAUDE.md if new patterns or guidelines emerge
- Document any common utilities or patterns that are reused
- Ensure all prototypes remain functional without external dependencies

---

**Remember**: The goal is to create simple, functional prototypes that can be opened directly in a browser and used immediately by teachers and parents, without any setup or installation required.
