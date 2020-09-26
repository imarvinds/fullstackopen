import React from 'react'
import SingleCountry from './SingleCountry'

const CountryList = (props) =>{
    return (
        <div> 

            {props.countries.length === 1 ?
            <SingleCountry country={props.countries} /> 

            : props.countries.length < 10 ? 
            props.countries.map(country => 
            <div key={country.name}>{country.name} 
                <button onClick={() => { props.displayInfo(country)}}> show </button>
            </div>)  

            : "Too many matches specify another filter"} 
            
        </div>
    )
}

export default CountryList