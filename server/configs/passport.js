const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const key = require('../../config/config');
const User = require('../../db/index.js').User;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CONSUMER_KEY || key.GOOGLE_CONSUMER_KEY,
    clientSecret: process.env.GOOGLE_CONSUMER_SECRET || key.GOOGLE_CONSUMER_SECRET,
    callbackURL: process.env.CALLBACKURL || "http://localhost:3000/auth/google/callback" //! Probably won't be working on heroku
  },
  function (token, tokenSecret, profile, done) {
    console.log("profile", profile);
    User.findOne({
      googleId: profile.id
    }).then(user => {
      if (user) {
        done(null, user);
      } else {
        new User({
          userName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          googleId: profile.id
        }).save().then((newUser) => {
          done(null, newUser);
        })
      }
    });
  }
));

passport.serializeUser((user, done) => {
  done(null, user.googleId);
});

passport.deserializeUser((googleId, done) => {
  User.findOne({
    googleId: googleId
  }, (err, user) => {
    done(null, user);
  });
});

module.exports = passport;