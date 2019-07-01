var express = require("express");
var router = express.Router();
var Favorite = require('../../../models').Favorite;
var User = require('../../../models').User;
var defaultHeader = ["Content-Type", "application/json"]
var services = require('../../../services');


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
          .catch( error => {
            res.setHeader(...defaultHeader);
            res.status(500).send({error});
          })

      }
    })
});

router.delete('/', function(req, res, next){
  User.findOne({where: {api_key: req.body.api_key}})
    .then( user => {
      if (user === null){
        res.setHeader(...defaultHeader);
        res.status(500).send({ "error": "invalid api_key" });
      } else {
        Favorite.destroy({
          where:{
            location: req.body.location,
            UserId: parseInt(user.id)
          }
        })
          .then( favorite => {
            res.setHeader(...defaultHeader);
            res.status(204).send({ "message": req.body.location + " deleted"});
          })
          .catch( error => {
            res.setHeader(...defaultHeader);
            res.status(500).send({error});
          })
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
        res.setHeader(...defaultHeader);
        res.status(500).send({ "error": "invalid api_key" });
      } else {
        Favorite.findAll({where:{UserId: user.id}})
          .then( favorites => {
            Promise.all(
              favorites.map( (fav) => services.forecast(fav.location)))
            .then( favsWeather => {
              res.setHeader(...defaultHeader);
              res.status(200).send(JSON.stringify(favsWeather));
            })
              }
            )
      }
    })
    .catch( error => {
      res.setHeader(...defaultHeader);
      res.status(500).send({error});
    })
});

module.exports = router;
