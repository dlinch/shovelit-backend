var express = require('express');
var router = express.Router();
var knex = require('../db/knex');

var Jobs = function() {
  return knex('jobs')
}

// See all jobs.
router.get('/', function(req, res, next) {
  Jobs().select().then(function(data){
    res.json(data);
  }).catch(function(error){
    res.json(error)
  })
});

// See all jobs that you have shoveled.
router.get('/shoveledjobs/:userID', function(req, res, next){
  Jobs().where('shoveler_id', req.params.userID).select()
  .then(function(data){
    res.json(data);
  }).catch(function(error){
    res.json(error)
  })
})

// See all current jobs you have posted.
router.get('/myjobs/:userID', function(req, res, next) {
  Jobs().where({
    requester_id: req.params.userID,
    complete: false
}).select().then(function(data){
    res.json(data);
  }).catch(function(error){
    res.json(error)
  })
});

// Post a new job.
router.post('/new', function(req, res, next){
  Jobs().insert({
    requester_id: knex('users').where('id', req.query.id).select('id'),
    shoveler_id: null,
    type: req.query.type,
    complete: false,
    zipcode: req.query.zipcode,
    address: req.body.address,
    time: Date(),
  }, 'id').then(function(data){
    res.json(data);
  })
})

// Updated a current job.
router.put('/update/:jobID', function(req, res, next){
  Jobs().where({
    id: req.params.id,
    complete: false
  }).update({
    time: Date(),
    zipcode: req.query.zipcode,
    address: req.body.address,
    type: req.query.type,
  }).then(function(data){
    res.json(data)
  }).catch(function(error){
    res.json(error)
  })
})

// Cancel a current job.
router.delete('/delete/:jobID', function(req, res, next){
  Jobs().where({
    id: req.params.jobID,
    complete: false
  }).del()
  .then(function(data){
    res.json(data)
  }).catch(function(error){
    res.json(error)
  })
})

// Mark a job as complete.
router.put('/complete/:jobID', function(req, res, next){
  Jobs().where('id', req.params.jobID).update({
    complete: true
  }).then(function(data){
    res.json(data)
  }).catch(function(error){
    res.json(error)
  })
})

// Accept a job.
router.put('/accept/:jobID/:userID', function(req, res, next){
  Jobs().where('id', req.params.jobID).update({
    shoveler_id: req.params.userID
  }).then(function(data){
    res.json(data)
  }).catch(function(error){
    res.json(error)
  })
})

module.exports = router;
