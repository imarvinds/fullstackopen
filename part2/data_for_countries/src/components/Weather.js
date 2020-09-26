import React, { useState, useEffect } from 'react'
import getCityWeatherService from '../services/getCityWeather'

const Weather = (props) => {
    console.log('props:',props)
    const [weather, setWeather] = useState({})
    const [hasData, setHasData] = useState(false);

    useEffect(()=>{
        getCityWeatherService.getCityWeather(props.country.capital).then(data=>{
            setHasData(true)
            setWeather(
                {temperature: data.current.temperature,
                icon: data.current.weather_icons[0],
                windSpeed: data.current.wind_speed,
                windDirection: data.current.wind_dir
            });
        })
    },[])

    return hasData ?(
        <div>
            <h3>Weather in {props.country.capital}</h3>
            <b>Temperature:</b> {weather.temperature} deg Celsius
            <br />
            <img src={weather.icon} height="100px" width="100px" alt="weatherImg"></img>
            <br />
            <b>Wind:</b> &nbsp;
            {weather.windSpeed} kmph &nbsp;
            direction: &nbsp; {weather.windDirection}
        </div>
    ): null;
}

export default Weather