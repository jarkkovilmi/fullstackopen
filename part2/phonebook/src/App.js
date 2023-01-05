import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

	useEffect(() => {
		personService.getAll()
			.then(initialPersons => {
				setPersons(initialPersons)
			})
	}, [])

	const addPerson = (event) => {
		event.preventDefault()
		const personNames = persons.map(person => person.name)
		const personObject = {
			name: newName,
			number: newNumber
		}
		if (personNames.includes(newName)) {
			if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
				const personId = persons.find(person => person.name === newName).id
				personService.update(personId, personObject)
					.then(returnedPerson => {
						setPersons(persons.map(person => person.id !== personId ? person : returnedPerson))
						return console.log("Updated person: ", returnedPerson)
					})
			}
		} else {
		personService.create(personObject)
			.then(returnedPerson => {
				setPersons(persons.concat(returnedPerson))
			})
		}
		setNewName('')
		setNewNumber('')
	}

	const deletePerson = (person) => {
		const confirmDelete = window.confirm(`Delete ${person.name}?`)
		if (confirmDelete) {
			personService.deleteById(person.id)
			.then(() => {
				setPersons(persons.filter(p => p.id !== person.id))
				setNewName('')
				setNewNumber('')
			})
		}
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

			<Persons filter={filter} persons={persons} deletePerson={deletePerson} />
    </div>
  )

}

export default App