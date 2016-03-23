var express = require('express');
var router = express.Router();
require('dotenv').load();
var knex = require('../db/knex');


var stripe = require('stripe')(process.env.STRIPE_KEY)

var Jobs = function() {
  return knex('jobs')
}


router.post('/:jobID', function(req, res, next) {
  Jobs().where('id', req.params.jobID)
  .update({
    paid: true
  }).then(function(){
    var stripeToken = req.body.stripeToken;
    var charge = stripe.charges.create({
      amount: 1000, // amount in cents, again
      currency: "usd",
      source: stripeToken,
      description: "Example Shoveling"
    }, function(err, charge) {
      if (err && err.type === 'StripeCardError') {
        //Card declined.
        
      }
      res.redirect('https://skyffel.co/#/dashboard');
    });



  })

});
module.exports = router;
