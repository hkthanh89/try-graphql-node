#### GraphiQL
```
http://localhost:3001/graphiql
```

#### Get a pokemon
```
query {
  pokemon(id: 1) {
    id
    name
    order
    img
  }
}
```

#### Get list pokemons
```
query {
  pokemons {
    id
    name
    order
    img
  }
}
```

**NOTE**: `query` can be omitted.

Credit to: https://medium.com/@FdMstri/build-a-graphql-server-and-catch-em-all-af7a8f3bc111