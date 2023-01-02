import { useState } from 'react'

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
			<div>debug: {newName}</div>
			<div>debug: {newNumber}</div>
			<div>debug: {filter}</div>
      <h2>Phonebook</h2>
			<div>
				filter shown with: <input value={filter} onChange={handleFilterChange} />
			</div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      { filter === "" ? persons.map(person => 
					<div key={person.name}>{person.name} {person.number}</div>
			) :
			persons.filter((person) => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => 
					<div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )

}

export default App