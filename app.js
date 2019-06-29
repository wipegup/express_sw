var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/api/v1/users');
var forecastRouter = require('./routes/api/v1/forecast');
var sessionsRouter = require('./routes/api/v1/sessions');
var favoritesRouter = require('./routes/api/v1/favorites');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/forecast', forecastRouter);
app.use('/api/v1/sessions', sessionsRouter);
app.use('api/v1/favorites', favoritesRouter);

module.exports = app;
