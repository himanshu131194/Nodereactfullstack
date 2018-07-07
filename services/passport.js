const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

// serialize and deserialize
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id).
        then((user)=>{
              console.log(user);
              done(null, user)
        })
});
passport.use(
  new GoogleStrategy({
     clientID : keys.googleClientID,
     clientSecret : keys.googleClientSecret,
     callbackURL : '/auth/google/callback'
  }, (accessToken, refreshToken, profile, done)=>{
    User.findOne({googleId: profile.id}).
        then((existingUser)=>{
            console.log(existingUser);
           if(existingUser){
             done(null, existingUser);
           }else{
             let user = new User({
                googleId : profile.id
             });
             user.save((err)=>{
                  if(err)
                    console.log(err);
             }).
             then((user)=>{
                done(null, user);
             });
           }
        })
    console.log(profile.id);
  })
)
