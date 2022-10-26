import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Weather = ({city}) => {
  const [weather, setWeather] = useState(Object())

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  }, [])
  
  if ("main" in weather) return (
    <div>
      <h3>Weather in {weather.name}</h3>
      <div>temperature: {(weather.main.temp)} °C</div>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon'></img>
      <div>description: {weather.weather[0].description}</div>
      <div>wind: {weather.wind.speed} m/s</div>
    </div>
  )
}


export default Weather
