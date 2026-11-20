import React, {useEffect, useState } from "react";
import {Menu} from "lucide-react";
import Sidebar from "./components/Sidebar";
import SearchBox from "./components/SearchBox";
import MainWeather from "./components/MainWeather";
import CityMap from "./components/CityMap";
import ForecastPanel from "./components/ForecastPanel";
import Highlights from "./components/Highlights";
import OtherCities from "./components/OtherCities";
import {searchCities, getForecast} from "./api/weather";


export default function App() {

  const [active, setActive] = useState("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState({
    name: "New York",
    country: "United States",
    latitude: 40.7128,
    longitude: -74.0060,
  });

  const [weather, setWeather] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [searchLoading, setSearchLoading] = useState(false);


  useEffect(() => {
    if (!selectedCity) return;

    let cancelled = false;

    async function fetchWeather() {

      setLoading(true);
      setError(null);
      setWeather(null);

      try {

        const data = await getForecast(
          selectedCity.latitude,
          selectedCity.longitude
        );

        if (!cancelled) {
          setWeather(data);
        }

      } catch (err) {

        if (!cancelled) {
          setError("Unable to load weather data.");
          console.error(err);
        }

      } finally {

        if (!cancelled) {
          setLoading(false);
        }

      }
    }

    fetchWeather();

    return () => {
      cancelled = true;
    };

  }, [selectedCity]);



  const handleSearch = async (name) => {
    const query = name.trim();
    if (!query) return;

    setSearch(query);
    setSearchLoading(true);
    setError(null);

    try {
      const city = await searchCities(query);

      if (!city || Array.isArray(city)) {
        setError(`No city found for "${query}".`);
        return;
      }

      setSelectedCity({
        name: city.name,
        country: city.country,
        latitude: city.latitude,
        longitude: city.longitude,
      });
    } catch (err) {
      setError("Unable to find that city. Please try again.");
      console.error(err);
    } finally {
      setSearchLoading(false);
    }
  };

  const handleSelectCity = (city) => {
    setSelectedCity({
      name: city.name,
      country: city.country,
      latitude: city.latitude,
      longitude: city.longitude,
    });
    setSearch("");
    setError(null);
  };


  return (
    <main className="app-shell">
      <Sidebar active={active} setActive={setActive} open={menuOpen} close={() => setMenuOpen(false)} />
      <div className="workspace">
        <header className="topbar">
          <button className="mobile-menu" aria-label="Open navigation" onClick={() => setMenuOpen(true)}><Menu size={20} /></button>
          <SearchBox
            value={search}
            onChange={setSearch}
            onSearch={handleSearch}
            loading={searchLoading}
          />
        </header>
        
        {error && (
          <p className="error-message">
            {error}
          </p>
        )}

        {loading && (
          <p className="loading-message">
            Loading weather for {selectedCity.name}...
          </p>
        )}
        
        <div className="dashboard-grid">
          <div className="left-column">
            <MainWeather city={selectedCity} weather={weather} />
            <CityMap city={selectedCity} />
          </div>
          <div className="right-column">
            <Highlights weather={weather} />
            <ForecastPanel weather={weather} loading={loading} />
            <OtherCities query={search} onSelectCity={handleSelectCity} />
          </div>
        </div>
        <footer className="dashboard-footer"><span>WEATHER APP</span><span>Weather data preview · Local time</span></footer>
      </div>
    </main>
  );
}