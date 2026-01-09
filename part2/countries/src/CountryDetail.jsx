import { useState, useEffect } from "react";
import axios from "axios";

const CountryDetail = ({ country }) => {
  const [weather, setWeather] = useState(null);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const capital = country.capital[0];

  useEffect(() => {
    if (!capital) return;

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${apiKey}`;

    axios.get(url).then((response) => {
      setWeather(response.data);
    });
  }, [capital, apiKey]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="250"
      />
      <h2>Weather in {capital}</h2>
      {!weather ? (
        <p>Loading weather data...</p>
      ) : (
        <div>
          <p>Temperature: {weather.main.temp} °C</p>

          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />

          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default CountryDetail;
