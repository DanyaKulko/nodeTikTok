const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(__dirname + '/views'));

const index = require('./routes');
app.use('/', index);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

// listen on port 3300
let port = process.env.PORT || 3055;
app.listen(port, () => {
  console.log("\n-------------------\n");
  console.log('Express app listening on port ' + port);
  console.log("\n-------------------\n");
});