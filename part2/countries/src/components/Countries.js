const Countries = ({ showCountry, filteredCountries }) => {
	return filteredCountries.map(country => 
		<div
			key={country.ccn3}>{country.name.official}
			<button onClick={() => showCountry(country.name.official)}>show</button>
		</div>
	)
}

export default Countries