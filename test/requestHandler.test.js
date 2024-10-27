const { getAllFilms, getFilm } = require('../handlers/request.js');
const nock = require('nock');

describe('Request Handler', () => {
  // valida que el proveedor este vigente
  beforeAll(() => {
    nock('https://swapi.py4e.com')
      .get('/api/people/1');
  });

  afterAll(() => {
    nock.cleanAll();
  });

  test('Retorna status 200 e info de todas las peliculas', async () => {
    const event = { pathParameters: { id: '1' } };
    const context = {};

    const result = await getAllFilms(event, context);
    expect(result.statusCode).toBe(200);
  });

  test('Retorna status 200 e info de una pelicula', async () => {
    const event = { pathParameters: { id: '1' } };
    const context = {};

    const result = await getFilm(event, context);
    expect(result.statusCode).toBe(200);
  });

  test('Retorna status 404 cuando no encuentra pelicula', async () => {
    const event = { pathParameters: { id: '123123' } };
    const result = await getFilm(event, {});
    expect(result.statusCode).toBe(404);
  });

  test('Retorna status 400 cuando el parametro id no es compatible', async () => {
    const event = { pathParameters: { id: 'asdas' } };
    const result = await getFilm(event, {});
    expect(result.statusCode).toBe(400);
  });
});
