import { useState } from 'react'

const Entry = ({person}) => <li>{person.name} : {person.number}</li>

const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map((person) => <Entry key={person.name} person={person}/>)}
    </ul>
  )
}

const Filter = ({value, onChange}) => {
  return (
    <div>
    filter: <input value={value} onChange={onChange} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.submitHandle}>
    <div>
      name: <input value={props.name} onChange={props.nameHandle} />
    </div>
    <div>
      number: <input value={props.number} onChange={props.numberHandle} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
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
      <Filter value={filter} onChange={handleFilterChange}/>

      <h2>Add a new</h2>
      <PersonForm 
        submitHandle={addEntry}
        name={newName} nameHandle={handleNameChange}
        number={newNumber} numberHandle={handleNumberChange}
      />
      
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App