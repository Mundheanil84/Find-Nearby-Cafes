# Find Nearby Cafes - README.md

```markdown
# ☕ Find Nearby Cafes

An interactive web application that helps users discover coffee shops and cafes across major Indian cities. Built with React, Leaflet.js, and Tailwind CSS.

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-green)
![Tailwind](https://img.shields.io/badge/Tailwind-3.2.7-38B2AC)
![Vite](https://img.shields.io/badge/Vite-4.2.0-646CFF)

## 🌟 Features

### 🗺️ Interactive Map
- **Live Location Tracking**: Automatically detects and centers on user's current location
- **Cafe Markers**: Visual representation of cafes with custom icons
- **Popup Information**: Click markers to view cafe details, ratings, and hours
- **Smooth Navigation**: Pan and zoom across different Indian cities

### 🔍 Smart Search
- **City-based Search**: Explore cafes across 14 major Indian cities
- **Quick Access**: Popular cities (Mumbai, Delhi, Bangalore, Hyderabad, Chennai) readily available
- **Smart Suggestions**: Type-ahead search with categorized results
- **Current Location**: Switch between city search and current location mode

### 📱 Responsive Design
- **Mobile-First**: Optimized for all device sizes
- **Touch-Friendly**: Easy navigation on mobile devices
- **Fast Loading**: Optimized performance with lazy loading

### ☕ Cafe Information
- **Detailed Profiles**: Name, address, ratings, specialties, and operating hours
- **Distance Calculation**: Shows distance from current location
- **Category Filtering**: Filter by cafe type (Coffee Shop, Tea House, etc.)
- **Rating System**: Star ratings for quick quality assessment

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Modern web browser with geolocation support

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd cafe-finder
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Open your browser**
Navigate to `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
cafe-finder/
├── public/
│   └── cafes.json              # Static cafe data
├── src/
│   ├── components/             # React components
│   │   ├── Map.jsx            # Leaflet map component
│   │   ├── CafeList.jsx       # Cafe listing sidebar
│   │   ├── SearchBar.jsx      # City search component
│   │   └── LoadingSpinner.jsx # Loading indicator
│   ├── hooks/                  # Custom React hooks
│   │   ├── useGeolocation.js  # Location handling
│   │   └── useCitySearch.js   # Search functionality
│   ├── services/               # External services
│   │   └── geocodingService.js # City coordinate service
│   ├── utils/                  # Utility functions
│   │   ├── cafeData.js        # Data parsing utilities
│   │   └── constants.js       # App constants and city data
│   ├── App.jsx                # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── package.json               # Dependencies and scripts
└── tailwind.config.js         # Tailwind CSS configuration
```

## 🧪 Testing

### Run Tests
```bash
# Run test suite
npm test

# Run tests in watch mode
npm run test:watch
```

### Test Coverage
The project includes comprehensive unit tests for:
- Data parsing and validation
- Error handling for malformed data
- Type conversion utilities
- Data structure integrity

### Example Test
```javascript
// Tests data parsing functionality
test('should parse valid cafe data correctly', () => {
  const testData = { cafes: [{ id: 1, name: "Test Cafe", latitude: "40.7589" }] };
  const result = parseCafeData(testData);
  expect(result[0].name).toBe("Test Cafe");
  expect(typeof result[0].latitude).toBe('number');
});
```

## 🏗️ Technical Details

### Tech Stack
- **Frontend Framework**: React 18.2.0
- **Build Tool**: Vite 4.2.0
- **Mapping Library**: Leaflet.js 1.9.4 + React-Leaflet 4.2.1
- **Styling**: Tailwind CSS 3.2.7
- **Geolocation**: Browser Geolocation API

### Key Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1"
}
```

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🎯 Usage Guide

### Basic Navigation
1. **Allow Location Access**: Grant permission for automatic location detection
2. **View Nearby Cafes**: Map automatically centers on your location showing nearby cafes
3. **Click Markers**: Select cafe markers to view detailed information
4. **Use Sidebar**: Browse cafe list and click items to navigate on map

