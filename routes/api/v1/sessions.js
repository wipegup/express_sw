var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');

var responses = require('../../../helpers/responses');


router.post('/', function(req, res, next){

  User.findOne({ where: {email: req.body.email}})
    .then( user => {
      if (user === null){
        responses.incorrectLogin(res);
      } else {
        bcrypt.compare(req.body.password, user.password_digest, function(err, correctPW){
          if (correctPW) {
            responses.ok(res, 200, {'api_key': user.api_key});
          } else {
            responses.incorrectLogin(res);
          }
        });
      }
    })
    .catch( error => responses.error(res, error) )

});


module.exports = router;

//express-sw-wpgp.heroukuapp.com/api/v1/sessions/
