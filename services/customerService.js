'use strict'

const db = require('../utils/cnx.js');


module.exports.getAll_Customer = async () => {
  try {
    const exists = await db.query('show tables like "customer";');
    if (exists.length != 0) {
      const user = await db.query('select id_customer,name,lastname,gender,phone,email,CASE WHEN status = 1 THEN "Activo" ELSE "Inactivo" END status,created,edited from customer where is_delete=0;', []);
      return user;
    }
    return [];
  } catch (error) {
    console.error('Error consumir BD:', error);
    return 0;
  }
};

module.exports.get_Customer = async (idCustomer) => {
  try {
    const exists = await db.query('show tables like "customer";');
    if (exists.length != 0) {
      const user = await db.query('select id_customer,name,lastname,gender,phone,email,CASE WHEN status = 1 THEN "Activo" ELSE "Inactivo" END status,created,edited from customer where id_customer = ?;', [idCustomer]);
      if (user.length != 0) {
        return user[0];
      }
    }
    return 1;
  } catch (error) {
    console.error('Error consumir BD:', error);
    return 0;
  }
};

module.exports.createCustomer = async (data) => {
  try {

    const exists = await db.query('show tables like "customer";');
    if (exists.length == 0) {
      await db.query(`create table customer (
                      id_customer int(11) NOT NULL AUTO_INCREMENT,
                      name varchar(250) NOT NULL,
                      lastname varchar(250) NOT NULL,
                      gender varchar(1) NOT NULL,
                      phone int(9)  NULL, 
                      email varchar(100)  NULL,
                      status int(1) DEFAULT 1,
                      is_delete int(1) DEFAULT 0,
                      created datetime(0) NULL,
                      edited datetime(0) NULL,
                      PRIMARY KEY (id_customer))`);
    }

    const data_insert = [
      data.name,
      data.lastname,
      data.gender.toUpperCase(),
      data.email,
      data.phone
    ];
    const result = await db.query(`insert into customer (name,lastname,gender,email,phone,created) values (?,?,?,?,?,now());`, data_insert);
    return result.insertId;
  } catch (error) {
    console.error('Error consumir BD:', error);
    return 0;
  }
};