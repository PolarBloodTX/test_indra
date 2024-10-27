'use strict'
const cService = require('../services/customerService.js');
const helper = require('../utils/helper.js');

module.exports.getAllCustomer = async (event) => {
    try {
        const customers = await cService.getAll_Customer();
        if (customers === 0) {
            return {
                statusCode: 500,
                body: helper.Respuesta(-1, 'error service provider', [])
            };
        }
        const n_customer = customers.map(item => helper.map_object('customer',item));
        
        return {
            statusCode: 200,
            body: helper.Respuesta(0, 'customers list', n_customer)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: helper.Respuesta(-1, 'error service', [])
        };
    }
};


module.exports.getCustomer = async (event) => {
    const customerId = event.pathParameters.id;
    try {
        if (/[a-zA-Z]/.test(customerId)) {
            return {
                statusCode: 400,
                body: helper.Respuesta(1, 'id value is incorrect', [])
            };
        }

        const customer = await cService.get_Customer(customerId);
        if (customer === 1) {
            return {
                statusCode: 404,
                body: helper.Respuesta(2, 'data not found', [])
            };
        }
        if (customer === 0) {
            return {
                statusCode: 500,
                body: helper.Respuesta(-1, 'error service provider', [])
            };
        }
        const n_customer = helper.map_object('customer', customer);

        return {
            statusCode: 200,
            body: helper.Respuesta(0, 'customer list', n_customer)
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: helper.Respuesta(-1, 'error service', [])
        };
    }
};

module.exports.registerCustomer = async (event) => {
    const data = JSON.parse(event.body);
    try {
        const validate_form = validate_request(data);
         
        if (validate_form !== null) {
            return {
                statusCode: 400,
                body: helper.Respuesta(1, validate_form, [])
            };
        }
        const filter_email = /[\w-\.]{3,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
        const filter_number = /^([0-9])*$/;
        if (!filter_email.test(data.email)) {
            return {
                statusCode: 400,
                body: helper.Respuesta(1, 'El campo "email" debe ser un correo válido', []),
            };
        }
        if (!filter_number.test(data.phone)) {
            return {
                statusCode: 400,
                body: helper.Respuesta(1, 'El campo "phone" debe ser un número válido', []),
            };
        }

        if (data.gender.toLowerCase() != 'f' && data.gender.toLowerCase() != 'm') {
            return {
                statusCode: 400,
                body: helper.Respuesta(1, 'El campo "gender" puede ser F: feminino / M: masculino', []),
            };
        }

        const nCustomer = await cService.createCustomer(data);
        if (nCustomer == 0) {
            return {
                statusCode: 500,
                body: helper.Respuesta(-1, 'error while insert new customer', [])
            };
        }

        return {
            statusCode: 200,
            body: helper.Respuesta(0, 'customer created', { lastid: nCustomer })
        };
    } catch (error) {
        console.log(error);
        return {
            statusCode: 500,
            body: helper.Respuesta(-1, 'error service', [])
        };
    }
};

function validate_request(json_validate) {
    if (json_validate.name == undefined || json_validate.name.length == 0) {
        return 'El campo "name" es obligatorio';
    }
    if (json_validate.lastname == undefined || json_validate.lastname.length == 0) {
        return 'El campo "lastname" es obligatorio';
    }
    if (json_validate.gender == undefined) {
        return 'El campo "gender" es obligatorio';
    }
    if (json_validate.email == undefined || json_validate.email.length == 0) {
        return 'El campo "email" es obligatorio';
    }
    if (json_validate.phone == undefined || json_validate.phone.length == 0) {
        return 'El campo "phone" es obligatorio';
    }
    return null;
}