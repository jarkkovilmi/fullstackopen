const Country = ({ filteredCountries }) => {
	return filteredCountries.map(country => (
		<div key={country.ccn3}>
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
		</div>))
}

export default Country