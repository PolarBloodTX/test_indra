'use strict'
const swService = require('../services/swapiService.js');
const helper = require('../utils/helper.js');

/* films */
module.exports.getAllFilms = async (event) => {
    try {
        const films = await swService.getAll_Records('films');
        if (films === 0) {
            return {
                statusCode: 500,
                body: helper.Respuesta(-1, 'error service provider', [])
            };
        }
        const n_films = films.map(item => helper.map_object('film',item));
        return {
            statusCode: 200,
            body: helper.Respuesta(0, 'sucess list', n_films)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: helper.Respuesta(-1, 'error service', [])
        };
    }
};
module.exports.getFilm = async (event) => {
    const idFilm = event.pathParameters.id;
    try {
        if (/[a-zA-Z]/.test(idFilm)) {
            return {
                statusCode: 400,
                body: helper.Respuesta(1, 'id value is incorrect', [])
            };
        }

        const film = await swService.get_Record('films', idFilm);
        if (film === 1) {
            return {
                statusCode: 404,
                body: helper.Respuesta(2, 'data not found', [])
            };
        }
        if (film === 0) {
            return {
                statusCode: 500,
                body: helper.Respuesta(-1, 'error service provider', [])
            };
        }

        const n_film = helper.map_object('film', film);

        return {
            statusCode: 200,
            body: helper.Respuesta(0, 'sucess list', n_film)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: helper.Respuesta(-1, 'error service', [])
        };
    }
};


/* people */
module.exports.getAllPeople = async (event) => {
    try {
        const people = await swService.getAll_Records('people');
        if (people === 0) {
            return {
                statusCode: 500,
                body: helper.Respuesta(-1, 'error service provider', [])
            };
        }
        
        const n_people = people.map(item => helper.map_object('people',item));

        return {
            statusCode: 200,
            body: helper.Respuesta(0, 'sucess list', n_people)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: helper.Respuesta(-1, 'error service', [])
        };
    }
};
module.exports.getPerson = async (event) => {
    const idPerson = event.pathParameters.id;
    try {
        if (/[a-zA-Z]/.test(idPerson)) {
            return {
                statusCode: 400,
                body: helper.Respuesta(1, 'id value is incorrect', [])
            };
        }

        const person = await swService.get_Record('people', idPerson);
        if (person === 1) {
            return {
                statusCode: 404,
                body: helper.Respuesta(2, 'data not found', [])
            };
        }
        if (person === 0) {
            return {
                statusCode: 500,
                body: helper.Respuesta(-1, 'error service provider', [])
            };
        }


        const n_person = helper.map_object('people', person);

        return {
            statusCode: 200,
            body: helper.Respuesta(0, 'sucess list', n_person)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: helper.Respuesta(-1, 'error service', [])
        };
    }
};