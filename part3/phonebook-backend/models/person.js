const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const contactSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: 3, 
        required: [true, 'Contact name required (3+ characters)'], 
        unique: true
    },
    number: {
        type: String, 
        minlength: 8,
        validate: {
            validator: function (v) {
                return /^(?=.*[0-9])[- +()0-9]+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
        unique: true,
        required: [true, 'Contact phone number required (8+ characters)']
    }
})

contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)