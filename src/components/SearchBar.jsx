import { useState, useRef, useEffect } from 'react';
import { INDIAN_CITIES, DEFAULT_CITY } from '../utils/constants';

const SearchBar = ({ 
  currentCity, 
  onCityChange, 
  onUseCurrentLocation,
  userLocation 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const filtered = Object.keys(INDIAN_CITIES).filter(city =>
      city.toLowerCase().includes(searchQuery.toLowerCase())
    ).slice(0, 5);

    setSuggestions(filtered);
  }, [searchQuery]);

  const handleCitySelect = (city) => {
    onCityChange(city);
    setSearchQuery('');
    setIsOpen(false);
  };

  const handleCurrentLocation = () => {
    onUseCurrentLocation();
    setIsOpen(false);
  };

  const popularCities = ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'];

  return (
    <div ref={searchRef} className="relative">
      <div className="flex space-x-2">
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            placeholder={`Search Indian cities... (Current: ${currentCity})`}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
              {/* Current Location Option */}
              {userLocation.latitude && (
                <button
                  onClick={handleCurrentLocation}
                  className="w-full px-4 py-3 text-left hover:bg-blue-50 flex items-center space-x-2 border-b"
                >
                  <span className="text-blue-600">📍</span>
                  <span className="font-medium">Use Current Location</span>
                </button>
              )}

              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="border-b">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                    SEARCH RESULTS
                  </div>
                  {suggestions.map(city => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>🏙️</span>
                      <span>{city}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Indian Cities */}
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  POPULAR INDIAN CITIES
                </div>
                {popularCities.map(city => (
                  <button
                    key={city}
                    onClick={() => handleCitySelect(city)}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                  >
                    <span>⭐</span>
                    <span>{city}</span>
                  </button>
                ))}
              </div>

              {/* All Indian Cities */}
              <div>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  ALL CITIES
                </div>
                {Object.keys(INDIAN_CITIES)
                  .filter(city => !popularCities.includes(city))
                  .map(city => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <span>🏢</span>
                      <span>{city}</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Current Location Button */}
        <button
          onClick={handleCurrentLocation}
          disabled={!userLocation.latitude}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
          title="Use my current location"
        >
          <span>📍</span>
          <span className="hidden sm:inline">My Location</span>
        </button>
      </div>

      {/* City Badges */}
      <div className="flex flex-wrap gap-2 mt-2">
        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
          Current: {currentCity}
        </span>
        {userLocation.latitude && (
          <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            Location Available
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchBar;