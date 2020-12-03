const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = 
  `mongodb+srv://fullstack:${password}@cluster0.3oyxw.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})


const Contact = mongoose.model('Contact', contactSchema)


if (process.argv.length == 3) {
    Contact.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length == 5) {
    const contact = new Contact({
        name: process.argv[3],
        number: process.argv[4]
    })

    contact.save().then(result => {
        console.log(`Added ${contact.name} number ${contact.number} to phonebook`)
        mongoose.connection.close()
    })
}

