var express = require('express');
var app = express();
var config = require('./config/config.js');

//app.set('port',3001);

app.use(express.static(config.publicFolder));

console.log('app init');

app.listen(3002,function(){
	console.log('hello!');
});