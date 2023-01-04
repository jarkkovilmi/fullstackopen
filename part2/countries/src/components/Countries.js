const Countries = ({ showCountry, filteredCountries }) => {
	return filteredCountries.map(country => 
		<div key={country.ccn3}>
				{country.name.common} <button onClick={() => showCountry(country.name.common)}>show</button>
		</div>
	)
}

export default Countries