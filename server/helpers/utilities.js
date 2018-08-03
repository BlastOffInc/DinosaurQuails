const request = require('request');

var DomParser = require('dom-parser');

// Utilities for session care
const axios = require('axios');

<<<<<<< 78e3bd427d1325e376f69f313308e4487f2a34c3
const createSession = (req, res, newUser) => {
  return req.session.regenerate(() => {
    req.session.user = newUser;
    // data for frontEnd
    //extract everything from newUser except password.
    // add an additional tag to update front end of logged in status
    let withoutPass = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      userName: newUser.userName,
      email: newUser.email,
      _id: newUser._id,
    };
    res.send(withoutPass);
  });
};
=======
// const createSession = (req, res, newUser) => {
//   return req.session.regenerate(() => {
//     req.session.user = newUser;
//     // data for frontEnd
//     //extract everything from newUser except password.
//     // add an additional tag to update front end of logged in status
//     let withoutPass = {
//       firstName: newUser.firstName,
//       lastName: newUser.lastName,
//       userName: newUser.userName,
//       email: newUser.email,
//       _id: newUser._id
//     }
//     res.send(withoutPass);
//   });
// };
>>>>>>> temporary merged

const isLoggedIn = (req, res) => {
  return req.user ? true : false;
};

//Refactor this function to communicate with front-end to change state
//this will likely mean sending an object with a specific key
//TLDR: Change 'session' state instead of redirecting.
const checkUser = (req, res, next) => {
  if (!exports.isLoggedIn(req)) {
    // res.redirect('/login');
    res.json({
      messageCode: 401,
      message: 'User Must Login'
    });
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

module.exports.getJobInfo = getJobInfo;

//! add detailed explanation in docs for fantastic name :)
// const logoGo = (domain, cb) => {

//*   let cleanDomain = domain.split('www.')[1];

//*   axios.get(`https://logo.clearbit.com/${cleanDomain}`)
//   .then(logo => console.log('I AM THE LOG: ', JSON.parse(logo.data)))
//   .catch(error => cb(error, null));
// }

// module.exports.logoGo = logoGo;
module.exports.createSession = createSession;
module.exports.isLoggedIn = isLoggedIn;
<<<<<<< 78e3bd427d1325e376f69f313308e4487f2a34c3
module.exports.checkUser = checkUser;
module.exports.getJobInfo = getJobInfo;
=======
module.exports.checkUser = checkUser;
>>>>>>> temporary merged
