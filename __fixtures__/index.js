require('babel-core/register');
require('babel-polyfill');

const { microGraphiql, microGraphql } = require('apollo-server-micro');
const { get, post, router } = require('microrouter');

const schema = require('./schema');

const graphqlHandler = microGraphql({ schema });
const graphiqlHandler = microGraphiql({ endpointURL: '/graphql' });

// expose basic dev server
module.exports = router(
  get('/graphql', graphqlHandler),
  post('/graphql', graphqlHandler),
  get('/graphiql', graphiqlHandler),
  () => 'Hey! You want to go probably to /graphiql endpoint instead.'
);
