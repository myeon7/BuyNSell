const express = require('express');
const bsdbRouter = express.Router();
const bsdbController = require('../controllers/bsdbController');
const bodyParser = require('body-parser')

bsdbRouter.use(bodyParser.json())
bsdbRouter.use(bodyParser.urlencoded({extended: true}))

// [R] Login exiting user 
bsdbRouter.get('/login', bsdbController.verifyUser, (req, res) => {
  if (res.locals.found) return res.status(200).send(res.locals.user);
  return res.send('No such user');
});
// [C] Register new user
bsdbRouter.post('/signup', bsdbController.createUser, (req, res) => {
  return res.send('Successfully Registered!');
});

// [R] (MAIN PAGE) Display all products 
bsdbRouter.get('/', bsdbController.getAllProduct, (req, res) => {
  return res.status(200).send(res.locals.products);
})
// [C] Add new product
bsdbRouter.post('/addproduct', bsdbController.addNewProduct, (req, res) => {
    return res.send({});
})


module.exports = bsdbRouter;