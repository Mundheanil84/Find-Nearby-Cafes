const CafeList = ({ cafes, selectedCafe, onCafeSelect, userLocation }) => {
  const calculateDistance = (cafeLat, cafeLng) => {
    if (!userLocation.latitude || !userLocation.longitude) return null;
    
    const R = 6371; // Earth's radius in km
    const dLat = (cafeLat - userLocation.latitude) * Math.PI / 180;
    const dLng = (cafeLng - userLocation.longitude) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(userLocation.latitude * Math.PI / 180) * 
      Math.cos(cafeLat * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  return (
    <div className="h-full overflow-y-auto">
      <h2 className="text-xl font-bold mb-4 p-4 bg-white border-b">Nearby Cafes ({cafes.length})</h2>
      <div className="space-y-2 p-2">
        {cafes.map(cafe => (
          <div
            key={cafe.id}
            className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedCafe?.id === cafe.id
                ? 'bg-blue-100 border-2 border-blue-500'
                : 'bg-white border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => onCafeSelect(cafe)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">{cafe.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{cafe.address}</p>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="text-sm text-yellow-600">⭐ {cafe.rating}</span>
                  {userLocation.latitude && userLocation.longitude && (
                    <span className="text-sm text-gray-500">
                      {calculateDistance(cafe.latitude, cafe.longitude)} km away
                    </span>
                  )}
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                Open
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Hours: {cafe.hours}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CafeList;