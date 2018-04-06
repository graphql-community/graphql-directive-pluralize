const { makeExecutableSchema } = require('graphql-tools');
const { plural, singular } = require('../index');
const mockedData = require('./data.json');

const typeDefs = `
  type Fruit {
    id: Int 
    name: String @plural 
  }

  type Query {
    fruits: [Fruit]
  }
`;

const resolvers = {
  Query: {
    fruits: () => mockedData,
  },
};

// let the magic begin
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  schemaDirectives: {
    plural,
    singular,
  },
});

module.exports = schema;
