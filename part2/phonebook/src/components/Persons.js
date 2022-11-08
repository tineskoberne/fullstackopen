const Entry = ({person}) => <li>{person.name} : {person.number}</li>

export const Persons = ({persons}) => {
  return (
    <ul>
      {persons.map((person) => <Entry key={person.id} person={person}/>)}
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
