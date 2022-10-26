import React from 'react'

const CountryEntry = ({country, setCountries={setCountries}}) => {
  return(
    <li key={country.name.common}>{country.name.common}
      <button onClick={() => {setCountries([country])}}>
        show
      </button>
    </li>
  )
}

const CountryList = ({countries, setCountries}) => {
  return (
    <ul>
      {countries.map((country) => <CountryEntry key={country.name.common} country={country} setCountries={setCountries} />)}
    </ul>
  )
}

const CountryData = ({country}) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages</h3>
      <ul>
        {Object.values(country.languages).map((language) => (<li key={language}>{language}</li>))}
      </ul>
      <img src={country.flags.png} alt={country.name.common}></img>
    </div>
  )
}

const Countries = ({countries, setCountries}) => {
  if (countries.length === 0) return <></>
  
  if (countries.length > 10) {
    return <div>Too many countries, specify another filter</div>
  }

  if (countries.length === 1) {
    return <CountryData country={countries[0]} />
  }

  return <CountryList countries={countries} setCountries={setCountries} />
}

export default Countries