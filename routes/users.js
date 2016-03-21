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

router.get('/shovelers', function(req, res, next) {
  Users().where({shoveler: true}).select().then(function(data){
    res.json(data);
  })
});
module.exports = router;
