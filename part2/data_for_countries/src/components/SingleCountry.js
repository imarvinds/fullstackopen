import React from 'react'
import Weather from './Weather'

const SingleCountry = (props) => {

    return(
        <div>
            <h2>{props.country[0].name}</h2>
            
            &nbsp; Capital {props.country[0].capital}
            <br />
            &nbsp; Population {props.country[0].population}
            
            <h3>Languages</h3><ul>{props.country[0].languages.map((language,i) => 
                <li key={i}>{language.name}</li>)}</ul>

            &nbsp;<img src={props.country[0].flag} height="100px" width="130px" alt="flagImg" border="1px solid black"></img>

            <Weather country={props.country[0]} />

        </div>
    )
}

export default SingleCountry