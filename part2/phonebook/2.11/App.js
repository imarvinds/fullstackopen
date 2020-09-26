import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import axios from 'axios'


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [searchQuery, setSearchQuery] = useState('') 
    const hook = () => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }

    useEffect(hook, [])

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