var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var jwt = require('jsonwebtoken');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;


require('dotenv').load();

var Users = function() {
  return knex('users');
}

passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL : process.env.HOST +'/auth/facebook/callback'
},
function(accessToken, refreshToken, profile, done) {
  console.log('profile', profile);
    var profile_id = profile.id;
    findUserByID(profile_id).then(function(user) {
      console.log('Existing User...');
      console.log(user);
      done(null, {
        user: user
      });
    }).catch(function(err) {
      if(err.notFound) {
        console.log('Creating User...');
        createUser({
          profile_id: profile_id,
          shoveler: false,
          home_address: null,
          zipcode: null
        }).then(function(user) {
          done(null, {
            user: user
          });
        }).catch(function(err){
          done(err);
        });
      } else {
        console.log('Error...');
        console.log(err);
        done(err);
      }
    });
  }
));


function findUserByID(id) {
  return Users().where('profile_id', id).first()
  .then(function(user){
      if(user) {
        return user;
      } else {
        return Promise.reject({notFound:true});
      }
  }).catch(function(err){
    return Promise.reject(err);
  });
}

function createUser(user) {
  // if(user.google) {
  //   user = {email:user.email,password:null};
  // } else {
  //   if(!validPassword(user.password)) return Promise.reject('Password cannot be blank');

  //   var hash = bcrypt.hashSync(user.password, 8);
  //   user = {email:user.email,password:hash};
  // }

  return Users().insert(user, 'id').then(function(id) {
    user.id = id[0];
    return user;
  }).catch(function(err) {
    return Promise.reject(err);
  });
}


// function validPassword(p) {
//   return typeof p !== 'undefined' && p !== null && typeof p == 'string' &&  p.trim() !== '';
// }


function createToken(user) {
  return new Promise(function(resolve, reject){
    jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '1d' },
      function(token) {
        resolve(token);
      });
  });
}


router.get('/facebook',
  passport.authenticate('facebook', { scope: 'email' }));


router.get('/facebook/callback', function(req, res, next) {
  passport.authenticate('facebook', function(err, user){
    if(err){
      console.log('error', err);
      res.json(err)
    } else {
      console.log('user', user);
      createToken(user).then(function(token){
        res.redirect(process.env.CLIENT_CALLBACK + token);
    });
    }
  })(req, res, next);
});







var user = {
  name: 'Derik',
  password: 'abc',
}

router.post('/login', function(req, res){
  console.log(req.body);
  if(req.body.name=='Derik' && req.body.password == 'abc') {
    //YAY

    jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '30d'}, function(token){
      console.log(token);
      res.json({
        token: token
      });
    });
  } else {
    res.status(401);
    console.log('auth fail 401')
    res.json({
      message: 'Unauthorized',
    });
  }
});

module.exports = router;
