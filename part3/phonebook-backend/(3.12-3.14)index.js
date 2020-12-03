require('dotenv').config()
const express = require("express")
const cors = require('cors')
const app = express()
const Contact = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))


app.get('/api/contacts', (request, response)=>{
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.post('/api/contacts', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const contact = new Contact({
        name: body.name,
        number: body.number
    })

    contact.save().then(savedContact => {
        response.json(savedContact)
    })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contactList.find(p => p.id === id)
    if (contact) {
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})