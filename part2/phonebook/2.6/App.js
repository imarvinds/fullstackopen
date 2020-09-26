import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas' }
    ])
    const [newName, setNewName] = useState('')

    const saveName = (event) => {
        event.preventDefault()
        setPersons(persons.concat({name: newName}))
        setNewName('')
    }

    const handleChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={saveName}>
                <div>
                    name: <input value={newName} onChange={handleChange}/>
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <form>
                <div>{persons.map(person => <div key={person.name}>{person.name}</div>)}</div> 
            </form>
        </div>
    )
}

export default App