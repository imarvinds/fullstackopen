const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(bodyParser.json())

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] :response-time ms - :body'))
let contactList =  [
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

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(requestLogger)


app.get('/info', (request, response) => {
    let length = contactList.length
    let date = new Date() 
    response.send(`phonebook has ${length} people <br> <br> ${date}`)

})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const contact = contactList.find(p => p.id === id)
    if(contact){
        response.json(contact)
    } else {
        response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
    console.log(contactList)
    response.json(contactList)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    contactList = contactList.filter(p => p.id !== id)

    response.status(204).end()
})

let getRandomId = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

app.post('/api/persons', (request, response)=> {
    const body = request.body

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'contact details missing/incorrect format'
        })
    }
    
    
    if(contactList.find(p => p.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    } else {
        let person = {
            name: body.name,
            number: body.number,
            id: getRandomId(5, 500000)
        }

        contactList = contactList.concat(person)
        response.json(person)
    }
})

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})