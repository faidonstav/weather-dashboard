import { Sun, CloudRain, CloudLightning, Wind, CloudSun, Snowflake } from "lucide-react";
import React from "react";
import "./WeatherIcon.css"

function WeatherIcon({ type = "cloud", size = 22 }) {
  const props = { size, strokeWidth: 1.7 };
  if (type === "sun") return <Sun {...props} className="weather-icon sun-icon" />;
  if (type === "rain") return <CloudRain {...props} className="weather-icon rain-icon" />;
  if (type === "storm") return <CloudLightning {...props} className="weather-icon storm-icon" />;
  if (type === "wind") return <Wind {...props} className="weather-icon wind-icon" />;
  if (type === "snow") return <Snowflake {...props} className="weather-icon snow-icon" />;
  return <CloudSun {...props} className="weather-icon cloud-icon" />;
}

export default WeatherIcon