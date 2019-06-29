var express = require("express");
var router = express.Router();
var Favorite = require('../../../models').Favorite;
var User = require('../../../models').User;
var defaultHeader = ["Content-Type", "application/json"]

router.post('/', function(req, res, next){
  User.findOne({where: {api_key: req.body.api_key}})
    .then( user => {
      if (user === null){
        res.setHeader(...defaultHeader);
        res.status(500).send({ "error": "invalid api_key" });
      } else {
        Favorite.create({
          location: req.body.location,
          UserId: user.id
        })
          .then( favorite => {
            res.setHeader(...defaultHeader);
            res.status(200).send({ "message": favorite.location + " has been added to favorites" });
          })

      }
    })
});

module.exports = router;
