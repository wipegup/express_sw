var express = require("express");
var router = express.Router();
var User = require('../../../models').User;
var bcrypt = require('bcrypt');
var defaultHeader = ["Content-Type", "application/json"]
router.post('/', function (req, res, next){
  if ( req.body.password != req.body.password_confirmation){
    res.setHeader("Content-Type", "application/json");
    res.status(500).send({ "error": "passwords do not match" });
  } else {
    let api_key = Math.random().toString(36).substring(2);

    bcrypt.hash(req.body.password, 5, function(err, hash){

      User.create({
        email: req.body.email,
        password_digest: hash,
        api_key: api_key
      })
      .then( (user) => {
        res.setHeader(...defaultHeader);
        res.status(201).send(JSON.stringify({api_key: user.api_key}));
      })
      .catch( error => {
        res.setHeader(...defaultHeader);
        res.status(500).send({error})
      })
    })

  }
})

module.exports = router;
