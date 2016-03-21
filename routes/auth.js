var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');

require('dotenv').load();

var user = {
  name: 'Derik',
  password: 'abc',
}

router.post('/login', function(req, res){
  console.log(req.body);
  if(req.body.name=='Derik' && req.body.password == 'abc') {
    //YAY

    jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '30d'}, function(token){
      console.log(token);
      res.json({
        token: token
      });
    });
  } else {
    res.status(401);
    res.json({
      message: 'Unauthorized',
    });
  }
});

module.exports = router;
