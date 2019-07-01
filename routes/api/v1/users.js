var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');
var defaultHeader = ["Content-Type", "application/json"];
var responses = require('../../../helpers/responses');

const createApiKey = function(){
  return Math.random().toString(36).substring(2);
}

router.post('/', function (req, res, next){
  if ( req.body.password != req.body.password_confirmation){
    responses.error(res, "passwords do not match");
  } else {
    let api_key = createApiKey();

    bcrypt.hash(req.body.password, 5, function(err, hash){

      User.create({
        email: req.body.email,
        password_digest: hash,
        api_key: api_key
      })
      .then( (user) => responses.ok(res, 201, {api_key: user.api_key}) )
      .catch( error => responses.error(res, error) )

    })

  }
})

module.exports = router;
