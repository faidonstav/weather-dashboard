import React from "react";
import {MapPin} from "lucide-react";
import { getWeatherInfo } from "../utils/weatherCodes";
import WeatherIcon from "./WeatherIcon";
import "./MainWeather.css"

const rounded = (value) => (value == null ? "–" : Math.round(value));

function MainWeather({ city, weather }) {
    if(!weather) return null;

    const current = weather.current;
    const today = weather.daily;

    const condition = getWeatherInfo(current.weather_code);
  const localTime = current ? new Date(current.time) : null;

    return (

    <section className="main-weather panel" aria-busy={!weather}>
      <div className="main-weather__top">
        <span className="location-pill">
          <MapPin size={14} fill="currentColor" />
          <span>
            {city.name}, {city.country}
          </span>
        </span>

        <time className="main-weather__date" dateTime={current?.time}>
          {localTime ? (
            <>
              <strong>{localTime.toLocaleDateString("en-US", { weekday: "long" })}</strong>
              <span>
                {localTime.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}
              </span>
              <span>{localTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</span>
            </>
          ) : (
            "–"
          )}
        </time>
      </div>

      <div className="main-weather__hero">
        <div className="main-weather__now">
          <div className="main-weather__icon">
            {condition && <WeatherIcon type={condition.icon} size={72} />}
          </div>
          <div>
            <p className="main-weather__temp">
              {current.temperature_2m}
              <span>°C</span>
            </p>
            <p className="main-weather__condition">{condition.label ?? "Loading"}</p>
          </div>
        </div>

        <dl className="main-weather__stats">
          <div>
            <dt>High</dt>
            <dd>{today.temperature_2m_max[0]}°</dd>
          </div>
          <div>
            <dt>Low</dt>
            <dd>{today.temperature_2m_min[0]}°</dd>
          </div>
          <div>
            <dt>Feels like</dt>
            <dd>{current.apparent_temperature}°</dd>
          </div>
        </dl>
      </div>
    </section>

  );
}

export default MainWeather