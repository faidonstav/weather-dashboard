
export function getWeatherInfo(code) {
  const weatherMap = {
    0: { label: "Clear sky", icon: "sun" },
    1: { label: "Mainly clear", icon: "sun" },
    2: { label: "Partly cloudy", icon: "cloud" },
    3: { label: "Overcast", icon: "cloud" },
    45: { label: "Fog", icon: "cloud" },
    48: { label: "Rime fog", icon: "cloud" },
    51: { label: "Light drizzle", icon: "rain" },
    53: { label: "Drizzle", icon: "rain" },
    55: { label: "Dense drizzle", icon: "rain" },
    61: { label: "Light rain", icon: "rain" },
    63: { label: "Rain", icon: "rain" },
    65: { label: "Heavy rain", icon: "rain" },
    71: { label: "Light snow", icon: "snow" },
    73: { label: "Snow", icon: "snow" },
    75: { label: "Heavy snow", icon: "snow" },
    80: { label: "Rain showers", icon: "rain" },
    81: { label: "Rain showers", icon: "rain" },
    82: { label: "Heavy showers", icon: "rain" },
    95: { label: "Thunderstorm", icon: "storm" },
    96: { label: "Thunderstorm with hail", icon: "storm" },
    99: { label: "Heavy thunderstorm", icon: "storm" },
  };

  return weatherMap[code] ?? {
    label: "Unknown",
    icon: "cloud",
  };
}
