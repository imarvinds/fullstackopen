import React, { useState, useEffect } from 'react';
import axios from 'axios'
import CountryList from './CountryList' 
import Filter from './Filter' 

const App = () => {
  const [countries, setCountries] = useState([])
  const [queryResult, setQueryResult] = useState([])

  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  //Function to display info onClick show button
  const displayInfo = (country) => {
    let showCountry = []
    showCountry.push(country)
    setQueryResult(showCountry)
  }

  const handleChange = (event) => { 
    let filteredCountries = countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setQueryResult(filteredCountries)
  }

  return(
    <div>
      <Filter handleChange={handleChange} /> 
      <CountryList displayInfo={displayInfo} countries={queryResult} />
    </div>
  )
}


export default App
