import { useState, useEffect, useRef } from "react";
import { getCitySuggestions } from "../services/weatherApi";
import { FiMapPin, FiSearch } from "react-icons/fi";
import "../styles/styles.css";

const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [isSelecting, setIsSelecting] = useState(false);

  const [recent, setRecent] = useState(
    JSON.parse(localStorage.getItem("recentCities")) || []
  );

  const timeoutRef = useRef(null); // ✅ FIX debounce

  // ✅ Save recent
  const saveRecent = (city) => {
    let updated = [city, ...recent.filter((c) => c !== city)];
    updated = updated.slice(0, 5);

    setRecent(updated);
    localStorage.setItem("recentCities", JSON.stringify(updated));
  };

  // ✅ Clear recent
  const clearRecent = () => {
    setRecent([]);
    localStorage.removeItem("recentCities");
  };

  // ✅ Handle typing (debounce + India priority)
  const handleChange = (e) => {
    const value = e.target.value;
    setCity(value);
    setActiveIndex(-1);

    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (value.length > 2) {
        const data = await getCitySuggestions(value);

        const india = data.filter((c) => c.country === "IN");
        const others = data.filter((c) => c.country !== "IN");

        setSuggestions([...india, ...others]);
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  // ✅ Select suggestion
  const handleSelect = (place) => {
    const selectedCity = place.name;

    setIsSelecting(true);
    setCity(selectedCity);
    setSuggestions([]);
    setActiveIndex(-1);

    saveRecent(selectedCity);
    onSearch(selectedCity);
  };

  // ✅ Keyboard navigation
  const handleKeyDown = (e) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
    }

    if (e.key === "Enter") {
      e.preventDefault();

      if (activeIndex >= 0) {
        handleSelect(suggestions[activeIndex]);
      } else {
        onSearch(city);
        saveRecent(city);
        setSuggestions([]);
      }
    }
  };

  // ✅ Prevent suggestions reappearing
  useEffect(() => {
    if (isSelecting) {
      setIsSelecting(false);
    }
  }, [city]);

  return (
    <div className="search-container">
      {/* 🔍 SEARCH ROW */}
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={() => setTimeout(() => setSuggestions([]), 200)}
          placeholder="Search city..."
          className="search-input"
        />

        <button
          type="button"
          className="search-btn"
          onClick={() => {
            onSearch(city);
            saveRecent(city);
            setSuggestions([]);
          }}
        >
          <FiSearch className="search-icon" />

        </button>

        {/* 📍 LOCATION BUTTON (FIXED POSITION) */}
        <button
          type="button"
          className="location-btn"
          title="Use my location"
          onClick={() => {
            if (!navigator.geolocation) {
              alert("Geolocation not supported");
              return;
            }

            navigator.geolocation.getCurrentPosition(
              (pos) => {
                onSearch({
                  lat: pos.coords.latitude,
                  lon: pos.coords.longitude,
                });
              },
              () => alert("Location permission denied")
            );
          }}
        >
          <FiMapPin className="btn-icon" />Use My Location
        </button>
      </form>

      {/* 🔍 Suggestions */}
      {suggestions.length > 0 && (
        <div className="suggestions">
          {suggestions.map((place, index) => (
            <div
              key={index}
              className={`suggestion-item ${
                index === activeIndex ? "active"
                  : ""
              }`}
              onClick={() => handleSelect(place)}
            >
              {place.name}, {place.country}
            </div>
          ))}
        </div>
      )}

      {/* 🕒 Recent Searches */}
      {recent.length > 0 && (
        <div className="recent">
          <div className="recent-header">
            <p className="recent-title">Recent</p>
            <button className="clear-btn" onClick={clearRecent}>
              Clear
            </button>
          </div>

          <div className="recent-list">
            {recent.map((item, index) => (
              <span
                key={index}
                className="recent-item"
                onClick={() => {
                  setCity(item);
                  onSearch(item);
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;