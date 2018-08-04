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
const PATH = require('path');
const application = require('./application');
const jobimport = require('./jobimport.js');

/****** SETUP HEADERS *****/
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Requested-With');
  next();
});

/****** SETUP MIDDLEWARE *****/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'jurassic eggs',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: true },
  })
);
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
app.post('/jobs', jobs);
app.get('/jobs/sampleData', jobs);
app.get('/jobs', jobs);

app.put('/job', job);
app.delete('/job', job);
/**
 * Note on Authentication:
 * Ideally our team wanted to utilize Passport. However, we wanted to implement simple auth first
 * then later add passport. I'd recommend any team picking this up to switch over to Passport completely
 * Note that you may need to make changes to the UserSchema and other places to implement Passport completely.
 */
app.post('/signup', require('./signup.js'));
app.get('/signup', require('./signup.js'));

app.post('/login', require('./login.js'));
app.get('/login', require('./login.js'));

app.use('/application', application);

// app.use('/jobimport', jobimport);

app.get('/logout', function(req, res) {
  req.session.destroy(function() {
    res.status(200).json({ message: 'Successful Logout' });
  });
});

const PORT = process.env.PORT || 3000;

//Establish port#
app.listen(PORT, function() {
  console.log('Get the Job Cat at port: ', PORT);
});

//save update
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
