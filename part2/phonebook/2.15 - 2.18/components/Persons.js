import React from 'react';

const Persons = (props) =>{
    return(
        <form>
            <div>
                {props.persons.filter(person => person.name.toLowerCase().includes(props.searchQuery.toLowerCase())).map(person =>
                    <div key={person.name}>{person.name} {person.number} <button onClick={(event)=>{event.preventDefault(); props.deleteContact(person.id)}}>delete</button></div>)}
            </div>
        </form>
    )
}

export default Persons