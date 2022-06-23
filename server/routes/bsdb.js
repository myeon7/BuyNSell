const express = require('express');
const bsdbRouter = express.Router();
const bsdbController = require('../controllers/bsdbController');
const bodyParser = require('body-parser')


bsdbRouter.use(bodyParser.json())
bsdbRouter.use(bodyParser.urlencoded({extended: true}))

// [R] Login exiting user 
bsdbRouter.get('/login', bsdbController.getUser, (req, res) => {
  if (res.locals.found) res.send('FOUND USER');
  res.send('No such user');
});
// [C] Register new user
bsdbRouter.post('/signup', bsdbController.createUser, (req, res) => {
  res.send({});
});

// [R] (MAIN PAGE) Display all products 
bsdbRouter.get('/', bsdbController.getAllProduct, (req, res) => {
  res.status(200).send(res.locals.products);
})






module.exports = bsdbRouter;