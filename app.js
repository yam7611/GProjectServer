
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoose = require('mongoose')
  , http = require('http')
  , path = require('path')
    , todoModel = require('./models/members')
    ,todoModel1 = require('./models/records')
    ,todoRoute = require('./routes/members');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var uriString =
    process.env.MONGOLAB_URI ||
        process.env.MONGOHQ_URL ;

mongoose.connect('mongodb://yam7611:123@ds145329.mlab.com:45329/appdb');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
   console.log('Successfully mongodb is connected');
});


//app.put('/api/todo/:id',todoRoute.update);

app.post('/api/todo',todoRoute.longinToSystem);
app.get('/api/fetchData',todoRoute.fetchDataFromServer);
app.post('/api/signUp',todoRoute.signUp);
app.post('/api/uploadRecord',todoRoute.writeDataToDatabase);
app.post('/api/requireHistory/:id',todoRoute.requireHistory);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
