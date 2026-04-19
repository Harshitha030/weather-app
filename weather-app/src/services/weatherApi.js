import axios from "axios";

const API_KEY = "04fcb999b3dcc2a98de322ed7d7b08f3";

export const getWeather = async (city) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return res.data;
};
export const getCitySuggestions = async (query) => {
  if (!query) return [];

  const res = await axios.get(
    `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${API_KEY}`
  );

  return res.data;
};
export const getForecast = async (city) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
  );
  return res.data;
};
export const getWeatherByCoords = async (lat, lon) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  );
  return res.data;
};
// 🌍 Air Quality API
export const getAirQuality = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("AQI fetch failed");

  return res.json();
};

export const getUVIndex = async (lat, lon) => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );

  if (!res.ok) throw new Error("UV fetch failed");

  return res.json();
};