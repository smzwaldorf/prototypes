# School Event Registration

A simple, self-contained web application for managing school events and parent registrations. Teachers can create and manage events, while parents can register and track their participation.

## Features

### For Teachers

- **Create Events**: Set up events with title, description, date, time, location, and capacity
- **Custom Fields**: Add custom registration fields (e.g., lunch preferences, dietary restrictions)
- **Event Management**: View, edit, and delete events
- **Registration Tracking**: See all registrations with detailed information
- **Attendance Tracking**: Mark attendees as present during the event
- **Capacity Management**: Set maximum attendees and track spots filled

### For Parents

- **Browse Events**: View all upcoming school events
- **Quick Registration**: Register for events with saved profile information
- **Profile Management**: Save parent and student information for easy reuse
- **Registration History**: View all current and past registrations
- **Custom Responses**: Answer event-specific questions (lunch choices, special requirements, etc.)
- **Registration Status**: Check if successfully registered and attendance status

## How to Use

### Getting Started

1. Open `index.html` in your web browser
2. Select your role: **Teacher** or **Parent**

### Teacher Workflow

1. **Select Teacher Role** from the home screen
2. **Create an Event**:
   - Click "Create Event" tab
   - Fill in event details (title, description, date, time, location)
   - Optionally set a capacity limit
   - Add custom fields if needed (e.g., lunch preferences)
   - Check "Include lunch options" for automatic lunch selection field
   - Click "Save Event"

3. **Manage Events**:
   - View all events in the "Events" tab
   - Click on any event card to view details
   - View all registrations and attendee information
   - Edit event details or delete the event

4. **Track Attendance**:
   - Open event details
   - View list of registrations
   - Click "Mark Attended" for each participant who arrives
   - Unmark if needed

### Parent Workflow

1. **Select Parent Role** from the home screen

2. **Set Up Profile** (First Time):
   - Go to "My Profile" tab
   - Enter your information:
     - Parent name
     - Email address
     - Phone number
     - Student name
     - Student class
   - Click "Save Profile"

3. **Register for Events**:
   - Go to "Browse Events" tab
   - Click "Register" on any available event
   - Your profile information will be pre-filled
   - Enter number of attendees
   - Answer any custom questions (e.g., lunch choice)
   - Click "Register"

4. **View Your Registrations**:
   - Go to "My Registrations" tab
   - See all events you're registered for
   - View attendance status
   - Cancel registrations if needed

## Custom Fields Examples

Teachers can add custom fields to gather additional information:

- **Lunch Choices**: Meat, Vegetables, No Lunch
- **Dietary Restrictions**: Text field for allergies or preferences
- **T-Shirt Size**: Dropdown with size options
- **Transportation**: Bus, Car, Walk
- **Special Requirements**: Any special needs or accommodations

## Data Storage

All data is stored locally in your browser using localStorage:

- **Events**: All created events
- **Registrations**: All parent registrations
- **Profile**: Parent and student information

**Note**: Data persists between sessions but is specific to each browser. Clearing browser data will delete all information.

## Technical Details

- **No Backend Required**: Runs entirely in the browser
- **No Dependencies**: Pure HTML, CSS, and JavaScript
- **Responsive Design**: Works on mobile, tablet, and desktop
- **Offline Capable**: No internet connection required after initial load
- **Print Friendly**: Event details and registration lists can be printed

## Browser Compatibility

Works in all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Features Breakdown

### Event Creation
- Basic information (title, description, date, time, location)
- Capacity limits with automatic tracking
- Custom registration fields
- Pre-configured lunch options
- Edit and delete capabilities

### Registration System
- Profile-based registration (save once, reuse always)
- Custom field responses
- Multiple attendees per registration
- Registration confirmation
- Cancellation option

### Attendance Tracking
- Real-time attendance marking
- Attendee count vs. registered count
- Individual attendance status
- Unmark capability for corrections

### User Experience
- Clean, modern interface
- Mobile-responsive design
- Role-based views (Teacher/Parent)
- Tab-based navigation
- Modal windows for forms and details
- Success/error notifications
- Empty states with helpful messages

## Use Cases

Perfect for:
- School field trips
- Parent-teacher conferences
- School performances and concerts
- Fundraising events
- Sports events
- Workshop registrations
- Volunteer opportunities
- Parent meetings
- School fairs and festivals

## Tips

### For Teachers
- Set capacity limits for events with space restrictions
- Use custom fields to collect all necessary information upfront
- Check registrations regularly to plan accordingly
- Mark attendance during the event for accurate records

### For Parents
- Complete your profile first for faster registrations
- Register early for popular events with limited capacity
- Check "My Registrations" to confirm successful registration
- Update your profile if student changes classes

## Privacy & Security

- All data is stored locally in the browser
- No data is sent to external servers
- Each browser/device has independent data
- Clear browser data to remove all information
- No user accounts or authentication required

## Limitations

- Data is browser-specific (not synced across devices)
- No email notifications
- No payment processing
- No data export/import functionality
- Single student per profile (create multiple profiles for multiple students)

## Future Enhancements

Potential features for future versions:
- Multiple student profiles per parent
- Email notifications
- Calendar integration
- Data export (CSV/PDF)
- Reminder notifications
- Photo/file attachments
- Event categories/tags
- Search and filter functionality

## Support

For issues or questions:
- Check that JavaScript is enabled in your browser
- Try clearing browser cache and reloading
- Ensure you're using a modern browser
- Check browser console for error messages

## License

This is an educational prototype for school use. Feel free to modify and adapt to your needs.

---

**Last Updated**: 2025-11-17
**Version**: 1.0
