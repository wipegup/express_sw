var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');
var defaultHeader = ["Content-Type", "application/json"]

router.post('/', function(req, res, next){
  let requestEmail = req.body.email;
  let requestPassword = req.body.password;

  User.findOne({ where: {email: requestEmail}})
    .then( user => {
      if (user === null){
        res.setHeader(...defaultHeader);
        res.status(401).send({'error':'email or password incorrect'})
      } else {
        let userPasswordDigest = user.password_digest;

        bcrypt.compare(requestPassword, userPasswordDigest, function(err, correctPW){
          if (correctPW) {
            res.setHeader(...defaultHeader);
            res.status(200).send({'api_key': user.api_key})
          } else {
            res.setHeader(...defaultHeader);
            res.status(401).send({'error':'email or password incorrect'})
          }
        });
      }

    })

})


module.exports = router;

//express-sw-wpgp.heroukuapp.com/api/v1/sessions/
