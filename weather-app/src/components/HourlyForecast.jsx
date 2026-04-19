import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";
import "../styles/styles.css";

const getIcon = (condition) => {
  if (condition === "Clear") return <WiDaySunny />;
  if (condition === "Clouds") return <WiCloud />;
  if (condition === "Rain") return <WiRain />;
  return <WiCloud />;
};

const formatHour = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

const HourlyForecast = ({ data }) => {
  if (!data) return null;

  const hourly = data.list.slice(0, 8); // next 24 hrs

  return (
    <div className="hourly-container">
      {hourly.map((item, index) => (
        <div key={index} className="hour-card">
          <p className="hour-time">{formatHour(item.dt)}</p>

          <div className="hour-icon">
            {getIcon(item.weather[0].main)}
          </div>

          <p className="hour-temp">
            {Math.round(item.main.temp)}°C
          </p>
        </div>
      ))}
    </div>
  );
};

export default HourlyForecast;