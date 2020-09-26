import React, { useState, useEffect } from 'react'
import Note from './Note'
import noteService from '../services/notes'
import Notification from './Notification'

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontStyle: 'italic',
        fontSize: 16
    }
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2020</em>
        </div>
    )
}


const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState('') 
    const [showAll, setShowAll] = useState(true)
    const [errorMessage, setErrorMessage] = useState('some error happened...')

    useEffect(() => {
        noteService
            .getAll()
            .then(initialNotes => { 
                setNotes(initialNotes) 
            }) 
    }, []) /* The var name initialnotes can be used here instead of response.data because we return response.data in services/notes.js */

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNote(event.target.value)
    }


    const toggleImportanceOf = id => {
        const note = notes.find(n => n.id === id)
        const changedNote = { ...note, important: !note.important }

        noteService
            .update(changedNote).then(returnedNote => {
                setNotes(notes.map(note => note.id !== id ? note : returnedNote))
            })
            .catch(error => {
                setErrorMessage(
                    `Note '${note.content}' was already removed from server`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter(n => n.id !== id))
            })
    } 

    const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important === true)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }

        noteService
            .create(noteObject)
            .then(response => {
                setNotes(notes.concat(response.data))
                setNewNote('')
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            <ul>
                {notesToShow.map((note, i) =>
                    <Note
                        key={i}
                        note={note}
                        toggleImportance={() => toggleImportanceOf(note.id)}
                    />
                )}
            </ul>

            <div>
                <button onClick={() => setShowAll(!showAll)}>
                    show {showAll ? 'important' : 'all'}
                </button>
            </div>

            <form onSubmit={addNote}>
                <input value={newNote} onChange={handleNoteChange} />
                <button type="submit" onClick={addNote}>save</button>
            </form> 
            <Footer />
        </div>
    )
}

export default App
