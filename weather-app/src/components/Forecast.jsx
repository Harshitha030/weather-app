import "../styles/styles.css";
import { WiDaySunny, WiCloud, WiRain } from "react-icons/wi";

const getIcon = (condition) => {
  if (condition === "Clear") return <WiDaySunny />;
  if (condition === "Clouds") return <WiCloud />;
  if (condition === "Rain") return <WiRain />;
  return <WiCloud />;
};

const Forecast = ({ data }) => {
  if (!data) return null;

  // 👉 Group data by day
  const dailyData = {};

  data.list.forEach((item) => {
    const date = new Date(item.dt_txt);
    const dayKey = date.toDateString();

    if (!dailyData[dayKey]) {
      dailyData[dayKey] = {
        temps: [],
        condition: item.weather[0].main,
        date: date,
      };
    }

    dailyData[dayKey].temps.push(item.main.temp);
  });

  // 👉 Convert to array & limit 7 days
  const result = Object.values(dailyData).slice(0, 7);

  return (
    <div className="forecast">
      {result.map((day, index) => {
        const max = Math.max(...day.temps);
        const min = Math.min(...day.temps);

        const dayName = day.date.toLocaleDateString("en-US", {
          weekday: "short",
        });

        return (
          <div key={index} className="forecast-card daily">

            <p className="day">{dayName}</p>

            <div className="icon-small">
              {getIcon(day.condition)}
            </div>

            <p className="temp-range">
              {Math.round(max)}°
              <span className="min">{Math.round(min)}°</span>
            </p>

          </div>
        );
      })}
    </div>
  );
};

export default Forecast;