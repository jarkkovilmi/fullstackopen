import { useState } from 'react'

const Filter = ({ filter, handler }) => {
	return (
	<div>
		filter shown with: <input value={filter} onChange={handler} />
	</div>
	)
}

const PersonForm = (props) => {
	return (
		<form onSubmit={props.addPerson}>
			<div>
				name: <input value={props.newName} onChange={props.nameHandler} />
			</div>
			<div>
				number: <input value={props.newNumber} onChange={props.numberHandler} />
			</div>
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	)
}

const Persons = ({ filter, persons }) => {
	const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()))
	return filteredPersons.map(person => <div key={person.name}>{person.name} {person.number}</div>)
}

const App = () => {
  const [persons, setPersons] = useState([
			{ name: 'Arto Hellas', number: '040-123456' },
			{ name: 'Ada Lovelace', number: '39-44-5323523' },
			{ name: 'Dan Abramov', number: '12-43-234345' },
			{ name: 'Mary Poppendieck', number: '39-23-6423122' }
	]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

	const addPerson = (event) => {
		event.preventDefault()
		const personNames = persons.map(person => person.name)
		if (personNames.includes(newName)) 
			return alert(`${newName} is already added to the phonebook`)

		const personObject = {
			name: newName,
			number: newNumber
		}
		setPersons(persons.concat(personObject))
		setNewName('')
		setNewNumber('')
	}
	
	const handleNameChange = (event) => {
		setNewName(event.target.value)
	}
	
	const handleNumberChange = (event) => {
		setNewNumber(event.target.value)
	}
	
	const handleFilterChange = (event) => {
		setFilter(event.target.value)
	}

  return (
    <div>
      <h2>Phonebook</h2>

			<Filter filter={filter} handler={handleFilterChange} />

      <h3>Add a new</h3>

			<PersonForm 
				addPerson={addPerson} 
				name={newName} 
				nameHandler={handleNameChange} 
				number={newNumber} 
				numberHandler={handleNumberChange}
			/>

      <h3>Numbers</h3>

			<Persons filter={filter} persons={persons} />
    </div>
  )

}

export default App