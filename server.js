const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const cors = require('cors');

const errorHandling = require('./middlewares/errorHandling');

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'abcdefghijklmnopqrstuvwxyz',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * routing
 */
const routes = require('./routes/routes');
const jadwalPiketRoutes = require('./routes/jadwalpiket-routes');

app.use('/api/v1', routes);
app.use('/api/v2', jadwalPiketRoutes);
app
  .route('*')
  .get((req, res) => {
    res.send("you're inside fallback route");
  })
  .post((req, res) => {
    res.send("you're inside fallback route");
  })
  .put((req, res) => {
    res.send("you're inside fallback route");
  })
  .delete((req, res) => {
    res.send("you're inside fallback route");
  });
/**
 * error handling
 */
app.use(errorHandling);

app.listen(3000, () => {
  console.log('application listen on http://localhost:3000');
});
