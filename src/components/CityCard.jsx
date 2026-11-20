import React from "react";
import WeatherIcon from "./WeatherIcon";
import './CityCard.css'

function CityCard({ city, onClick }) {
  return (
    <button
      className="city-card"
      onClick={onClick}
      aria-label={`Show weather for ${city.name}, ${city.country}`}
    >
      <div className="city-card-heading">
        <div className="city-name">{city.name}<span>{city.country}</span></div>
        <div className="city-temp">
          {Number.isFinite(city.temp) ? `${Math.round(city.temp)}°` : "—"}
        </div>
      </div>
      <WeatherIcon type={city.type} size={54} />
      <div className="city-range">
        <span><small>High</small><strong>{Number.isFinite(city.high) ? `${Math.round(city.high)}°` : "—"}</strong></span>
        <span><small>Low</small><strong>{Number.isFinite(city.low) ? `${Math.round(city.low)}°` : "—"}</strong></span>
      </div>
    </button>
  );
}

export default CityCard