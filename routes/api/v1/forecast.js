var express = require("express");
var router = express.Router();
var defaultHeader = ["Content-Type", "application/json"];

var services = require('../../../services');


router.get('/', function (req, res, next){

  services.geocode(req.query.location)
    .then(latLng => {
      services.forecast(latLng)
        .then( weather =>{
          res.setHeader(...defaultHeader);
          res.status(200).send(JSON.stringify(weather));
        })
        .catch( error => {
          res.setHeader(...defaultHeader);
          res.status(500).send({error});
        })
    })
})

module.exports = router;
