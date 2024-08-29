import React from 'react';

function SearchBar({ city, setCity, handleSearch }) {
  return (
    <form onSubmit={handleSearch} className="flex justify-center my-6">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
        placeholder="Enter city name"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
