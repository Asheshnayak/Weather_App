import React from 'react';

const WeatherCard = ({ weather }) => {
  const { name, main, weather: weatherDetails } = weather;
  const iconCode = weatherDetails[0].icon;
  const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`; // URL for weather icon

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h2 className="text-3xl font-semibold mb-2 text-center text-gray-800 dark:text-gray-100">{name}</h2>
      <div className="flex items-center justify-center mb-4">
        <img 
          src={iconUrl} 
          alt={weatherDetails[0].description} 
          className="w-24 h-24"
        />
      </div>
      <div className="text-center text-gray-800 dark:text-gray-200 mb-2">
        <span className="text-2xl font-bold">{main.temp}°C</span>
      </div>
      <div className="text-center text-gray-600 dark:text-gray-300">
      {weatherDetails[0].description.charAt(0).toUpperCase() + weatherDetails[0].description.slice(1)}
      </div>
    </div>
  );
};

export default WeatherCard;
