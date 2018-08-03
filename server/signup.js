const db = require('../db/index.js');
const app = require('./index.js');
const util = require('./helpers/utilities.js');
var router = require('express').Router();

router.post('/signup', function (req, res) {
  //check for instance of user
  //if not, add new User to DB
  //Else render 'Username already taken' prompt
  let user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password
  };

  // talk with db to create a create
  // Eventally, we need to do form validation from server side, but we don't have right now.
  db.createUser(user, (err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      if (data.messageCode === 101 || data.messageCode === 102) {
        res.json(data);
      } else {
        util.createSession(req, res, data);
      }
    }
  });
});

module.exports = router;