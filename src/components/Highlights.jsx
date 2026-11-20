import HighlightCard from "./HighlightCard";
import RainChart from "./RainChart";
import WindBars from "./WindBars";
import { Droplets, Cloud, Wind } from "lucide-react";
import React from "react";
import "./Highlights.css"

function Highlights({ weather }) {
  const current = weather?.current;
  const daily = weather?.daily;
  const windSpeed = current?.wind_speed_10m;
  const humidity = current?.relative_humidity_2m;
  const windUnit = weather?.current_units?.wind_speed_10m ?? "km/h";

  return (
    <section className="highlights">
      <h2>Today Highlight</h2>
      <div className="highlight-grid">
        <HighlightCard title="Chance of Rain">
          <RainChart
            probability={daily?.precipitation_probability_max?.[0]}
            amount={daily?.precipitation_sum?.[0]}
          />
        </HighlightCard>
        <HighlightCard title="Wind Status" icon={Wind}>
          <WindBars />
          <div className="highlight-bottom">
            <strong>{Number.isFinite(windSpeed) ? windSpeed.toFixed(1) : "--"} <small>{windUnit}</small></strong>
          </div>
        </HighlightCard>
        <HighlightCard title="Humidity" icon={Droplets} className="humidity-card">
          <div className="humidity-art">
            <Cloud size={38} fill="#829eae" stroke="#829eae" />
            <Droplets size={18} className="humidity-drop" />
          </div>
          <div className="humidity-reading">
            <strong>{Number.isFinite(humidity) ? Math.round(humidity) : "--"}<small>%</small></strong>
            <span>Relative humidity</span>
          </div>
        </HighlightCard>
      </div>
    </section>
  );
}

export default Highlights