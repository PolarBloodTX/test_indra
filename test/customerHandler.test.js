const { getAllCustomer,getCustomer } = require('../handlers/customer.js');
const nock = require('nock');

describe('Customer Handler', () => {
  afterAll(() => {
    nock.cleanAll();
  });

  test('Retorna status 200 e info de todos los clientes', async () => {
    const event = { pathParameters: { id: '1' } };
    const context = {};

    const result = await getAllCustomer(event, context);
    expect(result.statusCode).toBe(200);
  });

  test('Retorna status 200 e info de cliente', async () => {
    const event = { pathParameters: { id: '1' } };
    const context = {};

    const result = await getCustomer(event, context);
    expect(result.statusCode).toBe(200);
  });

  test('Retorna status 404 cuando no encuentra cliente', async () => {
    const event = { pathParameters: { id: '123123' } };
    const result = await getCustomer(event, {});
    expect(result.statusCode).toBe(404);
  });

  test('Retorna status 400 cuando el parametro id no es compatible', async () => {
    const event = { pathParameters: { id: 'asdas' } };
    const result = await getCustomer(event, {});
    expect(result.statusCode).toBe(400);
  });
});
