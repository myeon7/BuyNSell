// Hashing password 
// Resource: https://www.npmjs.com/package/bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;
// Connecting to PostgreSQL DB: buysell
// Resource: https://expressjs.com/en/guide/database-integration.html#postgresql
const { Pool, Client } = require('pg');
const connectionString = 'postgres://qpywrjcc:lk7ew8fi6LoK8aWAHs2NABS9O8ryedNb@jelani.db.elephantsql.com/qpywrjcc';
const db = new Pool({ connectionString });

const bsdbController = {};

bsdbController.getAllProduct = (req, res, next) => {
  db.query('SELECT * FROM product', (error, response) => {
    if (error) next(error);
    const products = response.rows;
    console.log(products);
    res.locals.products = products;
    next();
  });
};

bsdbController.getUser = (req, res, next) => {
  const { id, pw } = req.body;
  console.log(id, pw);

  db.query(
    `SELECT pw FROM bsusers WHERE id='${id}'`, 
    (error, response) => {
      if (error) next(error);
      const passwords = response.rows;
      for (let p of passwords) {
        bcrypt.compare(p.pw, hash, (err, result) => {
          if (result) {
            res.locals.found = true;
            next()
          }
        });
      }
      res.locals.found = false;
      next();
    }
  );
};

bsdbController.createUser = (req, res, next) => {
  const { id, pw, firstname, lastname, age, state, zipcode, address1, address2 } = req.body;
//   console.log(id, pw, firstname, lastname, age, state, zipcode, address1, address2);

  let uniqueId = Number(age) * Number(zipcode) - Math.floor(Math.random(1,99)); // unique id how..? 

  bcrypt.genSalt(saltRounds, (err1, salt) => {
    if (err1) {
      console.log('err1 occured');
      next(err1);
    }
    bcrypt.hash(pw, salt, (err2, hash) => {
      if (err2) {
        console.log('err2 occured');
        next(err2);
      }
      db.query(
        `INSERT INTO bsuser VALUES ('${uniqueId}', '${firstname}', '${lastname}', '${age}', '${state}', '${zipcode}', '${address1}', '${address2}'); INSERT INTO bsusers VALUES ('${uniqueId}', '${id}', '${hash}');`, 
        (error, response) => {
          if (error) {
            console.log('REAL Error')
            next(error);
          }
          next();
        }
      );
    })
  })
};

module.exports = bsdbController;