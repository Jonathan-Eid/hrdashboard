var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var departmentsRouter = require('./routes/department.routes');
var positionsRouter = require('./routes/position.routes');
var employeesRouter = require('./routes/employee.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());

const db = require("./models");
app.use('/departments', departmentsRouter);
app.use('/positions', positionsRouter);
app.use('/employees', employeesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
