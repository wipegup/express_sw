var defaultHeader = ["Content-Type", "application/json"];

var responses = {

  error : function(res, message){
    res.setHeader(...defaultHeader);
    res.status(500).send({'error': message});
  },

  incorrectLogin: function(res){
    res.setHeader(...defaultHeader);
    res.status(401).send({'error':'email or password incorrect'});
  },

  ok: function(res, status, message){
    res.setHeader(...defaultHeader);
    res.status(status).send(JSON.stringify(message));
  }

}

module.exports = responses;
