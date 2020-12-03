require('dotenv').config()
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
var uniqueValidator = require('mongoose-unique-validator')

const app = express()

const Contact = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] :response-time ms - :body'))

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}

app.use(requestLogger)

app.get('/api', (request, response) => {
    response.send('<center><h1>Phonebook</h1><a>/api/contacts</a><center>')
})

app.get('/api/contacts', (request, response) => {
    Contact.find({}).then(contacts => {
        response.json(contacts)
    })
})

app.get('/api/contacts/:id', (request, response, next) => {
    Contact.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.post('/api/contacts', (request, response, next) => {
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

    contact.save()
        .then(savedContact => {
            response.json(savedContact)
        })
        .catch(error => {
            next(error)
            console.log(error.response.data)
        })
})

app.put('/api/contacts/:id', (request, response, next) => {
    const body = request.body
    const personToUpdate = {
        _id: request.params.id,
        name: body.name,
        number: body.number
    }

    /*
    // findIdByUpdate vs findOneAndUpdate
        Contact.findByIdAndUpdate(request.params.id, personToUpdate, {new:true})
        .then(updatedContact => {
            response.json(updatedContact)
        })
        .catch(error => next(error))

    */

    Contact.findOneAndUpdate({ _id: request.params.id }, personToUpdate, { new: true, runValidators: true }, function (error, result) {
        if (error) {
            next(error)
        } else {
            response.json(result)
        }
    })

})

app.delete('/api/contacts/:id', (request, response) => {
    Contact.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})