var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Skyffel' });
});

router.get('/secret', function(req, res){
  // console.log(req.user, req.user.name);
  if(req.user && req.user.name == 'Derik'){ // Verify it is who we think it is.
    res.json({
      secret: 42 // Return what we need to return.
    });
  } else {
    res.status(401);
    res.json({
      message: 'Unauthorized.'
    });
  }
});

module.exports = router;
