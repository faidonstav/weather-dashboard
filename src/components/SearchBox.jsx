import { Search } from "lucide-react";
import React from "react";
import "./SearchBox.css"

function SearchBox({ value, onChange, onSearch, loading }) {
    function handleSubmit(e) {
        e.preventDefault();
        const name = value.trim();
        if (name && !loading) onSearch(name);
    }

    return (
    <div className="search-container">
      <form className="search-box" onSubmit={handleSubmit} role="search">
      <label htmlFor="city" className="visually-hidden">
        City name
      </label>
      <input
        id="city"
        type="search"
        placeholder="Search for a city, like Lisbon"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
      />
      <button type="submit" disabled={loading || !value.trim()} aria-label="Search city">
        {loading ? "Searching..." : <><Search size={16} /> Search</>}
      </button>
    </form>
    </div>
  );
}


export default SearchBox