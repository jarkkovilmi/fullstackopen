import { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const Country = ({ country, capital }) => {
	const [weatherData, setWeatherData] = useState({})

	useEffect(() => {
		axios
			.get("https://api.openweathermap.org/data/2.5/weather", {
				params: {
					q: capital,
					APPID: api_key,
					units: "metric"
				}
			})
			.then(response => {
				setWeatherData(response.data)
			})
	}, [capital])

	return (
		<div>
			<h1>{country.name.common}</h1>
			<div>capital {country.capital}</div>
			<div>area {country.area}</div>
			<h2>languages</h2>
			<ul>
        {Object.keys(country.languages).map((key, index) => (
          <li key={index}>{country.languages[key]}</li>
        ))}
			</ul>
			<img src={country.flags.svg} alt={country.name.common} width="200"></img>
			{Object.keys(weatherData).length !== 0 && (
				<div>
				<h2>Weather in {country.capital}</h2>
				<div>temperature {weatherData.main.temp} Celcius</div>
				<img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description}></img>
				<div>wind {weatherData.wind.speed} m/s</div>
				</div>
			)}
		</div>)
}

export default Country