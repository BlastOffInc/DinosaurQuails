const express = require('express');
const util = require('./helpers/utilities.js');
let jobimport = express.Router();

jobimport.route('/').get((req, res) =>
  util
    .getJobInfo(req.body.url)
    .then(data => res.status(200).send(data))
    .catch(err => res.status(400).send(err))
);

module.exports = jobimport;
