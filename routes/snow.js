var express = require('express');
var router = express.Router();

/* GET snow listing. */

var snowTerms = ['snyag', 'sneeu', 'sneeuw', 'neu', 'thalaj', 'snow', 'nieve', 'la neve', 'neige', 'snezeni', 'chioni', 'himapaat', 'xue', 'Schnee', 'sno', 'sneg']


router.get('/', function(req, res, next) {
  var snow = snowTerms[Math.floor(Math.random()*(snowTerms.length))]
  res.json(snow);
});

module.exports = router;
