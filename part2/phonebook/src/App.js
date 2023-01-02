import { useState, useEffect } from 'react'
import axios from 'axios'

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
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

	const hook = () => {
		console.log('effect')
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				console.log('promise fulfilled')
				setPersons(response.data)
			})
	}
	
	useEffect(hook, [])

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