import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons } from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(allEntries => {
        setPersons(allEntries)
      })
  }, [])

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
    personService
      .create(personObject)
      .then(phonebook => {
        setPersons(persons.concat(phonebook))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDeleteOf = (id) => {
    const personToDelete = persons.find(p => p.id === id)
    if (!window.confirm(`Delete ${personToDelete.name}?`)) {
      return
    }
    personService
      .remove(id)
      .then(response => {
        console.log(response)
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.log(error)
      })
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
      <Filter value={filter} onChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        submitHandle={addEntry}
        name={newName} nameHandle={handleNameChange}
        number={newNumber} numberHandle={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDeleteOf={handleDeleteOf} />
    </div>
  )
}

export default App