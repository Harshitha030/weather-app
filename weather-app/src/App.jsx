import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherCard from "./components/WeatherCard";
import Forecast from "./components/Forecast";
import HourlyForecast from "./components/HourlyForecast";
import TempGraph from "./components/TempGraph";
import {
  getWeather,
  getForecast,
  getWeatherByCoords,
  getAirQuality,
  getUVIndex,
} from "./services/weatherApi";

import "./styles/styles.css";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [uv, setUv] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      setError("");

      let weatherData;
      let forecastData;
      let airData;
      let uvData;

      if (typeof query === "string") {
        // 🔍 City search
        weatherData = await getWeather(query);
        forecastData = await getForecast(query);

        const { lat, lon } = weatherData.coord;

        airData = await getAirQuality(lat, lon);
        uvData = await getUVIndex(lat, lon);

      } else {
        // 📍 Location search
        const { lat, lon } = query;

        weatherData = await getWeatherByCoords(lat, lon);
        forecastData = await getForecast(weatherData.name);

        airData = await getAirQuality(lat, lon);
        uvData = await getUVIndex(lat, lon);
      }

      // ✅ Set all states safely
      setWeather(weatherData);
      setForecast(forecastData);
      setAqi(airData);

      // 🔥 Works for both APIs (old + new)
      setUv(uvData?.value ?? uvData?.current?.uvi ?? null);

    } catch (err) {
      console.error(err);
      setError("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">

      {/* HEADER */}
      <div className="header">
        <div className="logo-title">
          <img src="/clipart2372176.png" alt="logo" className="logo" />
          <h1 className="title">Weather App</h1>
        </div>
      </div>

      {/* MAIN */}
      <div className="app">
        <SearchBar onSearch={handleSearch} />

        {loading && <p className="status">📍 Getting weather...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && weather && (
  <div className="dashboard">

  {/* LEFT COLUMN */}
  <div className="left-column">
    <WeatherCard
      weather={weather}
      aqi={aqi}
      uv={uv}
      forecast={forecast}
    />

    <Forecast data={forecast} />
  </div>

  {/* RIGHT COLUMN */}
  <div className="right-column">

  <div className="graph-card">
    <TempGraph data={forecast} />
  </div>

  <div className="hourly-card">
    <HourlyForecast data={forecast} />
  </div>

</div>

</div>
)}
      </div>
    </div>
  );
}

export default App;