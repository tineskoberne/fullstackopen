import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'

const Filter = ({value, onChange}) => {
  return (
    <div>
      find countries: <input value={value} onChange={onChange} />
    </div>
  )
}

const App = (props) => {
  const [filter, setFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    const f = event.target.value
    const fc = countries.filter(country => {
      return country.name.common.toLowerCase().includes(f.toLowerCase())
    })
    setFilter(f)
    setFilteredCountries(fc)
  }

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Countries countries={filteredCountries} setCountries={setFilteredCountries} />
    </div>
  )

}

export default App;
