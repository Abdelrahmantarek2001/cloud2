const express = require('express');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'))

const persons = []

app.get('/', (req, res) => {
    res.json({ message: "Hello world" });
})

const port = 3000
let ID = 1

app.use(bodyParser.json())

app.get('/persons', (req, res) => {
    res.json(persons)
})

app.post('/persons', (req, res) => {
    const { name, age, gender, email } = req.body
    const id = ID++
    const person = { id, name, age, gender, email }
    persons.push(person)
    res.send("Added Success")
})

app.get('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.send('Person not found')
    }
})

app.put('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        const { name, age, gender, email } = req.body
        person.name = name || person.name
        person.age = age || person.age
        person.gender = gender || person.gender
        person.email = email || person.email
        res.send("Updated Success")
    } else {
        res.send('Person not found')
    }
})
app.delete('/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = persons.findIndex(p => p.id === id)
    if (index !== -1) {
        persons.splice(index, 1)
        res.send("Deleted Success")
    } else {
        res.send('Person not found')
    }
})

app.listen(port, () => {
    console.log(`Server running at ${port}`)
})