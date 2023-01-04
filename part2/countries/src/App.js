import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Country from './components/Country'

const App = () => {
	const [countries, setCountries] = useState([])
	const [countryFilter, setCountryFilter] = useState('')
	const [filteredCountries, setFilteredCountries] = useState([])

	useEffect(() => {
		axios
			.get('https://restcountries.com/v3.1/all')
			.then(response => {
				setCountries(response.data)
			})
	}, [])

	const showCountry = (countryName) => {
		const searchFilteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(countryName.toLowerCase()))
		setFilteredCountries(searchFilteredCountries)
		setCountryFilter('')
	}

	const handleFilterChange = (event) => {
		setCountryFilter(event.target.value)
		const searchFilteredCountries = countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
		setFilteredCountries(searchFilteredCountries)
	}
	
  return (
		<div>
			find countries <input value={countryFilter} onChange={handleFilterChange}></input>
			{(filteredCountries.length > 10 || filteredCountries.length === 0)
				? <div>Too many matches, specify another filter</div>
				: ((10 >= filteredCountries.length && filteredCountries.length > 1)
					? <Countries filteredCountries={filteredCountries} showCountry={showCountry} />
					: <Country country={filteredCountries[0]} capital={filteredCountries[0].capital[0]} /> )}
		</div>
  )
}

export default App