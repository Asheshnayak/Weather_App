import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import ToggleDarkMode from './components/ToggleDarkMode';

const API_KEY = 'e6fe0b430458329d2601f8b6f889b9ba';

function App() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const fetchWeather = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
      setWeather(null);
    }
  };

  return (
    <div className={darkMode ? "bg-black":"bg-white"}>
      <div className={`min-h-screen dark:bg-gray-900 flex flex-col items-center justify-center p-4 transition duration-300 `}>
        <ToggleDarkMode darkMode={darkMode} setDarkMode={setDarkMode} />
        <SearchBar city={city} setCity={setCity} handleSearch={fetchWeather} />
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
}

export default App;
