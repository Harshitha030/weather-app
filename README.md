# 🌦️ Weather Dashboard App

A modern and responsive **Weather Application** built with **React.js** that provides real-time weather updates, forecasts, and environmental insights like AQI and UV Index.

---

## ✨ Features

### 🌍 Core

* Search weather by city
* Get weather using current location
* Real-time temperature display
* Weather condition icons

### 📊 Forecast & Data

* 📈 Temperature trend graph
* 🕒 Hourly forecast (next 24 hours)
* 📅 5-day daily forecast
* 🌅 Sunrise & Sunset timings (12-hour format)
* 🌧️ Rain probability

### 🌫️ Environmental Info

* 💨 Wind speed & direction
* 💧 Humidity
* 🌫️ Air Quality Index (AQI)
* ☀️ UV Index

### 🎨 UI/UX

* Glassmorphism design
* Gradient background
* Fully responsive (mobile + desktop)
* Smooth hover effects

---

## 🛠️ Tech Stack

* ⚛️ React.js
* 📊 Recharts (for graphs)
* 🌐 OpenWeather API
* 🎨 CSS
* 🔣 React Icons

---

## 📦 Installation

```bash
# Clone repository
git clone https://github.com/your-username/weather-app.git

# Navigate to project
cd weather-app

# Install dependencies
npm install

# Start development server
npm start
```

---

## 🔐 Environment Variables

Create a `.env` file in root:

```env
REACT_APP_API_KEY=your_api_key_here
```

⚠️ Do not commit `.env` to GitHub

---

## 🌐 Deployment

### Netlify

* Build command: `npm run build`
* Publish directory: `build`

### Vercel

* Import GitHub repo
* Add environment variable
* Deploy

---

## 📁 Folder Structure

```
src/
 ├── components/
 │    ├── WeatherCard.jsx
 │    ├── HourlyForecast.jsx
 │    ├── Forecast.jsx
 │    ├── TempGraph.jsx
 │    └── SearchBar.jsx
 │
 ├── services/
 │    └── weatherApi.js
 │
 ├── styles/
 │    └── styles.css
 │
 ├── App.jsx
 └── index.js
```

---

## 📸 Screenshots

*Add screenshots of your UI here*
<img width="1789" height="823" alt="Screenshot 2026-04-19 230620" src="https://github.com/user-attachments/assets/d03dac50-805d-4100-9c97-3d46e67f502e" />
<img width="1514" height="814" alt="Screenshot 2026-04-19 230645" src="https://github.com/user-attachments/assets/65e054cd-2869-4a18-8ff5-b1895b51e2ac" />
<img width="1534" height="822" alt="Screenshot 2026-04-19 230656" src="https://github.com/user-attachments/assets/f88eff08-ddd0-4b3f-8077-af9b26f0e935" />

---

## 🧠 Future Improvements

* 🌧️ Animated weather effects
* 🗺️ Weather map integration
* ⭐ Favorite cities
* 🔔 Weather alerts
* 🎤 Voice search

---

## 🙌 Acknowledgements

* OpenWeather API
* Recharts
* React Icons

---

## 👩‍💻 Author

Harshitha Chundru
