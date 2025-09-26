import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const cafeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const cityIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Component to handle map panning
const MapController = ({ center, cafe, zoom }) => {
  const map = useMap();

  useEffect(() => {
    if (cafe) {
      map.setView([cafe.latitude, cafe.longitude], 16);
    } else if (center.lat && center.lng) {
      map.setView([center.lat, center.lng], zoom || 13);
    }
  }, [center, cafe, zoom, map]);

  return null;
};

const Map = ({ userLocation, cafes, selectedCafe, onCafeSelect, mapCenter, currentCity }) => {
  const mapRef = useRef();

  const getMapCenter = () => {
    if (mapCenter) return [mapCenter.lat, mapCenter.lng];
    if (userLocation.latitude && userLocation.longitude) {
      return [userLocation.latitude, userLocation.longitude];
    }
    return [20.5937, 78.9629]; // Default to India center
  };

  return (
    <div className="h-full w-full relative">
      <div className="absolute top-4 left-4 z-[1000] bg-white px-3 py-2 rounded-lg shadow-md">
        <span className="text-sm font-medium text-gray-700">
          Viewing: {currentCity}
        </span>
      </div>
      
      <MapContainer
        ref={mapRef}
        center={getMapCenter()}
        zoom={13}
        className="h-full w-full"
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapController center={mapCenter} cafe={selectedCafe} zoom={13} />
        
        {/* User location marker */}
        {userLocation.latitude && userLocation.longitude && (
          <Marker 
            position={[userLocation.latitude, userLocation.longitude]}
            icon={userIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-blue-600">Your Location</h3>
                <p className="text-sm text-gray-600">You are here!</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* City center marker when not using current location */}
        {mapCenter && currentCity !== 'Current Location' && (
          <Marker 
            position={[mapCenter.lat, mapCenter.lng]}
            icon={cityIcon}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-red-600">{currentCity} Center</h3>
                <p className="text-sm text-gray-600">City center point</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Cafe markers */}
        {cafes.map(cafe => (
          <Marker
            key={cafe.id}
            position={[cafe.latitude, cafe.longitude]}
            icon={cafeIcon}
            eventHandlers={{
              click: () => onCafeSelect(cafe),
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg text-green-700">{cafe.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{cafe.address}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm text-yellow-600">⭐ {cafe.rating}</span>
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                    {cafe.type}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  <span className="font-medium">Specialty:</span> {cafe.specialty}
                </p>
                <p className="text-xs text-gray-400 mt-1">Hours: {cafe.hours}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;