import React, { useState, useEffect, useRef } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import humidity_icon from '../assets/humidity.png';
import wind_icon from '../assets/wind.png';

const Weather = () => {
  const inputRef = useRef(null);

  const [weatherData, setWeatherData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const search = async (city) => {
    if (!city) {
      setErrorMessage('Please enter city name');
      setWeatherData(false);
      return;
    }

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=499cf9b3282adc9422c76ab650d7a8e7`);
      const data = await response.json();
      const weatherData = {
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        temperature: Math.round(data.main.temp - 273.15),
        location: data.name,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };
      setWeatherData(weatherData);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Invalid city name, please enter valid city name');
      setWeatherData(false);
    }
  };

  useEffect(() => {
    search("Mumbai");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder="Search for a city" />
        <img src={search_icon} alt="Search Icon" onClick={() => search(inputRef.current.value.trim())} />
      </div>
      {errorMessage && (
        <p style={{ fontSize: '24px', marginTop: '10px', color: 'red' }}>{errorMessage}</p>
      )}
      {weatherData ? (
        <div className="weather-info">
          <img src={weatherData.icon} className="weather-icon" alt="Weather Icon" />
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
