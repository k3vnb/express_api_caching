require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

console.log(process.env.API_TOKEN)

const app = express()

app.use(morgan('dev'))

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

app.use(function validateBearerToken(req, res, next){
    // const bearerToken = req.get('Authorization').split(' ')[1]
    const apiToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    console.log('validate bearer token middleware')
    // if (bearerToken !== apiToken) {
    //     return res.status(401).json({ error: 'Unauthorized request' })
    // }
    if (!authToken || authToken.split(' ')[1] !== apiToken){
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    next()
})

function handleGetTypes(req, res) {
  res.json(validTypes)
}
function handleGetPokemon(req, res){
    res.send('Hello, Pokemon!')
}

app.get('/pokemon', handleGetPokemon)
app.get('/types', handleGetTypes)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})
