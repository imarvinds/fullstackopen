import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import contactInfoService from '../services/contactInfo'
import Notification from './Notification' 


const App = () => {

    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNum, setNewNum] = useState('')
    const [searchQuery, setSearchQuery] = useState('') 
    const [nmessage, setnMessage] = useState(null)
    const validNum = /^(?=.*[0-9])[- +()0-9]+$/
    const [ifError, setIfError] = useState(null)

    useEffect(() => {
        contactInfoService
            .getAll()
            .then(contacts => {
                setPersons(contacts)
            })
        }, [])

    const saveName = (event) => {
        event.preventDefault()
        //if (validNum.test(newNum)) {

            const contactObject = {
                name: newName,
                number: newNum,
                id: persons.length + 1
            }

            //Edit contact
            if (persons.find(p => p.name === newName)) {
                let found = persons.find(p => p.name === newName)
                let confirm = window.confirm(` ${newName} is already added to phonebook, replace old number with new one? `)
                if (confirm) {
                    const updatedContact = { ...found, number: newNum }
                    contactInfoService
                        .update(`${found.id}`, updatedContact)
                        .then( response => { setPersons(persons.map(person => person.id !== found.id ? person : response.data)) 
                            setIfError(false)
                            setnMessage(`Updated ${newName}`)
                            
                            setTimeout(() => {
                                setnMessage(null)
                            }, 5000) 
                            
                            setNewName('')
                            setNewNum('')

                        })
                        .catch(error => {
                            setIfError(true)
                            setnMessage(error.response.data.error)
                            setTimeout(() => {
                                setnMessage(null)
                            }, 5000)
                        })
                }


            } else {
                contactInfoService
                    .create(contactObject)
                    .then(createdPerson => { 
                        console.log(createdPerson)
                        setPersons(persons.concat(createdPerson.data))
                        setIfError(false)
                        setnMessage(`Added ${newName}`)
                        setTimeout(() => {
                            setnMessage(null)
                        }, 5000)
                        setNewName('')
                        setNewNum('')
                    })
                    .catch(error => {
                        // this is the way to access the error message
                        setIfError(true)
                        setnMessage(error.response.data.error)
                        setTimeout(() => {
                            setnMessage(null)
                        }, 5000)
                    
                    })

            }
    
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
                .then(()=>{
                    setPersons(persons.filter(p => p !== contactToDelete))
                    setIfError(false)   
                    setnMessage(`Deleted ${contactToDelete.name}`)
                 
                setTimeout(() => {
                    setnMessage(null)
                }, 5000)})
                .catch(error => {
                    setIfError(true)
                    setnMessage(`Information of ${contactToDelete.name} has already been removed from the server.`)
                    setTimeout(() => {
                        setnMessage(null)
                    }, 5000)
                    setPersons(persons.filter(p => p !== contactToDelete))
                })
        } 
    }
     
    

    return (
        <div>
            <h1>Phonebook</h1>

            {     ifError === null  ? null
                : ifError === true ? (<Notification message={nmessage} error={true} />)  
                : ifError === false ? (<Notification message={nmessage} error={false} />) : null
            }

            <Filter handleChange={handleFilterChange}/>

            <h3>Add a new</h3>

            <PersonForm saveName={saveName} newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange}/>

            <h3>Numbers</h3>

            <Persons persons={persons} deleteContact={deleteContact} searchQuery={searchQuery}/>
        </div>
    )
}

export default App