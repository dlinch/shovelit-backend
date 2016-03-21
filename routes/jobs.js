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

router.post('/new', function(req, res, next){
  Jobs().insert({
    requester_id: knex('users').where({id: req.query.id}).select('id'),
    shoveler_id: null,
    type: 'house',
    complete: false,
    zipcode: 80021,
    address: '8570 West 95th Drive Westminster CO',
    time: Date(),
  }).then(function(data){
    res.json(data);
  })
})

module.exports = router;
