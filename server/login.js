const router = require('express').Router();
const passport = require('./configs/passport');

router.get('/', passport.authenticate('google', {
  scope: ['profile', 'email', 'https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.readonly']
}));

router.get('/callback', passport.authenticate('google', {
  failureRedirect: '/'
}), (req, res) => {
  res.redirect('/');
});

router.get('/user', (req, res) => {
  res.send({
    user: req.user
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
})
module.exports = router;