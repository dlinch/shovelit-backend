var express = require('express');
var router = express.Router();
var knex = require('../db/knex');


var Users = function() {
  return knex('users')
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users().select().then(function(data){
    res.json(data);
  })
});

router.put('/update', function(req, res, next){
  Users().where("id", req.query.id).update({
      home_address: req.query.home,
      zipcode: req.query.zipcode
  }).then(function(data){
    res.json(data)
  }).catch(function(error){
    res.json(error)
  })
})

module.exports = router;
