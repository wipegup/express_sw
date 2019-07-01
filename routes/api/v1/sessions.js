var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');
var defaultHeader = ["Content-Type", "application/json"]

var incorrectLogin = function(res){
  res.setHeader(...defaultHeader);
  res.status(401).send({'error':'email or password incorrect'});
}

router.post('/', function(req, res, next){

  User.findOne({ where: {email: req.body.email}})
    .then( user => {
      if (user === null){
        incorrectLogin(res);
      } else {
        bcrypt.compare(req.body.password, user.password_digest, function(err, correctPW){
          if (correctPW) {
            res.setHeader(...defaultHeader);
            res.status(200).send({'api_key': user.api_key})
          } else {
            incorrectLogin(res);
          }
        });
      }
    })

})


module.exports = router;

//express-sw-wpgp.heroukuapp.com/api/v1/sessions/
