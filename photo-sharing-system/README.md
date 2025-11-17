# 📸 School Photo Sharing System

A simple, self-contained web application for schools to share event photos with parents. Teachers can upload photos, tag students using an AI-simulated interface, and parents can filter photos to find their children.

## Features

### Teacher/Admin Features
- **Event Management**
  - Create and manage school events (concerts, field trips, sports days, etc.)
  - Track the number of photos per event
  - Delete events and associated photos

- **Student Management**
  - Add students with their name and class/grade
  - Organize students by classes
  - Delete students when needed

- **Photo Upload & Tagging**
  - Upload multiple photos at once (drag & drop or click to browse)
  - Tag students in each photo
  - AI-simulated tagging interface (in a real system, this would use facial recognition)
  - Preview photos before and after tagging
  - Delete individual photos

### Parent Features
- **Smart Filtering**
  - Filter by specific events
  - Filter by student name (find all photos of your child)
  - Filter by class (find all photos of a specific class)
  - Combine multiple filters for precise results

- **Photo Gallery**
  - Browse all photos with thumbnail previews
  - Click to view full-size photos
  - See which students are tagged in each photo
  - Download individual photos

## How to Use

### Getting Started
1. Open `index.html` in your web browser
2. The app opens in **Teacher/Admin** mode by default
3. Switch between Teacher and Parent modes using the dropdown in the header

### Teacher Workflow

#### 1. Set Up Students (First Time)
The app comes with sample students, but you can customize:
1. Go to the **Students & Classes** tab
2. Click **+ Add Student**
3. Enter student name and class
4. Click **Add Student**

#### 2. Create an Event
1. Go to the **Events** tab
2. Click **+ Create Event**
3. Fill in:
   - Event name (e.g., "Spring Concert 2024")
   - Event date
   - Description (optional)
4. Click **Create Event**

#### 3. Upload and Tag Photos
1. Go to the **Upload & Tag Photos** tab
2. Select the event from the dropdown
3. Upload photos by:
   - Clicking the upload area and selecting files, OR
   - Dragging and dropping photos onto the upload area
4. For each uploaded photo:
   - Click **Tag Students**
   - Check the boxes next to students who appear in the photo
   - Click **Save Tags**

### Parent Workflow

#### 1. Switch to Parent View
Use the dropdown in the header to switch to **Parent** mode

#### 2. Browse and Filter Photos
- **View all photos**: Leave all filters blank
- **View specific event**: Select an event from the dropdown
- **Find your child**: Select their name from the "Filter by Student" dropdown
- **View class photos**: Select a class from the "Filter by Class" dropdown
- **Combine filters**: Use multiple filters together

#### 3. View and Download Photos
1. Click on any photo to view it full-size
2. See which students are tagged in the photo
3. Click **Download Photo** to save it to your device

## Technical Details

### Data Storage
- All data is stored in your browser's localStorage
- Data persists between sessions
- Data is stored locally on your device (not shared online)

### File Structure
```
photo-sharing-system/
├── index.html          # Main HTML structure
├── style.css           # All styling (responsive design)
├── script.js           # All functionality and logic
└── README.md          # This file
```

### Browser Compatibility
Works in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari

### Data Management
The app stores three types of data:
1. **Events**: Event details (name, date, description)
2. **Students**: Student information (name, class)
3. **Photos**: Photo data (base64 encoded), event association, and student tags

### Storage Limitations
- Photos are stored as base64 strings in localStorage
- localStorage has a limit of approximately 5-10MB depending on the browser
- For approximately 50-200 photos (depending on image size)
- If you need to store more photos, consider:
  - Deleting old events
  - Creating multiple event "albums"
  - Using smaller image file sizes

## AI Simulation

This prototype simulates AI-powered tagging:
- **Current Implementation**: Teachers manually select students from a list
- **In a Real System**:
  - AI would automatically detect faces in photos
  - Facial recognition would identify students
  - Tags would be applied automatically with confidence scores
  - Teachers would only need to verify/correct AI suggestions

The manual tagging interface demonstrates the workflow and user experience of an AI-powered system without requiring external APIs or backend services.

## Use Cases

### School Events
- Field trips
- Sports days
- Concerts and performances
- Science fairs
- Graduation ceremonies
- Classroom activities

### Benefits
- **For Teachers**: Easy to organize and share event photos
- **For Parents**: Quick way to find photos of their children
- **For Schools**: No third-party services or data privacy concerns
- **For Everyone**: Works offline, no internet required after initial load

## Privacy & Security

- **All data stays local**: Nothing is uploaded to external servers
- **Browser-only storage**: Data stored in localStorage on the device
- **No accounts needed**: No login or personal information required
- **Easy to reset**: Clear browser data to remove all photos and information

## Tips for Best Use

### Photo Management
- Upload photos in batches per event
- Tag photos immediately after uploading
- Use clear, descriptive event names
- Include dates in event names for easy reference

### Student Organization
- Use consistent class naming (e.g., "3rd Grade - Mrs. Smith")
- Update student list at the start of each school year
- Remove graduated students to keep the list current

### For Parents
- Check back after each event for new photos
- Use the class filter to see all classmates
- Download photos you want to keep permanently
- Bookmark the page for easy access

## Limitations

As a frontend-only prototype:
- No real AI face detection
- Limited storage capacity (browser localStorage)
- No multi-device sync
- No user authentication
- No photo sharing via links
- Manual tagging required

## Future Enhancements (Requires Backend)

To build a production version, you would add:
- Real AI facial recognition (Azure Face API, AWS Rekognition, etc.)
- Cloud storage for photos
- User accounts and authentication
- Photo sharing via secure links
- Mobile apps (iOS/Android)
- Automatic photo backup
- Email notifications when new photos are added
- Batch download of filtered photos
- Photo printing integration

## Troubleshooting

### Photos not loading
- Check that you selected an event before uploading
- Ensure image files are valid (JPG, PNG)
- Try refreshing the page

### Storage full
- Delete old events and photos
- Use smaller image files
- Clear browser localStorage and start fresh

### Tags not saving
- Make sure you clicked "Save Tags" not "Cancel"
- Verify students exist in the Students list
- Try refreshing and re-tagging

### Filters not working
- Ensure photos have been tagged with students
- Try clearing filters and reapplying
- Check that the selected student/class exists

## Support

This is an educational prototype. For questions or improvements:
1. Review the code comments in `script.js`
2. Check browser console for error messages
3. Ensure you're using a modern browser

## License

This prototype is provided as-is for educational purposes. Feel free to modify and adapt for your needs.

---

**Created for**: School administrators, teachers, and parents
**Purpose**: Simple, privacy-focused photo sharing for school events
**Technology**: Pure HTML, CSS, and JavaScript (no dependencies)
