import React, { useState } from 'react'

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
        console.log(newName)
        if (persons.find(p=>p.name===newName)) {
            alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat({ name: newName, number: newNum }))
        }
        setNewName('')
        setNewNum('')
    }

    const handleNameChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumChange = (event) => {
        console.log(event.target.value)
        setNewNum(event.target.value)
    }

    const handlefilterChange=(event)=>{
        setSearchQuery(event.target.value)
    }


    return (
        <div>
            <h2>Phonebook</h2>
            <div>
                filter shown with <input onChange={handlefilterChange} />
            </div>
            <h2>Add a new</h2>
            <form onSubmit={saveName}>
                <div>
                    Name: <input value={newName} onChange={handleNameChange}/>
                </div>
                <div>
                    Number: <input value={newNum} onChange={handleNumChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <form>
                <div>
                    {persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase())).map(person =>
                         <div key={person.name}>{person.name} {person.number}</div>)}
                </div> 
            </form>
        </div>
    )
}

export default App