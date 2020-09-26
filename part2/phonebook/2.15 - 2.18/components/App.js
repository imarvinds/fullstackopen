import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import contactInfoService from '../services/contactInfo'


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [searchQuery, setSearchQuery] = useState('') 

    useEffect(() => {
        contactInfoService
            .getAll()
            .then(contacts => {
                setPersons(contacts)
            })
        }, [])

    const saveName = (event) => {
        event.preventDefault()
        const contactObject = {
            name: newName,
            number: newNum,
            id: persons.length + 1
        }
         
        if (persons.find(p => p.name === newName)) {
            let found = persons.find(p => p.name === newName)
            let confirm = window.confirm(` ${newName} is already added to phonebook, replace old number with new one? `)
            if (confirm) {
                const updatedContact = { ...found, number: newNum }
                contactInfoService
                    .update(`${found.id}`, updatedContact)
                    .then( response => { setPersons(persons.map(person => person.id !== found.id ? person : response.data)) } ) 
            }

        } else {
            contactInfoService
                .create(contactObject)
                .then(setPersons(persons.concat(contactObject)))
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

    const handleFilterChange = (event) => {
        setSearchQuery(event.target.value)
    }

    const deleteContact = (id) => {
        const contactToDelete = persons.find(p => p.id === id)
        let confirm = window.confirm(`Delete ${contactToDelete.name} ?`)
        if (confirm) {
            contactInfoService
                .deleteContact(id)
                .then(setPersons(persons.filter(p => p !== contactToDelete)))
        } 
    } 
    

    return (
        <div>
            <h2>Phonebook</h2>

            <Filter handleChange={handleFilterChange}/>

            <h3>Add a new</h3>

            <PersonForm saveName={saveName} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>

            <h3>Numbers</h3>

            <Persons persons={persons} deleteContact={deleteContact} searchQuery={searchQuery}/>
        </div>
    )
}

export default App