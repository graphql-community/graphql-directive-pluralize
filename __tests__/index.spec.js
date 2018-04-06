const pluralize = require('pluralize');
const { graphql } = require('graphql');
const { plural, singular } = require('../index');
const schema = require('../__fixtures__/schema');

it('defines initial declaration', () => {
  expect(plural.getDirectiveDeclaration()).toMatchSnapshot();
  expect(singular.getDirectiveDeclaration()).toMatchSnapshot();
});

it('changes given string field to plural', () => {
  const instance = new plural('plural');
  const field = {};

  instance.visitFieldDefinition(field);

  return expect(
    field.resolve({ id: 5, name: 'Apple' }, {}, {}, { fieldName: 'name' })
  ).resolves.toEqual('Apples');
});

it('changes given string field to singular', () => {
  const instance = new singular('singular');
  const field = {};

  instance.visitFieldDefinition(field);

  return expect(
    field.resolve({ id: 5, name: 'Apples' }, {}, {}, { fieldName: 'name' })
  ).resolves.toEqual('Apple');
});

it('ignores non-string fields', () => {
  const instance = new plural('plural');
  const field = {};

  instance.visitFieldDefinition(field);

  return expect(
    field.resolve({ id: 0 }, {}, {}, { fieldName: 'id' })
  ).resolves.toEqual(0);
});

it('graphql query should return correctly modified entity', async () => {
  const response = await graphql(
    schema,
    `
      query data {
        fruits {
          name
        }
      }
    `
  );

  response.data.fruits.forEach(({ name }) => {
    expect(name).toBe(pluralize.plural(name));
  });
});
