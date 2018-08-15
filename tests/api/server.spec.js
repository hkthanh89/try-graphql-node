'use strict'

const request = require('request-promise')
const testServer = require('../utils/server')
const { expect } = require('chai')

describe('Server', () => {
  let app;

  beforeEach(() => {
    app = testServer.start()
  })

  afterEach(() => {
    testServer.stop(app)
  })

  it('should resolve a pokemon', async () => {
    const query = `{
      pokemon(id: 1) {
        id
        name
        order
        orderFormatted
        img
      }
    }`

    const expected = {
      "pokemon": {
        "id": "1",
        "name": "bulbasaur",
        "order": 1,
        "orderFormatted": "# 1",
        "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
      }
    }

    let response = await testServer.graphqlQuery(app, query)

    expect(response.statusCode).to.equal(200)
    expect(response.body).to.have.deep.equals(expected)
  })

  it('should resolve a list pokemons', async () => {
    const query = `{
      pokemons {
        id
        name
        order
        orderFormatted
        img
      }
    }`

    const firstPokemon = {
      "id": "1",
      "name": "bulbasaur",
      "order": 1,
      "orderFormatted": "# 1",
      "img": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
    }

    let response = await testServer.graphqlQuery(app, query)

    expect(response.statusCode).to.equal(200)
    expect(response.body.pokemons[0]).to.deep.equal(firstPokemon)
    expect(response.body.pokemons.length).to.equal(20)
  })
})