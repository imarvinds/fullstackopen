import React, { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [searchQuery, setSearchQuery] = useState('') 

    const saveName = (event) => {
        event.preventDefault()
        if (persons.find(p=>p.name===newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNum }))
        }
        setNewName('')
        setNewNum('')
    }

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumChange = (event) => {
        setNewNum(event.target.value)
    }

    const handleFilterChange=(event)=>{
        setSearchQuery(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handleChange={handleFilterChange}/>

            <h3>Add a new</h3>

            <PersonForm saveName={saveName} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>

            <h3>Numbers</h3>
            
            <Persons persons={persons} searchQuery={searchQuery}/>
        </div>
    )
}

export default App