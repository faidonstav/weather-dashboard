export async function searchCities(name) {
  const query = name.trim();
  if (query.length < 2) return [];

  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=1`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Geocoding failed");
  const data = await response.json();

  return data.results[0] ?? [];
}


export async function getForecast(latitude, longitude ) {
  const params = new URLSearchParams({
    latitude,
    longitude,
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m",
    daily: "weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,precipitation_probability_max",
    timezone: "auto",
    forecast_days: "7"
  });
  const res = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);

  if (!res.ok) throw new Error("Forecast failed");

  return res.json();
}

