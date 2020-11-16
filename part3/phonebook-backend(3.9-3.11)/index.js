const express = require("express")
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 2
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 3
    },
    {
        "name": "Warick",
        "number": "28173911928",
        "id": 4
    }
]

const generateId = () => {
    const maxId = persons.length > 0
        ? Math.max(...persons.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/api/contacts', (req, res)=>{
    res.json(persons)
})

app.post('/api/contacts', (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'content missing'
        })
    }
    const contact = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(contact)

    response.json(contact)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})