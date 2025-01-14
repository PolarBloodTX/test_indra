'use strict'
const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const query = async (sql, params=[]) => {
    console.log(sql, params);
    const [rows, fields] = await pool.execute(sql, params);
    return rows;
};

module.exports = {
    query,
    pool,
};
