const Entry = ({person, handleDeleteOf}) => {
  return (
    <li>
      {person.name} : {person.number}
      <button onClick={() => handleDeleteOf(person.id)}>delete</button>
    </li>
  )
}

export const Persons = ({persons, handleDeleteOf}) => {
  return (
    <ul>
      {persons.map((person) => <Entry key={person.id} person={person} handleDeleteOf={handleDeleteOf}/>)}
    </ul>
  )
}

export const Filter = ({value, onChange}) => {
  return (
    <div>
    filter: <input value={value} onChange={onChange} />
    </div>
  )
}

export const PersonForm = (props) => {
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
