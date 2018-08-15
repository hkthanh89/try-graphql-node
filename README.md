#### Run tests
```
npm run test
npm run test-api
```

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

Credit to https://medium.com/@FdMstri/testing-a-graphql-server-13512408c2fb
This code has some modifications compare with origin version.

**TODO**
  - Reuse logic of app server instead using utils/server.js for tests
  - ...