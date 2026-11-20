import React from "react";
import { MapPin } from "lucide-react";
import "./CityMap.css"

function CityMap({ city }) {
  const { latitude, longitude } = city;

  return (
    <section className="city-map panel">
      <div className="section-heading">
        <h2>{city.name} map</h2>
        <span className="map-mode">Schematic view</span>
      </div>
      <div
        className="schematic-map"
        role="img"
        aria-label={`Schematic map centered on ${city.name} at ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`}
      >
        <svg viewBox="0 0 640 360" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <rect width="640" height="360" fill="#17282d" />
          <path
            d="M0 255 C80 210 135 246 220 213 S365 152 446 181 S565 169 640 108 V360 H0Z"
            fill="#1d3b40"
          />
          <path d="M38 52 180 81 242 45 365 78 444 42 596 70" className="map-street" />
          <path d="M-20 145 121 116 245 157 374 122 515 157 660 119" className="map-street" />
          <path d="M-10 220 118 188 249 226 380 194 510 228 650 194" className="map-street" />
          <path d="M35 314 162 278 281 314 415 277 550 307 655 280" className="map-street" />
          <path d="M100 -20 124 90 91 169 123 260 98 380" className="map-street" />
          <path d="M255 -20 279 83 248 166 282 258 256 380" className="map-street" />
          <path d="M430 -20 403 77 447 162 411 252 437 380" className="map-street" />
          <path d="M570 -20 542 83 576 163 543 253 573 380" className="map-street" />
          <path d="M-10 101 C130 75 235 116 330 96 S510 67 650 95" className="map-main-road" />
          <path d="M322 -10 C294 72 355 128 326 190 S297 288 337 370" className="map-main-road" />
          <rect x="454" y="239" width="82" height="43" rx="18" fill="#315247" />
          <rect x="150" y="112" width="57" height="31" rx="14" fill="#315247" />
        </svg>
        <div className="map-coordinate">
          {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
        </div>
        <div className="map-marker" aria-hidden="true">
          <MapPin size={34} fill="currentColor" />
        </div>
        <span className="map-city-label">{city.name}</span>
        <span className="map-disclaimer">Illustrative streets · Not to scale</span>
      </div>
    </section>
  );
}

export default CityMap;
