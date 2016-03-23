var express = require('express');
var router = express.Router();
require('dotenv').load();

var stripe = require('stripe')(process.env.STRIPE_KEY)


router.post('/', function(req, res, next) {
      var stripeToken = req.body.stripeToken;
      var charge = stripe.charges.create({
        amount: 1000, // amount in cents, again
        currency: "usd",
        source: stripeToken,
        description: "Example Shoveling"
      }, function(err, charge) {
        if (err && err.type === 'StripeCardError') {
          //Card declined.
          res.json(error);
        }
        res.redirect('https://skyffel.co/#/dashboard');
      });
    });
    module.exports = router;
