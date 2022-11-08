import { useState, useEffect } from 'react'
import { Filter, PersonForm, Persons, Notification } from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState({message: 'some error message...', errorFlag: true})

  useEffect(() => {
    personService
      .getAll()
      .then(allEntries => {
        setPersons(allEntries)
      })
  }, [])

  useEffect(() => {
    const timeId = setTimeout(() => {
      setErrorMessage(null)
    }, 3000)
    return () => clearTimeout(timeId)
  })

  const addEntry = (event) => {
    event.preventDefault()
   
    const personObject = {
      name: newName,
      number: newNumber,
    }

    const alreadyExists = (element) => element.name === newName
    if (persons.some(alreadyExists)) {
      if (window.confirm(`${personObject.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const p_id = persons.find(p => p.name === newName).id
        personService
          .update(p_id, personObject)
          .then(updatedPerson => {
            setPersons(persons.map(person => person.name !== newName ? person : updatedPerson))
          })
          .catch(error => {
            setPersons(persons.filter(person => person.id !== p_id))
            setErrorMessage({message: `Information of ${newName} has already been removed from the server`, errorFlag: true})
          })
        setErrorMessage({message: `Updated ${newName}`, errorFlag: false})
      }
      return
    }

    personService
      .create(personObject)
      .then(phonebook => {
        setPersons(persons.concat(phonebook))
        setNewName('')
        setNewNumber('')
      })
    
    setErrorMessage({message: `Added ${newName}`, errorFlag: false})
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
        setErrorMessage({message: `Deleted ${personToDelete.name}`, errorFlag: false})
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
      <Notification message={errorMessage} />

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