import WeatherIcon from "./WeatherIcon";
import React from "react";
import { getWeatherInfo } from "../utils/weatherCodes";
import "./ForecastPanel.css"

function ForecastPanel({ weather, loading }) {
  const daily = weather?.daily;

  return (
    <section className="forecast-panel panel">
      <div className="daily-forecast">
        <div className="section-heading">
          <h3>7-day forecast</h3>
        </div>
        {daily?.time?.length ? (
          <div className="daily-list">
            {daily.time.map((date, index) => {
              const label = index === 0
                ? "Today"
                : new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
                    weekday: "short",
                    timeZone: "UTC",
                  });
              const condition = getWeatherInfo(daily.weather_code[index]);
              const high = Math.round(daily.temperature_2m_max[index]);
              const low = Math.round(daily.temperature_2m_min[index]);

              return (
                <div
                  className="daily-card"
                  key={date}
                  role="group"
                  aria-label={`${label}: high ${high} degrees, low ${low} degrees`}
                >
                  <span>{label}</span>
                  <WeatherIcon type={condition.icon} size={18} />
                  <strong><span>H</span> {high}°</strong>
                  <small><span>L</span> {low}°</small>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="forecast-empty">
            {loading ? "Loading daily forecast..." : "Daily forecast is unavailable."}
          </p>
        )}
      </div>
    </section>
  );
}

export default ForecastPanel