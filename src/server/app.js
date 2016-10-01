var express = require('express');
var app = express();
var config = require('./config/config.js');


app.use(express.static(config.publicFolder));

