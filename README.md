# graphql-directive-pluralize

## Table of Contents

* [Introduction](#introduction)
* [Install](#install)
* [Usage](#usage)
* [Contributing](#contributing)
* [License](#license)

## Introduction

This is simple directive how to make you String fields pluralizeD. On top of it, this could be a good start point for anyone interested in building their own one.

## Install

`yarn add graphql-directive-pluralize`

_This package requires [graphql](https://www.npmjs.com/package/graphql) and [graphql-tools](https://www.npmjs.com/package/graphql-tools) as peer dependency_

## Usage

```js
import { makeExecutableSchema } from 'graphql-tools';
import { plural, singular } from 'graphql-directive-pluralize';
import typeDefs from './schema.graphql';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    plural,
    singular
  },
});
```

GraphQL schema:

```graphql
type Person {
  id: Int
  name: String @plural
}

type Query {
  persons: [Person]
}
```

## Contributing

I would love to see your contribution. ❤️

For local development (and testing) is all you have to do just `yarn` and then `yarn dev`. This will start the server (powered by Micro from ZEIT) and Babel for transpilation of index.js.

Run `yarn test` for unit tests (we using Jest)

## License

The MIT License (MIT) 2018 - Satyajit Sahoo
