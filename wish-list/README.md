# School Wish List

A simple, self-contained web application that allows parents to submit wishes to the school (anonymously or with their name), and enables teachers/administrators to review, provide feedback, and manage follow-ups. Inspired by [Canny.io](https://canny.io).

## Features

### For Parents
- ✅ Submit wishes with a title and detailed description
- 👤 Option to submit anonymously or with your name
- 📂 Categorize wishes (Facilities, Curriculum, Activities, Resources, Other)
- 👍 Upvote wishes you support
- 📊 View all wishes and their current status
- 🔍 Filter wishes by status and category
- 📈 Sort wishes by most recent, most popular, or oldest

### For Teachers/Admins
- 📋 Dashboard with statistics (Total, New, In Progress, Completed)
- 🔄 Update wish status (New, Under Review, Planned, In Progress, Completed, Declined)
- 💬 Add comments and feedback to wishes
- 📝 Track and manage all submitted wishes
- 🔍 Filter and sort wishes for better organization
- 👀 View detailed information about each wish

## How to Use

### Getting Started
1. Open `index.html` in a web browser
2. No installation or setup required!

### Parent View (Default)
1. **Submit a Wish:**
   - Fill in the wish title and description
   - Select a category
   - Choose to submit with your name or anonymously
   - Click "Submit Wish"

2. **Browse Wishes:**
   - View all submitted wishes
   - Upvote wishes you support (click the ▲ button)
   - Filter by status or category
   - Sort by recent, popular, or oldest

### Admin View
1. **Switch to Admin View:**
   - Click the "Admin View" button in the header

2. **View Dashboard:**
   - See quick statistics at the top
   - Total wishes, new wishes, in progress, and completed

3. **Manage Wishes:**
   - Click on any wish card to open the detail modal
   - Update the wish status
   - Add comments and feedback
   - Track conversations with parents

4. **Filter and Sort:**
   - Use the filter dropdowns to focus on specific wishes
   - Sort by different criteria

## Wish Status Workflow

1. **New** - Wish has just been submitted
2. **Under Review** - Being reviewed by school staff
3. **Planned** - Approved and planned for implementation
4. **In Progress** - Currently being worked on
5. **Completed** - Wish has been fulfilled
6. **Declined** - Cannot be implemented (with explanation in comments)

## Categories

- 🏫 **Facilities** - Building, playground, infrastructure improvements
- 📚 **Curriculum** - Course offerings, teaching methods, educational programs
- ⚽ **Activities** - Extracurricular activities, events, clubs
- 🖥️ **Resources** - Equipment, materials, technology
- 📌 **Other** - Everything else

## Data Persistence

All data is stored locally in your browser using localStorage:
- Wishes and their details
- Comments and feedback
- Upvotes
- Status updates

**Note:** Data is stored per browser/device. Clearing browser data will remove all wishes.

## Browser Compatibility

Works on all modern browsers:
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)

## Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices
- 📱 Tablets
- 💻 Desktop computers

## Privacy & Anonymity

When submitting anonymously:
- Your name is not stored
- Wishes are marked as "Anonymous"
- No personally identifiable information is collected

## Tips for Best Results

### For Parents
- Be specific and detailed in your wish descriptions
- Check if a similar wish already exists and upvote it instead
- Use the appropriate category for better organization
- Check back regularly to see status updates and feedback

### For Teachers/Admins
- Respond to wishes promptly with comments
- Update status regularly to keep parents informed
- Provide detailed explanations when declining wishes
- Use the "Under Review" status while evaluating wishes
- Mark wishes as "Planned" to show commitment before starting work

## Sample Wishes

Here are some examples of wishes that might be submitted:

### Facilities
- "Install bike racks near the main entrance"
- "Create a covered outdoor play area for rainy days"
- "Add more water fountains around campus"

### Curriculum
- "Offer coding classes for elementary students"
- "Add Spanish language instruction starting in kindergarten"
- "Introduce project-based learning opportunities"

### Activities
- "Start a chess club for middle school students"
- "Organize family science nights"
- "Create a student garden program"

### Resources
- "Purchase more tablets for classroom use"
- "Add more books to the library in different languages"
- "Get musical instruments for music class"

## Technical Details

### Files
- `index.html` - Main structure and layout
- `style.css` - All styling and responsive design
- `script.js` - All functionality and data management
- `README.md` - This documentation

### Technologies Used
- HTML5 (semantic markup)
- CSS3 (Flexbox, Grid, CSS Variables)
- Vanilla JavaScript (ES6+)
- localStorage API for data persistence

### No External Dependencies
- No frameworks (React, Vue, Angular)
- No libraries (jQuery, Bootstrap)
- No CDN imports
- Works completely offline

## Customization

You can easily customize the application by editing:

### Colors (in `style.css`)
```css
:root {
    --primary-color: #5c6ac4;  /* Main brand color */
    --success-color: #50b83c;  /* Success/completed color */
    --warning-color: #f49342;  /* Warning/review color */
    /* ... more colors */
}
```

### Categories (in `index.html` and `script.js`)
Add new categories by:
1. Adding options to the category select in `index.html`
2. Adding corresponding labels in the `getCategoryLabel()` function in `script.js`

### Status Options (in `index.html` and `script.js`)
Modify the status workflow by editing the status options in both files.

## Future Enhancement Ideas

- Export wishes to PDF or CSV
- Email notifications for status changes
- Attach images to wishes
- Reply to comments (threaded discussions)
- User authentication for better tracking
- Search functionality
- Wish editing by original author
- Admin bulk actions
- Analytics and reporting

## Accessibility

- Semantic HTML5 elements
- Keyboard navigation support
- Clear focus indicators
- Proper ARIA labels
- Readable color contrast
- Responsive text sizing

## Print Support

The application includes print styles:
- Hides interactive elements
- Shows wish details clearly
- Optimized for paper format

To print wishes:
1. Filter/sort the wishes you want to print
2. Use your browser's print function (Ctrl+P or Cmd+P)

## Troubleshooting

**Q: My wishes disappeared!**
A: Check if you're using the same browser and didn't clear browser data. Data is stored locally per browser.

**Q: I can't submit a wish!**
A: Make sure all required fields (title, description, and name if not anonymous) are filled in.

**Q: The upvote button doesn't work!**
A: Try refreshing the page. Make sure JavaScript is enabled in your browser.

**Q: Can I edit a wish after submitting?**
A: Currently, editing is not supported. Submit a new wish with corrections or contact admin via comments.

## Support

For issues or questions:
1. Check this README first
2. Ensure you're using a modern browser
3. Try clearing cache and reloading
4. Make sure JavaScript is enabled

---

**Version:** 1.0
**Last Updated:** November 2025
**License:** Open source for educational use
