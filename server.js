require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const POKEDEX = require('./pokedex.json')

const app = express()

app.use(morgan('dev'))

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

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`]

function handleGetTypes(req, res) {
  res.json(validTypes)
}
function handleGetPokemon(req, res){
    let response = POKEDEX.pokemon
    const { name, type } = req.query
    if (name){
        response = response.filter(pokemon => 
            pokemon.name.toLowerCase().includes(name.toLowerCase())
        )
    }
    if(type){
        response = response.filter(pokemon => pokemon.type.includes(type))
    }

    res.json(response)
}

app.get('/pokemon', handleGetPokemon)
app.get('/types', handleGetTypes)

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`)
})
