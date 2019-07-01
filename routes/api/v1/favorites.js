var express = require("express");
var router = express.Router();
var Favorite = require('../../../models').Favorite;
var User = require('../../../models').User;
var defaultHeader = ["Content-Type", "application/json"]
var services = require('../../../services');
var responses = require('../../../helpers/responses');


router.post('/', function(req, res, next){
  User.findOne({where: {api_key: req.body.api_key}})
    .then( user => {
      if (user === null){
        responses.error(res, { "error": "invalid api_key" })
      } else {
        Favorite.create({
          location: req.body.location,
          UserId: user.id
        })
          .then( favorite => responses.ok(res, 200,
            { "message": favorite.location + " has been added to favorites" }))
          .catch( error => responses.error(error) )

      }
    })
});

router.delete('/', function(req, res, next){
  User.findOne({where: {api_key: req.body.api_key}})
    .then( user => {
      if (user === null){
        responses.error(res, "invalid api_key");
      } else {
        Favorite.destroy({
          where:{
            location: req.body.location,
            UserId: parseInt(user.id)
          }
        })
          .then( favorite => responses.ok(res, 204,
            { "message": req.body.location + " deleted"}))
          .catch( error => responses.error(res, error))
      }
    })
});

router.get('/', function(req, res, next){
  User.findOne({
    where: {api_key: req.body.api_key},
    // include: [
    //   {
    //     model: Favorite,
    //     as: 'favorites'
    //   }
    // ]
  })
    .then( user => {
      // console.log(user.favorites);
      if (user === null){
        responses.error(res, "invalid api_key");
      } else {
        Favorite.findAll({where:{UserId: user.id}})
          .then( favorites => {
            Promise.all(
              favorites.map( (fav) => services.forecast(fav.location))
            )
            .then( favsWeather => responses.ok(res, 200, favsWeather))
          })
      }
    })
    .catch( error => responses.error(res, error))
});

module.exports = router;
