var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const booksRouter = require('./routes/books');

var app = express();

const { sequelize } = require('./models'); // imports instance of sequelize from models/index.js

(async () => {
  //tests connection to database
  try {
    await sequelize.authenticate();
    console.log('Connection to the database successful!');
  } catch (error) {
    console.error('Error connecting to the database: ', error);
  }
})();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/books', booksRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('The page you are looking for does not exist.');
  err.status = 404;
  res.status(err.status);
  res.render('page-not-found', { error: err});
});

// global error handler
app.use(function(err, req, res, next) {
  err.status = err.status || 500;
  err.message = err.message || 'The server encountered an error.';
  console.error(`Error ${err.status}: ${err.message}`);
  res.status(err.status || 500);
  res.render('error', { err });
});

module.exports = app;
