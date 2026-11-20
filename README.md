# Weather App

A responsive React + JavaScript weather dashboard UI inspired by the supplied reference.

## 1. Installation and setup

### Prerequisites
- Node.js 18 or newer (Vite 6 requires `^18`, `^20` or `>=22`)
- npm (bundled with Node.js)
- An internet connection (the app calls the Open-Meteo APIs and loads fonts from Google Fonts at runtime)

### Installation
```bash
git clone <repository-url>
cd weather-atlas-dashboard
npm install
```

### Run locally
```bash
npm run dev
```
Vite prints a local URL (by default http://localhost:5173). Open it in a browser.

### Production build
```bash
npm run build     # outputs to dist/
npm run preview   # serves the production build locally
```

## 2. Implementation choices

- **Framework:** React 18 with functional components and hooks (`useState`, `useEffect`, `useMemo`).
- **Build tool:** Vite 6 with `@vitejs/plugin-react`.
- **Language:** JavaScript (JSX).
- **Styling:** Plain CSS, one stylesheet per component plus global styles and CSS variables in `src/styles.css`. No CSS framework; layout uses CSS grid/flexbox with breakpoints at 900px and 600px.
- **Icons:** `lucide-react`.
- **Fonts:** DM Sans and Manrope via Google Fonts.
- **Data:** Open-Meteo Geocoding API (city search) and Forecast API (current conditions and 7-day daily forecast, `timezone=auto` so times are local to the searched city). API calls are isolated in `src/api/weather.js`.
- **Third-party dependencies:** only `react`, `react-dom` and `lucide-react` at runtime; `vite` and `@vitejs/plugin-react` for development.
- **Structure:** the UI is split into small components in `src/components/`. `src/utils/weatherCodes.js` maps Open-Meteo WMO weather codes to a label and icon.
- **Race conditions:** effects use a `cancelled` flag so a slow response for a previous city cannot overwrite a newer one.
- **Error and loading states:** loading and error messages are shown for the forecast and city search, and the "Other cities" panel degrades gracefully if some requests fail.

## 3. Incomplete requirements

- **Map is schematic:** the city map is an illustrative SVG, not a real map. It only displays coordinates.
- **Sidebar is non-functional:** navigation items, "Sign out" and the theme toggle are visual only. Saved places and unit switching are not implemented.
- **Units:** temperatures are shown in °C and wind in km/h only.
- **Wind chart:** the wind bars are decorative; only the numeric wind speed is real data.
- **Search suggestions:** search uses only the single best geocoding match, with no dropdown of alternatives.
- **Known edge case:** searching for a name with no matches shows the generic "Unable to find that city" error instead of "No city found", because the geocoder omits `results` in that case.
- **Limited weather codes:** some less common WMO codes (e.g. freezing rain, snow showers) fall back to "Unknown" with a cloud icon.

## 4. Next steps

- Add the interactive globe for choosing a country, then a city within it.
- Replace the schematic map with a real map.
- Handle empty geocoding results explicitly, URL-encode the query, and show a list of matches to choose from.
- Wire up the sidebar: saved places (persisted in `localStorage`), a °C/°F toggle, and a working light/dark theme.
- Add hourly forecast, sunrise/sunset, UV index and real wind-direction data.
- Cache API responses and debounce search to reduce network calls.
- Complete the weather-code mapping.
- Add unit tests (Vitest and React Testing Library), ESLint/Prettier and a CI workflow.
- Do a full keyboard and screen-reader accessibility pass.
- Start from the user's current location via browser geolocation.

## 5. Additional notes

- The default city on first load is New York; the "Other cities" list (Islamabad, Dubai, Chengdu, Montreal) is hard-coded in `src/components/OtherCities.jsx`.
- Weather data is provided by Open-Meteo.com (CC BY 4.0). The free tier is intended for non-commercial use.

