import { useState, useEffect } from 'react';
import Map from './components/Map';
import CafeList from './components/CafeList';
import SearchBar from './components/SearchBar';
import LoadingSpinner from './components/LoadingSpinner';
import { useGeolocation } from './hooks/useGeolocation';
import { parseCafeData } from './utils/cafeData';
import { INDIAN_CITIES, DEFAULT_CITY } from './utils/constants';

function App() {
  const [cafes, setCafes] = useState([]);
  const [filteredCafes, setFilteredCafes] = useState([]);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [currentCity, setCurrentCity] = useState(DEFAULT_CITY);
  const [mapCenter, setMapCenter] = useState(INDIAN_CITIES[DEFAULT_CITY]);
  const [loadingCafes, setLoadingCafes] = useState(true);
  
  const userLocation = useGeolocation();

  useEffect(() => {
    const fetchCafes = async () => {
      try {
        const response = await fetch('/cafes.json');
        const data = await response.json();
        const parsedCafes = parseCafeData(data);
        setCafes(parsedCafes);
        filterCafesByCity(parsedCafes, currentCity);
      } catch (error) {
        console.error('Error loading cafe data:', error);
      } finally {
        setLoadingCafes(false);
      }
    };

    fetchCafes();
  }, []);

  const filterCafesByCity = (cafeList, city) => {
    const filtered = cafeList.filter(cafe => 
      cafe.city.toLowerCase() === city.toLowerCase()
    );
    setFilteredCafes(filtered);
  };

  const handleCityChange = (city) => {
    if (INDIAN_CITIES[city]) {
      setCurrentCity(city);
      setMapCenter(INDIAN_CITIES[city]);
      filterCafesByCity(cafes, city);
      setSelectedCafe(null);
    }
  };

  const handleUseCurrentLocation = () => {
    if (userLocation.latitude && userLocation.longitude) {
      setMapCenter({
        lat: userLocation.latitude,
        lng: userLocation.longitude
      });
      setCurrentCity('Current Location');
      // Show all cafes when using current location
      setFilteredCafes(cafes);
      setSelectedCafe(null);
    }
  };

  const handleCafeSelect = (cafe) => {
    setSelectedCafe(cafe);
  };

  if (userLocation.loading || loadingCafes) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner />
          <p className="mt-4 text-gray-600">
            {userLocation.loading ? 'Getting your location...' : 'Loading Indian cafes...'}
          </p>
          {userLocation.error && (
            <p className="mt-2 text-red-600">Error: {userLocation.error}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-4 lg:mb-0">
              <h1 className="text-2xl font-bold text-gray-800">☕ Find Cafes in India</h1>
              <p className="text-gray-600">Discover great coffee and chai spots across Indian cities</p>
            </div>
            <div className="w-full lg:w-96">
              <SearchBar
                currentCity={currentCity}
                onCityChange={handleCityChange}
                onUseCurrentLocation={handleUseCurrentLocation}
                userLocation={userLocation}
              />
            </div>
          </div>
        </div>
      </header>
      
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Cafe List Sidebar */}
        <div className="w-full md:w-96 h-64 md:h-full border-r bg-gray-50">
          <div className="p-4 bg-white border-b">
            <h2 className="text-lg font-semibold text-gray-800">
              Cafes in {currentCity} 
              <span className="text-sm text-gray-600 ml-2">
                ({filteredCafes.length} found)
              </span>
            </h2>
          </div>
          <CafeList
            cafes={filteredCafes}
            selectedCafe={selectedCafe}
            onCafeSelect={handleCafeSelect}
            userLocation={userLocation}
            currentCity={currentCity}
          />
        </div>
        
        {/* Map */}
        <div className="flex-1 h-full">
          <Map
            userLocation={userLocation}
            cafes={filteredCafes}
            selectedCafe={selectedCafe}
            onCafeSelect={handleCafeSelect}
            mapCenter={mapCenter}
            currentCity={currentCity}
          />
        </div>
      </div>
    </div>
  );
}

export default App;