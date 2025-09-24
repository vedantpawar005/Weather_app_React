import { useState } from "react";

function Weatherapp() {
  const [city, setCity] = useState("");
  const [forecast, setForecast] = useState([]);
  const [currentWeather, setCurrentWeather] = useState(null); // 🌡️ new state
  const [darkMode, setDarkMode] = useState(false);

  async function getForecast() {
    try {
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=64692fc86a6f990bd9151c6ba77b4d45`;
      const res = await fetch(geoUrl);
      const geoData = await res.json();

      if (geoData.length === 0) {
        setForecast([]);
        setCurrentWeather(null);
        return;
      }

      const { lat, lon } = geoData[0];

      // 🌡️ Get current weather
      const currentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=64692fc86a6f990bd9151c6ba77b4d45&units=metric`;
      const resCurrent = await fetch(currentUrl);
      const currentData = await resCurrent.json();
      setCurrentWeather(currentData);

      // 📅 Get forecast
      const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=64692fc86a6f990bd9151c6ba77b4d45&units=metric`;
      const res2 = await fetch(forecastUrl);
      const data = await res2.json();

      setForecast(data.list.slice(0, 6));
    } catch (e) {
      console.error(e);
      setForecast([]);
      setCurrentWeather(null);
    }
  }

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center pt-6 transition-colors duration-300 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      {/* 🌙 Theme Toggle Button */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 left-4 px-3 py-2 rounded-md border cursor-pointer
                   bg-gray-200 text-black hover:bg-gray-300
                   dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
      >
        {darkMode ? "☀️ Light" : "🌙 Dark"}
      </button>

      <h1 className="text-6xl font-bold mb-10">Weather App</h1>

      {/* 🔍 Search Bar */}
      <div className="flex gap-2">
        <input
          placeholder="Enter City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border rounded-lg px-3 py-2 w-64 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={getForecast}
          className="bg-gray-500 text-white p-2 rounded-lg hover:bg-gray-600 flex items-center justify-center cursor-pointer"
        >
          <img
            src="https://img.icons8.com/ios-filled/24/ffffff/search--v1.png"
            alt="Search"
            className="w-5 h-5"
          />
        </button>
      </div>

      {/* 🌡️ Current Weather */}
      {currentWeather && (
        <div
          className={`mt-10 p-6 rounded-2xl shadow-lg flex flex-col items-center text-center ${
            darkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
          }`}
        >
          <h2 className="text-base mb-3">{new Date().toLocaleTimeString([],
                {hour: "2-digit",
                minute: "2-digit",})}</h2>
          <img
            alt="weather icon"
            src={`https://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            className="w-20 h-20"
          />
          <p className="text-2xl font-bold mt-2">
            {Math.round(currentWeather.main.temp)}°C
          </p>
          <p className="capitalize text-lg mt-1">
            {currentWeather.weather[0].description}
          </p>
        </div>
      )}

      {/* 📅 Forecast cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-4 mt-12">
        {forecast.map((f, i) => (
          <div
            key={i}
            className={`p-6 w-48 h-64 border rounded-2xl shadow-lg flex flex-col items-center transition-colors duration-300 ${
              darkMode ? "bg-gray-800 text-white" : "bg-white text-black"
            }`}
          >
            <p className="text-base mb-3">
              {new Date(f.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <img
              alt="icon"
              src={`https://openweathermap.org/img/wn/${f.weather[0].icon}@2x.png`}
              className="w-20 h-20"
            />
            <p className="mt-3 font-semibold text-xl">
              {Math.round(f.main.temp)}°C
            </p>
            <p className="text-base capitalize mt-1">
              {f.weather[0].description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weatherapp;
