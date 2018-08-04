const express = require('express');
const db = require('../db/index.js');

let application = express.Router();

application
  .route('/')
  .post((req, res) =>
    db
      .addApplication(req.body)
      .then(() => res.sendStatus(201))
      .catch(err => res.status(400).send(err))
  )
  .patch((req, res) =>
    db
      .got(req.body) //? type: 'callback' or 'interview'
      .then(() => res.sendStatus(201))
      .catch(err => res.status(400).send(err))
  );

application.route('/analytics').get((req, res) =>
  db['get' + req.query.type + 'Stats'](req.query) //? type: 'All' or 'My'
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
);

module.exports = application;
