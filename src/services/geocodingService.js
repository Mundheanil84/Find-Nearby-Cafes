import { INDIAN_CITIES } from '../utils/constants';

export class GeocodingService {
  static async searchCity(query) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const normalizedQuery = query.toLowerCase().trim();
    
    // Search in predefined Indian cities
    const matches = Object.keys(INDIAN_CITIES).filter(city => 
      city.toLowerCase().includes(normalizedQuery)
    );
    
    return matches.map(city => ({
      name: city,
      ...INDIAN_CITIES[city]
    }));
  }

  static async getCityCoordinates(cityName) {
    if (INDIAN_CITIES[cityName]) {
      return INDIAN_CITIES[cityName];
    }
    
    // Fallback: try to find by case-insensitive match
    const cityKey = Object.keys(INDIAN_CITIES).find(
      city => city.toLowerCase() === cityName.toLowerCase()
    );
    
    if (cityKey) {
      return INDIAN_CITIES[cityKey];
    }
    
    throw new Error(`City "${cityName}" not found in our database`);
  }
}