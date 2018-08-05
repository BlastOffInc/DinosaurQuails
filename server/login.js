const router = require('express').Router();
const passport = require('./config/passport');

router.get('/', passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/plus.login']
}));

router.get('/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/');
});

router.get('/user', (req, res) => {
  res.send(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})
module.exports = router;





// login.post('/login', function(req, res) {
//   //send auth query to DB
//   //if affirmed redirect to '/jobs'
//   let query = {
//     email: req.body.email,
//     password: req.body.password
//   };

//   // Eventually, we should have server side form validation before talking to DB,
//   // because DB transaction is sort of expensive
//   db.login(query, (err, data) => {
//     if (err) {
//       res.sendStatus(500);
//     } else {
//       if (data.messageCode === 104 || data.messageCode === 103) {
//         res.json(data);
//       } else {
//         util.createSession(req, res, data); //<- send something to indicate/initiate 'session' state change
//       }
//     }
//   });
// });
// login.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Origin, X-Requested-With');
//   next();
// })

// login.get('/callback', passport.authenticate('google', {
//   failureRedirect: '/'
// }), function (req, res) {
//   console.log(req);
//   res.redirect('/');
// });