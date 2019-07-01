var express = require("express");
var router = express.Router();
var defaultHeader = ["Content-Type", "application/json"];

var services = require('../../../services');
var responses = require('../../../helpers/responses');


router.get('/', function (req, res, next){
  services.forecast(req.query.location)
    .then(weather => responses.ok(res, 200, weather))
    .catch( error => responses.error(res, error))
})

module.exports = router;
