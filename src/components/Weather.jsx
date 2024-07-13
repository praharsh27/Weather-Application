import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import cloud_icon from '../assets/cloud.png';
import drizzle_icon from '../assets/drizzle.png';
import humidity_icon from '../assets/humidity.png';
import snow_icon from '../assets/snow.png';
import wind_icon from '../assets/wind.png';
import clear_icon from '../assets/clear.png';
import rain_icon from '../assets/rain.png';
import few_clouds_icon from '../assets/few_clouds.png'; // Add this import

const Weather = () => {
  const inputRef = useRef(null);

  const [weatherData, setWeatherData] = useState(false);

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": few_clouds_icon, // Update this line
    "02n": few_clouds_icon, // Update this line
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };

  const search = async (city) => {
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c3defec046517d47b4caca2224dcd2a5`);
      const data = await response.json();
      const weatherData = {
        icon: allIcons[data.weather[0].icon],
        temperature: Math.round(data.main.temp - 273.15),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
      setWeatherData(weatherData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    search("Mumbai"); // Update this line to search for Kolkata
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search for a city" />
        <img src={search_icon} alt="Search Icon" onClick={() => search(inputRef.current.value.trim())} />
      </div>
      {weatherData ? (
        <div>
          <img src={weatherData.icon} className="weather-icon" alt="Clear Weather Icon" />
          <p className="temp">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind Speed Icon" />
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Weather;