### City Search
1. **Click Search Bar**: Open city search dropdown
2. **Type City Name**: Start typing to see suggestions
3. **Select City**: Choose from popular cities or search results
4. **View City Cafes**: Map updates to show cafes in selected city

### Current Location Mode
1. **Click "My Location"**: Switch to current location view
2. **See Distance**: Cafe list shows distance from your location
3. **Auto-centering**: Map centers on your moving location

## 🔧 Configuration

### Adding New Cities
Edit `src/utils/constants.js`:
```javascript
export const INDIAN_CITIES = {
  'New City': { lat: 12.3456, lng: 78.9012 },
  // ... existing cities
};
```

### Modifying Cafe Data
Update `public/cafes.json`:
```json
{
  "cafes": [
    {
      "id": 11,
      "name": "New Cafe",
      "latitude": 12.3456,
      "longitude": 78.9012,
      "address": "123 New Street, New City",
      "city": "New City",
      "rating": 4.5,
      "hours": "8:00 AM - 10:00 PM",
      "type": "Coffee Shop",
      "specialty": "Special Brew"
    }
  ]
}
```

### Styling Customization
Modify `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'cafe-primary': '#8B4513',
      }
    }
  }
}
```

## 🐛 Troubleshooting

### Common Issues

**1. Location Permission Denied**
```
Error: User denied the request for Geolocation.
```
- **Solution**: Refresh page and allow location access when prompted
- **Alternative**: Use city search functionality

**2. Map Tiles Not Loading**
```
Error: Failed to load map tiles
```
- **Solution**: Check internet connection and refresh page
- **Alternative**: Ensure firewall isn't blocking tile servers

**3. Build Errors**
```
Error: Module not found
```
- **Solution**: Run `npm install` to ensure all dependencies are installed

**4. Slow Performance**
- **Solution**: Use production build (`npm run build`)
- **Alternative**: Check network speed and browser cache

### Debug Mode
Enable debug logging by setting local storage:
```javascript
localStorage.setItem('debug', 'true');
```

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Use ESLint for code linting
- Follow React best practices
- Write tests for new functionality
- Update documentation for changes

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Leaflet.js**: For the powerful open-source mapping library
- **OpenStreetMap**: For providing free map tiles
- **Tailwind CSS**: For the utility-first CSS framework
- **React Community**: For extensive documentation and support

## 📞 Support

For support and questions:
- Create an [Issue](https://github.com/username/cafe-finder/issues)
- Check [Documentation](#) 
- Email: support@example.com

## 🔗 Links

- **Live Demo**: [https://cafe-finder-demo.netlify.app](https://cafe-finder-demo.netlify.app)
- **Documentation**: [https://github.com/username/cafe-finder/wiki](https://github.com/username/cafe-finder/wiki)
- **API Reference**: [https://github.com/username/cafe-finder/docs](https://github.com/username/cafe-finder/docs)

---

<div align="center">

**Made with ❤️ and ☕**

*Discover your perfect coffee spot today!*

</div>
```

This comprehensive README.md file includes:

## ✅ Key Sections Covered:
1. **Project Overview** - Clear description with badges
2. **Features** - Detailed feature list with emojis
3. **Quick Start** - Step-by-step installation guide
4. **Project Structure** - Organized file hierarchy
5. **Testing** - Complete testing instructions
6. **Technical Details** - Tech stack and dependencies
7. **Usage Guide** - Practical user instructions
8. **Configuration** - Customization options
9. **Troubleshooting** - Common issues and solutions
10. **Contributing** - Development guidelines
11. **Support** - Help resources and links

## 🎯 Professional Elements:
- **Badges** for version and technology tracking
- **Emojis** for visual appeal and readability
- **Code blocks** with proper syntax highlighting
- **Structured sections** with clear headings
- **Troubleshooting guide** for common issues
- **Contributing guidelines** for open-source collaboration

The README is optimized for both technical users (developers) and non-technical users (end-users) with appropriate sections for each audience.
