import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ToggleDarkMode from './components/ToggleDarkMode';

const API_KEY = 'e6fe0b430458329d2601f8b6f889b9ba';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
  }, []);

  const fetchWeather = async (e, coords = null, cityName = null) => {
    if (e) e.preventDefault();

    try {
      let url = `https://api.openweathermap.org/data/2.5/weather?appid=${API_KEY}&units=metric`;

      if (coords) {
        url += `&lat=${coords.latitude}&lon=${coords.longitude}`;
      } else {
        url += `&q=${cityName || city}`;
      }

      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
      setWeather(null);
    }
  };

  const fetchWeatherByLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        fetchWeather(null, position.coords);
      }, (error) => {
        console.error('Error getting location', error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  const addFavorite = (cityName) => {
    if (!favorites.includes(cityName)) {
      const updatedFavorites = [...favorites, cityName];
      setFavorites(updatedFavorites);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  };

  const removeFavorite = (cityName) => {
    const updatedFavorites = favorites.filter(fav => fav !== cityName);
    setFavorites(updatedFavorites);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
  };

  const isFavorite = weather ? favorites.includes(weather.name) : false;

  return (
    <div className={darkMode ? "bg-black":"bg-white"}>
      <div className={`min-h-screen dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition duration-300 `}>
        <ToggleDarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
        <button
          onClick={fetchWeatherByLocation}
          className="mb-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Use My Location
        </button>
        <SearchBar city={city} setCity={setCity} handleSearch={fetchWeather} />
        {weather && (
          <WeatherCard
            weather={weather}
            addFavorite={addFavorite}
            removeFavorite={removeFavorite}
            isFavorite={isFavorite}
          />
        )}
        <div className="my-4">
          <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Favorites:</h3>
          <ul className="mt-2">
            {favorites.map(fav => (
              <li key={fav}>
                <button
                  onClick={() => fetchWeather(null, null, fav)}
                  className="text-blue-600 dark:text-blue-300"
                >
                  {fav}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
