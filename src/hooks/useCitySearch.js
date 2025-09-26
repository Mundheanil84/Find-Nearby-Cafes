import { useState, useCallback } from 'react';
import { GeocodingService } from '../services/geocodingService';

export const useCitySearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState(null);

  const searchCities = useCallback(async (query) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setError(null);
      return;
    }

    setSearching(true);
    setError(null);

    try {
      const results = await GeocodingService.searchCity(query);
      setSearchResults(results);
    } catch (err) {
      setError(err.message);
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }, []);

  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setError(null);
    setSearching(false);
  }, []);

  return {
    searchResults,
    searching,
    error,
    searchCities,
    clearSearch
  };
};