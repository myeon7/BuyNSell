// Hashing password 
// Resource: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Connecting to PostgreSQL DB: buyNsell
// Resource: https://node-postgres.com/features/connecting
const { Pool, Client } = require('pg');
const connectionString = 'postgres://qpywrjcc:lk7ew8fi6LoK8aWAHs2NABS9O8ryedNb@jelani.db.elephantsql.com/qpywrjcc';
const db = new Pool({ connectionString });

const bsdbController = {};

// Login (user verification)
bsdbController.verifyUser = (req, res, next) => {
  const { id, pw } = req.body;
//   console.log(id, pw);

  db.query(`SELECT user_id, pw FROM bsusers WHERE id='${id}'`, (error, response) => {
    if (error) next(error);
    const userInfo = response.rows[0];
    bcrypt.compare(pw, userInfo.pw, (err, result) => {
      if (err) console.log('ERROR in bcrpyting of bsdbController.getUser');
      console.log('User found?', result);
      if (result) {
        res.locals.found = true;
        res.locals.user = userInfo.user_id;
      }
      else {
        res.locals.found = false;
      }
      next()
    });
  });
};

// SIGN UP (create new user)
bsdbController.createUser = (req, res, next) => {
  const { id, pw, firstname, lastname, age, state, zipcode, address1, address2 } = req.body;
  console.log(id, pw, firstname, lastname, age, state, zipcode, address1, address2);

  let uniqueId = Number(age) * Number(zipcode) - Math.floor(Math.random(1,99)); // unique id how..? 

  bcrypt.genSalt(saltRounds, (err1, salt) => {
    if (err1) next(err1);
    bcrypt.hash(pw, salt, (err2, hash) => {
      if (err2) next(err2);
      db.query(`INSERT INTO bsuser VALUES ('${uniqueId}', '${firstname}', '${lastname}', '${age}', '${state}', '${zipcode}', '${address1}', '${address2}'); INSERT INTO bsusers VALUES ('${uniqueId}', '${id}', '${hash}');`, (error, response) => {
        if (error) next(error);
        next();
      });
    });
  });
};

// Main (show all products)
bsdbController.getAllProduct = (req, res, next) => {
  db.query('SELECT * FROM product', (error, response) => {
    if (error) next(error);
    const products = response.rows;
    res.locals.products = products;
//   console.log(products);
    next();
  });
};

// Add New Product 
bsdbController.addNewProduct = (req, res, next) => {
  const { id, category, name, price, condition, upload_date, zipcode, details, status, seller_id, pickup, delivery, shipping } = req.body;
  db.query(`INSERT INTO product VALUES (${id}, ${category}, ${name}, ${price}, ${condition}, ${upload_date}, ${zipcode}, ${details}, ${status}, ${seller_id}); INSERT INTO transaction_method VALUES (${id}, ${pickup}, ${delivery}, ${shipping});
  `, (error, response) => {
    if (error) next(error);
    next();
  });
};

module.exports = bsdbController;