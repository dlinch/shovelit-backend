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

router.post('/new', function(req, res, next){
  // var newInstance = {
  //   creator_id: knex('users').where({id: req.query.id}).select('id'),
  //   shoveler_id: null,
  //   time: Date(),
  //   job_id: knex('jobs').where({id: req.query.job}).select('id'),
  //   job_amount: req.query.amount
  // }
  Instances().insert({
    creator_id: knex('users').where({id: req.query.id}).select('id'),
    shoveler_id: null,
    time: Date(),
    job_id: knex('jobs').where({id: req.query.job}).select('id'),
    job_amount: req.query.amount
  }).then(function(data){
    res.json(data);
  })
})

module.exports = router;
