var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Jobs = function() {
  return knex('jobs')
}
/* GET users listing. */
router.get('/', function(req, res, next) {
  Jobs().select().then(function(data){
    res.json(data);
  })
});

module.exports = router;
