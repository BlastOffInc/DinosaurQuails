const express = require('express');
const db = require('../db/index.js');

let job = express.Router();


job.delete('/job', (req, res) => {
  // add delete function to database
  // will rely upon params to delete by Id
  //! uses req.body req.body should ONLY contain id
  db.removeJob(req.body, (err, success) => {
    if (err) {
      // log error
      return res.sendStatus(500);
    }
    res.status(202).json({
      message: 'Job Removed'
    });
  });
});

job.put('/job', (req, res) => {
  // add delete function to database
  // will rely upon params to delete by Id
  //! uses req.body for the data
  console.log('Body: ', req.body)
  db.updateJob(req.body, (err, result) => {
    if (err) {
      // log error
      return res.sendStatus(404);
    }
    res.status(200).json({
      message: 'Successful Update'
    });
  });
  //! filtering of unimportant data should happen on front end?
});

module.exports = job;