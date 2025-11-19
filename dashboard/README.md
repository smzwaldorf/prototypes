# Educational Prototypes Dashboard

A beautiful, responsive dashboard to organize and access all educational prototypes in this repository.

## Features

- **Prototype Listing**: Display all available prototypes in an organized grid layout
- **Search Functionality**: Quickly find prototypes by name or description
- **Category Filtering**: Filter prototypes by category (Tracking, Planning, Assessment, Communication)
- **Statistics Dashboard**: View total prototypes, categories, and recently added items
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **No Dependencies**: Pure HTML, CSS, and JavaScript - no external libraries

## How to Use

1. **Open the Dashboard**: Simply open `index.html` in your web browser
2. **Browse Prototypes**: Scroll through the grid of available prototypes
3. **Search**: Use the search box to find specific prototypes
4. **Filter by Category**: Click category buttons to filter prototypes
5. **Open Prototype**: Click "Open Prototype" on any card to launch it

## Adding New Prototypes

To add a new prototype to the dashboard, edit the `script.js` file:

1. Open `script.js`
2. Find the `prototypes` array at the top of the file
3. Add a new prototype object with the following structure:

```javascript
{
    id: 'unique-prototype-id',           // Unique identifier (kebab-case)
    name: 'Prototype Name',              // Display name
    description: 'Brief description',    // What the prototype does
    category: 'tracking',                // Category: tracking, planning, assessment, or communication
    icon: '📋',                          // Emoji icon to display
    path: '../folder-name/index.html',   // Relative path to prototype
    added: '2024-01-15'                  // Date added (YYYY-MM-DD)
}
```

### Example

```javascript
const prototypes = [
    {
        id: 'attendance-tracker',
        name: 'Attendance Tracker',
        description: 'Simple interface to track student attendance with daily records and weekly summaries.',
        category: 'tracking',
        icon: '📋',
        path: '../attendance-tracker/index.html',
        added: '2024-01-15'
    },
    {
        id: 'grade-calculator',
        name: 'Grade Calculator',
        description: 'Calculate final grades based on weighted categories and assignments.',
        category: 'assessment',
        icon: '📊',
        path: '../grade-calculator/index.html',
        added: '2024-01-20'
    }
];
```

## Categories

The dashboard supports four main categories:

- **tracking**: Tools for tracking attendance, behavior, participation, etc.
- **planning**: Tools for planning lessons, schedules, homework, etc.
- **assessment**: Tools for grades, evaluations, assessments
- **communication**: Tools for parent-teacher communication, notes, logs

You can add more categories by:
1. Adding a new filter button in `index.html`
2. Using the new category name in your prototype objects

## File Structure

```
dashboard/
├── index.html    # Main dashboard HTML
├── style.css     # All styling
├── script.js     # Functionality and prototype configuration
└── README.md     # This file
```

## Customization

### Colors and Theme

Edit CSS variables in `style.css` to customize the color scheme:

```css
:root {
    --primary-color: #4f46e5;      /* Main brand color */
    --secondary-color: #10b981;    /* Accent color */
    --background: #f9fafb;         /* Page background */
    --surface: #ffffff;            /* Card background */
    /* ... more variables ... */
}
```

### Layout

- Grid columns: Modify `.prototypes-grid` in `style.css`
- Card sizing: Adjust `minmax()` values in grid-template-columns
- Spacing: Update gap values and padding

## Browser Compatibility

Works in all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Accessibility

The dashboard includes:
- Semantic HTML elements
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast ratios for text
- Responsive touch targets

## API

The dashboard exposes a simple API through `window.dashboardAPI`:

```javascript
// Add a prototype dynamically
window.dashboardAPI.addPrototype({
    id: 'new-prototype',
    name: 'New Prototype',
    // ... other properties
});

// Get all prototypes
const all = window.dashboardAPI.prototypes;

// Get by category
const tracking = window.dashboardAPI.getPrototypesByCategory('tracking');

// Search
const results = window.dashboardAPI.searchPrototypes('attendance');
```

## Tips

1. **Keep descriptions concise**: Aim for 1-2 sentences
2. **Choose appropriate emojis**: Use icons that clearly represent the prototype's purpose
3. **Update the date**: Set the 'added' date when adding new prototypes
4. **Test paths**: Ensure the 'path' correctly points to the prototype
5. **Use categories consistently**: Stick to the defined categories for better organization

## Screenshots

The dashboard will automatically show:
- A welcome message when no prototypes exist
- An empty state when search/filter returns no results
- Statistics that update based on available prototypes

## Maintenance

- Regularly update the `added` date for new prototypes
- Remove or update prototypes that are deprecated
- Keep descriptions accurate and helpful
- Test all prototype links periodically

## License

Part of the Educational Prototypes collection. All prototypes are self-contained and require no external dependencies.
