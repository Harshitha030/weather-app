import "../styles/styles.css";
import {
  WiDaySunny,
  WiCloud,
  WiRain,
  WiHumidity,
  WiStrongWind,
  WiSunrise,
  WiSunset, WiRainMix, 
} from "react-icons/wi";
import { FiClock } from "react-icons/fi";

// Weather Icon
const getIcon = (condition) => {
  if (condition === "Clear") return <WiDaySunny className="icon" />;
  if (condition === "Clouds") return <WiCloud className="icon" />;
  if (condition === "Rain") return <WiRain className="icon" />;
  return <WiCloud className="icon" />;
};

// Time format
const formatTime = (timestamp, timezone) => {
  const date = new Date((timestamp + timezone) * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC"
  });
};

const formatCityTime = (timezone) => {
  if (timezone === undefined) return "--";

  const now = new Date();

  const utc = now.getTime() + now.getTimezoneOffset() * 60000;

  const cityTime = new Date(utc + timezone * 1000);

  return cityTime.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getWindDirection = (deg) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(deg / 45) % 8];
};

const getAQILabel = (value) => {
  switch (value) {
    case 1: return "Good 😊";
    case 2: return "Fair 🙂";
    case 3: return "Moderate 😐";
    case 4: return "Poor 😷";
    case 5: return "Very Poor ☠️";
    default: return "Unknown";
  }
};

const getUVLabel = (uv) => {
  if (uv <= 2) return "Low 🟢";
  if (uv <= 5) return "Moderate 🟡";
  if (uv <= 7) return "High 🟠";
  if (uv <= 10) return "Very High 🔴";
  return "Extreme ☠️";
};

const getAQIColor = (value) => {
  return ["#c9dfc9", "#9cff00", "#ffff00", "#ff7e00", "#ff0000"][value - 1];
};



const WeatherCard = ({ weather, aqi, uv, forecast }) => {
  if (!weather) return null;

const rainChance =
  forecast?.list?.length > 0
    ? Math.round(forecast.list[0].pop * 100)
    : 0;

  return (
    <div className="card">
      {getIcon(weather.weather[0].main)}

      {/* CITY */}
      <h2 className="city">
        {weather.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")}, {weather.sys.country}
      </h2>

      <p className="city-time">
    <FiClock className="clock-icon" />
      {formatCityTime(weather.timezone)}
      </p>

      {/* TEMP */}
      <p className="temp">{Math.round(weather.main.temp)}°C</p>

      {/* DESC */}
      <p className="desc">{weather.weather[0].description}</p>

      {/* DETAILS */}
      <div className="details">
        {/* HUMIDITY */}
        <div className="detail-box">
          <span className="label">Humidity</span>
          <span className="value">
            <WiHumidity className="detail-icon" />
            {weather.main.humidity}%
          </span>
        </div>

        {/* WIND */}
        <div className="detail-box">
          <span className="label">Wind</span>
          <span className="value">
            <WiStrongWind
              className="detail-icon"
              style={{ transform: `rotate(${weather.wind.deg}deg)` }}
            />
            {weather.wind.speed} m/s {getWindDirection(weather.wind.deg)}
          </span>
        </div>

        {/* 🌍 AQI */}
        {aqi && aqi.list && (
          <div className="detail-box">
            <span className="label">Air Quality</span>
            <span
              className="value"
              style={{
                color: getAQIColor(aqi.list[0].main.aqi),
                fontWeight: "600",
              }}
            >
              {getAQILabel(aqi.list[0].main.aqi)}
            </span>
          </div>
        )}
      </div>

      {/* SUN TIMES */}
      <div className="sun-times">
        <div className="sun-box">
          <WiSunrise className="sun-icon" />
          <p className="sun-label">Sunrise</p>
          <p className="sun-time">{formatTime(weather.sys.sunrise, weather.timezone)}</p>
        </div>

        <div className="sun-box">
          <WiSunset className="sun-icon" />
          <p className="sun-label">Sunset</p>
          <p className="sun-time">{formatTime(weather.sys.sunset, weather.timezone)}</p>
        </div>

      </div>
      <div className="extra-details">
  
  <div className="detail-box">
    <span className="label">Rain Chance</span>
    <span className="value"> <WiRainMix className="detail-icon" />{rainChance}%</span>
  </div>

  <div className="detail-box">
    <span className="label">UV Index</span>
    <span className="value">
      {uv !== null && uv !== undefined
        ? `${uv} (${getUVLabel(uv)})`
        : "--"}
    </span>
  </div>

</div>
    </div>
  );
};

export default WeatherCard;