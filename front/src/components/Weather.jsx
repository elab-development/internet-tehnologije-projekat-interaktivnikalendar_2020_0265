import React, { useState, useEffect } from 'react';

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const apiUrl = 'https://api.open-meteo.com/v1/forecast?latitude=44.804&longitude=20.4651&current=temperature_2m,rain,wind_speed_10m&timezone=Europe%2FBerlin';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [apiUrl]);

  return (
    <div className="weather-container"> 
      <h2 className="weather-title">Weather Information</h2> 
      {weatherData && (
        <div className="current-weather"> 
          <h3>Current Weather</h3>
          <div className="weather-info"> 
            <p>Time: {weatherData.current.time}</p>
            <p>Temperature: {weatherData.current.temperature_2m}</p>
            <p>Rain: {weatherData.current.rain}</p>
            <p>Wind Speed: {weatherData.current.wind_speed_10m}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
