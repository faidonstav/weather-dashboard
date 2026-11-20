import { useEffect, useMemo, useState } from "react";
import CityCard from "./CityCard";
import { ArrowUpRight} from "lucide-react";
import React from "react";
import { getForecast } from "../api/weather";
import { getWeatherInfo } from "../utils/weatherCodes";
import "./OtherCities.css"

const cities = [
  { name: "Islamabad", country: "Pakistan", latitude: 33.6844, longitude: 73.0479 },
  { name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708 },
  { name: "Chengdu", country: "China", latitude: 30.5728, longitude: 104.0668 },
  { name: "Montreal", country: "Canada", latitude: 45.5019, longitude: -73.5674 },
];


function OtherCities({ query, onSelectCity }) {
  const [weatherByCity, setWeatherByCity] = useState({});
  const [loading, setLoading] = useState(true);
  const [hasWeatherError, setHasWeatherError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchCityWeather() {
      const results = await Promise.allSettled(
        cities.map(city => getForecast(city.latitude, city.longitude))
      );

      if (cancelled) return;

      const nextWeatherByCity = {};
      results.forEach((result, index) => {
        if (result.status === "fulfilled") {
          nextWeatherByCity[cities[index].name] = result.value;
        } else {
          console.error(`Unable to load weather for ${cities[index].name}.`, result.reason);
        }
      });

      setWeatherByCity(nextWeatherByCity);
      setHasWeatherError(results.some(result => result.status === "rejected"));
      setLoading(false);
    }

    fetchCityWeather();

    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => cities.filter(c => `${c.name} ${c.country}`.toLowerCase().includes(query.toLowerCase())), [query]);

  return (
    <section className="other-cities">
      <div className="section-heading"><h2>Other cities</h2></div>
      {loading && <p className="city-weather-message">Loading city weather...</p>}
      {hasWeatherError && <p className="city-weather-message" role="status">Some city weather data could not be loaded.</p>}
      <div className="city-grid">
        {filtered.map(city => {
          const forecast = weatherByCity[city.name];
          const current = forecast?.current;
          const daily = forecast?.daily;
          const cardCity = {
            ...city,
            temp: current?.temperature_2m,
            high: daily?.temperature_2m_max?.[0],
            low: daily?.temperature_2m_min?.[0],
            type: current ? getWeatherInfo(current.weather_code).icon : "cloud",
          };

          return (
            <CityCard
              city={cardCity}
              key={city.name}
              onClick={() => onSelectCity(city)}
            />
          );
        })}
        {filtered.length === 0 && <p className="empty-state">No matching cities. Try another search.</p>}
      </div>
    </section>
  );
}

export default OtherCities