'use strict'
const axios = require('axios');
require('dotenv').config();
const URL = process.env.PROVIDER_URL;

module.exports.getAll_Records = async (path) => {
    try {
        const provider_url = URL.replace("{resource}", path);
        const response = await axios.get(provider_url);
        if(response.status == 200){
            const data = response.data.results;
            return data;
        }else{
            return [];
        }
    } catch (error) {
        console.error('Error al llamar a la API externa:', error);
        return 0;
    }
};

module.exports.get_Record = async (path,id) => {
    try {
        const provider_url = URL.replace("{resource}", path);
        const apiUrl = provider_url + '/' + id;
        const response = await axios.get(apiUrl);
        if(response.status == 200){
            const data = response.data;
            return data;
        }else{
            return {};
        }
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return 1;
        } else {
            console.error('Error al llamar a la API externa:', error);
            return 0;
        }
    }
};