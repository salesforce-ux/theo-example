var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.use(require('connect-livereload')({
  port: 35729
}));

app.use(express['static']('./.www'));
app.use('/generated', express['static']('./.generated'));

var port = app.get('port');

app.listen(port, function() {
  console.log('Express app started on port ' + port);
});
