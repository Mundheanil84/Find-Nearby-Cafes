export const parseCafeData = (data) => {
  if (!data || !data.cafes) {
    throw new Error('Invalid cafe data structure');
  }

  return data.cafes.map(cafe => ({
    id: cafe.id,
    name: cafe.name,
    latitude: parseFloat(cafe.latitude),
    longitude: parseFloat(cafe.longitude),
    address: cafe.address || '',
    rating: cafe.rating || 0,
    hours: cafe.hours || ''
  }));
};

// Test function for the cafe data parser
export const testParseCafeData = () => {
  const testData = {
    cafes: [
      {
        id: 1,
        name: "Test Cafe",
        latitude: "40.7589",
        longitude: "-73.9851",
        address: "123 Test St",
        rating: 4.5,
        hours: "9-5"
      }
    ]
  };

  try {
    const result = parseCafeData(testData);
    return result.length === 1 && 
           result[0].name === "Test Cafe" && 
           typeof result[0].latitude === 'number';
  } catch (error) {
    return false;
  }
};