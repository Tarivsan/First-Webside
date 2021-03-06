var createError = require('http-errors');
var cookieSession = require('cookie-session');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const config = require('./config');
const mongoose = require('mongoose');


mongoose.connect(config.db);



var indexRouter = require('./routes/index');
var newsRouter = require('./routes/news');
var quizRouter = require('./routes/quiz');
var adminRouter = require('./routes/admin');
var apiRouter = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// mongodb+srv://tariv:<fUDgXtirCvptAkO0>@cluster0.fzlvx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority


app.use(cookieSession({
  name: 'session',
  keys: config.keysSession,

  // Cookie Options
  maxAge: config.maxAge
}))


app.use((req, res, next) => {
  res.locals.path= req.path;

  next();
});
// najpierw to sie wykonuje daje nam info jaki jest request dopiero pozniej kod idzie dalej i kieruje ustawione na sztywno zakladki dodajemy patha do globalnej sciezki dzieki temu bedzie dostepny w naszych szablonach (path) to jego nazwa! nadana przeze mnie

app.use('/', indexRouter);
app.use('/news', newsRouter);
app.use('/quiz', quizRouter);
app.use('/admin', adminRouter);
app.use('/api', apiRouter);

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
