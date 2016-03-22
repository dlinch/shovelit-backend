var express = require('express');
var router = express.Router();
var knex = require('../db/knex');
var unirest = require('unirest');
require('dotenv').load();

var Jobs = function() {
  return knex('jobs')
}


function requestPostalCodes(radius, postalcode) {
  if (!postalcode) {
    postalcode = 80205;
  }
  return new Promise(function(resolve, reject) {
    unirest.get('http://api.geonames.org/findNearbyPostalCodesJSON?postalcode=' + postalcode + '&country=US&radius=' + radius + '&username=' + process.env.GEONAME_USERNAME)
      .end(function(response) {
        resolve(response);
      })
  })
}


// All jobs X
router.get('/', function(req, res, next) {
  Jobs().select().then(function(data) {
    res.json(data)
  })
})

// See available jobs. X
router.get('/available/:userID/:radius/:zipcode', function(req, res, next) {
  Jobs().whereNot(function() {
    this.whereNotNull('shoveler_id').orWhere({
      requester_id: req.params.userID,
      complete: true
    })
  }).select().then(function(db) {
    requestPostalCodes(req.params.radius, req.params.zipcode).then(function(data) {
      geocodeData = data.body.postalCodes;

      //Filter By Area Code Function
      function areaCodeFilter(Jobject) {
        for (var i = 0; i < geocodeData.length; i++) {
          if (Jobject.zipcode == geocodeData[i].postalCode) {
            return true;
          }
        }
        return false;
      }

      var returnArray = db.filter(areaCodeFilter)
      res.json(returnArray);
    })
  }).catch(function(error) {
    res.json(error)
  })
});

// See all jobs that you have shoveled.
router.get('/shoveledjobs/:userID', function(req, res, next) {
  Jobs().where({
      shoveler_id: req.params.userID,
      complete: true
    }).select()
    .then(function(data) {
      res.json(data);
    }).catch(function(error) {
      res.json(error)
    })
})

// See all jobs you have accepted X
router.get('/currentjobs/:userID', function(req, res, next) {
  Jobs().where({
      shoveler_id: req.params.userID,
      complete: false
    }).select()
    .then(function(data) {
      res.json(data)
    })
});

// See all current jobs a user has posted. X
router.get('/myjobs/:userID', function(req, res, next) {
  Jobs().where({
    requester_id: req.params.userID,
    complete: false
  }).select().then(function(data) {
    res.json(data);
  }).catch(function(error) {
    res.json(error)
  })
});

// See

// Post a new job. X
router.post('/new/:id', function(req, res, next) {
  Jobs().insert({
    requester_id: knex('users').where('id', req.params.id).select('id'),
    shoveler_id: null,
    type: req.body.property,
    complete: false,
    zipcode: req.body.zipcode,
    address: req.body.address,
    time: Date(),
  }, 'id').then(function(data) {
    res.json(data);
  })
})


// Update a current job. X
router.put('/update/:jobID', function(req, res, next) {
  console.log(req.body.zipcode, req.body.address, req.body.property)
  Jobs().where('id', req.params.jobID).update({
    time: Date(),
    zipcode: req.body.zipcode,
    address: req.body.address,
    type: req.body.property,
  }).then(function(data) {
    res.json(data)
  }).catch(function(error) {
    res.json(error)
  })
})


// Mark a job as complete. X
router.put('/complete/:jobID', function(req, res, next) {
  Jobs().where('id', req.params.jobID).update({
    complete: true
  }).then(function(data) {
    res.json(data)
  }).catch(function(error) {
    res.json(error)
  })
})

// Accept a job. X
router.put('/accept/:jobID/:userID', function(req, res, next) {
  Jobs().where('id', req.params.jobID).update({
    shoveler_id: req.params.userID
  }).then(function(data) {
    res.json(data)
  }).catch(function(error) {
    res.json(error)
  })
})

// Unaccept a job X
router.put('/unaccept/:jobID', function(req, res, next) {
  Jobs().where('id', req.params.jobID).update({
    shoveler_id: null
  }).then(function(data) {
    res.json(data)
  }).catch(function(error) {
    res.json(error)
  })
})

// Cancel a current job.
router.delete('/delete/:jobID', function(req, res, next) {
  Jobs().where({
      id: req.params.jobID,
      complete: false
    }).del()
    .then(function(data) {
      res.json(data)
    }).catch(function(error) {
      res.json(error)
    })
})


module.exports = router;
