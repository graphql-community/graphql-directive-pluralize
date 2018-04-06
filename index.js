const {
  DirectiveLocation,
  GraphQLDirective,
  defaultFieldResolver,
} = require('graphql');
const { SchemaDirectiveVisitor } = require('graphql-tools');
const { plural, singular } = require('pluralize');

const createDirective = ({ name, description, formatter }) =>
  class PluralizeDirective extends SchemaDirectiveVisitor {
    static getDirectiveDeclaration(directiveName = name, schema) {
      return new GraphQLDirective({
        name: directiveName,
        description,
        locations: [DirectiveLocation.FIELD_DEFINITION],
      });
    }

    visitFieldDefinition(field) {
      const { resolve = defaultFieldResolver } = field;

      // eslint-disable-next-line
      field.resolve = function(...args) {
        return Promise.resolve(resolve.apply(this, args)).then(result => {
          if (typeof result === 'string') {
            return formatter(result);
          }
  
          return result;
        });
      };
    }
  };

module.exports = {
  plural: createDirective({
    name: 'plural',
    description: 'Pluralizes a field (string)',
    formatter: plural,
  }),
  singular: createDirective({
    name: 'singular',
    description: 'Singularizes a field (string)',
    formatter: singular,
  }),
};
