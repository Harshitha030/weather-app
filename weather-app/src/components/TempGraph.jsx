import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const formatHour = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    hour12: true,
  });
};

const TempGraph = ({ data }) => {
  if (!data || !data.list) return null;

  // take next 8 points (24 hrs)
  const chartData = data.list.slice(0, 8).map((item) => ({
    time: formatHour(item.dt),
    temp: Math.round(item.main.temp),
  }));

  return (
    <div className="graph-container">
      <h3 className="graph-title">Temperature Trend</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={chartData}>
          <XAxis dataKey="time" stroke="#ccc" />
          <YAxis stroke="#ccc" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="temp"
            stroke="#4facfe"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TempGraph;