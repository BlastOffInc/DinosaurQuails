const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const util = require('./helpers/utilities.js');
const app = express();
const jobs = require('./jobs');
const job = require('./job');
const login = require('./login');
const PATH = require('path');
const application = require('./application');
const jobimport = require('./jobimport.js');
const SECRET = require('../config/config').SECRET;
const passport = require('passport');
/****** SETUP MIDDLEWARE *****/
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(
  session({
    secret: process.env.SECRET || SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000, // one day in ms
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

/****** SERVE STATIC FILES *****/
app.use(express.static(PATH.join(__dirname, '/../client/dist')));

/****** SETUP ROUTES *****/
app.get('/', util.checkUser, (req, res) => {
  // Just checks verification status.
});
/**
 * Some notes on routing. Our team ran into issues when setting up express.router().
 * Normally you'd utilize app.use(endpoint, routelocation). We couldn't get app.use to work.
 * Every time we attempted to utilize it, the server wouldn't reach the endpoint.
 */

app.get('/jobs/sampleData', jobs);

app.use('/jobs', util.checkUser, jobs);

app.use('/job', util.checkUser, job);

app.use('/auth/google', login);
app.use('/application', util.checkUser, application);

const PORT = process.env.PORT || 3000;

//Establish port#
app.listen(PORT, function () {
  console.log('Get the Job Cat at port: ', PORT);
});

//save update
module.exports = app;

app.get('/joburl', function (req, res) {
  var link = req.body.link;
  console.log('line 71 post server', link);
  util.getJobInfo(link, function (err, data) {
    if (err) {
      res.sendStatus(500);
      console.log('why is the request not going through');
    } else {
      console.log('hi');
      res.send(data);
    }
  });
});