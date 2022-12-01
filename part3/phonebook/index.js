const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.json())

morgan.token('body', (req, res) => { return JSON.stringify(req.body) })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello phonebook</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    }
    else {
        response.status(404).end()
    }
})

const generateId = () => {
    return Math.round(Math.random()*1000000)
}

const errorResponse = (response, errorMsg) => {
    return response.status(400).json({
        error: errorMsg
    })
}

app.post('/api/persons/', (request, response) => {
    const body = request.body

    if (!body.name) {
        return errorResponse(response, 'name missing')
    }
    if (!body.number) {
        return errorResponse(response, 'number missing')
    }
    if (persons.find(person => person.name === body.name)) {
        return errorResponse(response, 'name must be unique')
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(newPerson)

    response.json(newPerson)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})

app.get('/api/info', (request, response) => {
    const date = new Date()
    let msg = `<p>Phonebook has info for ${persons.length} people.</p>`
    msg += `<p>${date}</p>`
    response.send(msg)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})