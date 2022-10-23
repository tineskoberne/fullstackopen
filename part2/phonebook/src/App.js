import { useState } from 'react'

const Entry = ({person}) => <li>{person.name} : {person.number}</li>

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map((person) => <Entry key={person.name} person={person}/>)}
    </ul>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456'},
    { name: 'Ada Lovelace', number: '39-44-5323523'},
    { name: 'Dan Abramov', number: '12-43-234345'},
    { name: 'Mary Poppendieck', number: '39-23-6423122'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addEntry = (event) => {
    event.preventDefault()
   
    const alreadyExists = (element) => element.name === newName
    if (persons.some(alreadyExists)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
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

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(filter.toLowerCase())
  })

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter: <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addEntry}>
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
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App