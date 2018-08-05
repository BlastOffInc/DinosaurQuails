const request = require('request');

var DomParser = require('dom-parser');

// Utilities for session care

const checkUser = (req, res, next) => {
  if (!req.user) {
    res.redirect('/');
  } else {
    next();
  }
};

const getJobInfo = (URL, callback) => {
  console.log('in get jobinfo utilities'); //made it to here
  var options = {
    uri: 'https://www.indeed.com/viewjob?jk=bb2be58dc7d2e3e1&tk=1cju2gdkv0g6u1r7&from=vjnewtab',
  };
  request.get(options, (err, res, body) => {
    if (err) {
      console.log('this no working');
    } else {
      console.log('Got that job info:', res);
      var parser = new DomParser();
      var doc = parser.parseFromString(body, 'text/html');
      var jobtitle = doc.getElementsByClassName('jobtitle')[0].textContent;
      callback(body);
      console.log('jobtitle', jobtitle);
    }
  });
};

module.exports.checkUser = checkUser;
module.exports.getJobInfo = getJobInfo;