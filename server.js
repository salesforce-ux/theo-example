(function() {

  var express = require('express');
  var app = express();

  app.set('port', process.env.PORT || 3000);

  app.use(require('connect-livereload')());
  
  app.use(express["static"]("./www"));
  var port = app.get('port');
  app.listen(port);
  module.exports = app;

  console.log('listening on ' + port);

}).call(this);
