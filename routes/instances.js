var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Instances = function(){
  return knex('jobinstance');
}

/* GET users listing. */
router.get('/', function(req, res, next) {
  Instances().select().then(function(data){
    res.json(data);
  })
});

module.exports = router;
