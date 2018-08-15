'use strict'

const graphql = require('graphql')
const chai = require('chai')
const expect = chai.expect
const sinon = require('sinon')
chai.use(require('sinon-chai'))

const sandbox = sinon.sandbox.create()

const client = require('./pokemon.client')
const pokemon = require('./pokemon')
const pokemonType = pokemon.type

describe('Pokemon', () => {
  let fields = pokemonType.getFields()

  it('should have an id field of type String', () => {
    expect(fields).to.have.property('id')
    expect(fields.id.type).to.deep.equals(graphql.GraphQLString)
  })

  it('should have a name field of type String', () => {
    expect(fields).to.have.property('name')
    expect(fields.name.type).to.deep.equals(graphql.GraphQLString)
  })

  it('should have a order field of type Integer', () => {
    expect(fields).to.have.property('order')
    expect(fields.order.type).to.deep.equals(graphql.GraphQLInt)
  })

  it('should have a img field of type String', () => {
    expect(fields).to.have.property('img')
    expect(fields.img.type).to.deep.equals(graphql.GraphQLString)
  })

  it('should resolve orderFormatted field', () => {
    expect(fields.orderFormatted.resolve({ order: 1 })).to.equal('# 1')
  })

  it('should return empty string if no order provided', () => {
    expect(fields.orderFormatted.resolve()).to.equal('')
  })

  it('should resolve img field', () => {
    expect(fields.img.resolve({ sprites: { front_default: 'default' } })).to.equal('default')
  })

  describe('resolve', () => {
    beforeEach(() => {
      sandbox.stub(client, 'getPokemon')
      sandbox.stub(client, 'getPokemons')
    })

    afterEach(() => sandbox.restore())

    it('should call getPokemon when id provided', () => {
      pokemon.resolve(null, { id: 'id' })
      expect(client.getPokemon).to.have.been.calledWith('id')
      expect(client.getPokemons).to.not.have.been.called
    })

    it('should call getPokemons when no id provided', () => {
      pokemon.resolve()
      expect(client.getPokemon).to.not.have.been.called
      expect(client.getPokemons).to.have.been.called
    })
  })
})