const express = require('express');
const db = require('../db/index.js');
const bodyParser = require('body-parser');
const session = require('express-session');
const morgan = require('morgan');
const util = require('./helpers/utilities.js');
const app = express();
const createUser = require('../db/index.js').createUser;
const jobs = require('./jobs');
const job = require('./job');
const signup = require('./signup');
const login = require('./login');
const PATH = require('path');
<<<<<<< 78e3bd427d1325e376f69f313308e4487f2a34c3
const application = require('./application');
const jobimport = require('./jobimport.js');
=======
>>>>>>> temporary merged

/****** SETUP MIDDLEWARE *****/
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body);
  next();
});
app.use(
  session({
    secret: 'jurassic eggs',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 86400000, // one day in ms
      secure: true
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
<<<<<<< 78e3bd427d1325e376f69f313308e4487f2a34c3
/**
 * Some notes on routing. Our team ran into issues when setting up express.router().
 * Normally you'd utilize app.use(endpoint, routelocation). We couldn't get app.use to work.
 * Every time we attempted to utilize it, the server wouldn't reach the endpoint.
 */
app.post('/jobs', jobs);
app.get('/jobs/sampleData', jobs);
app.get('/jobs', jobs);
=======
>>>>>>> temporary merged

app.use('/jobs', util.checkUser, jobs);

app.use('/job', util.checkUser, job);

app.use('/signup', signup);

<<<<<<< 78e3bd427d1325e376f69f313308e4487f2a34c3
// app.use('/jobimport', jobimport);

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.status(200).json({ message: 'Successful Logout' });
=======
app.use('/auth/google', login);
app.use('/application', util.checkUser, application);
app.get('/logout', util.checkUser, function (req, res) {
  req.session.destroy(function () {
    res.status(200).json({
      message: 'Successful Logout'
    });
>>>>>>> temporary merged
  });
});

const PORT = process.env.PORT || 3000;

//Establish port#
app.listen(PORT, function () {
  console.log('Get the Job Cat at port: ', PORT);
});

//save update
<<<<<<< 78e3bd427d1325e376f69f313308e4487f2a34c3
module.exports = app;

app.get('/joburl', function(req, res) {
  var link = req.body.link;
  console.log('line 71 post server', link);
  util.getJobInfo(link, function(err, data) {
    if (err) {
      res.sendStatus(500);
      console.log('why is the request not going through');
    } else {
      console.log('hi');
      res.send(data);
    }
  });
});
=======
module.exports = app;
>>>>>>> temporary merged
