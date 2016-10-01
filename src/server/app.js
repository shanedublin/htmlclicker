var express = require('express');
var app = express();
var config = require('./config/config.js');

app.set('port',3001);

app.use(express.static(config.publicFolder));

