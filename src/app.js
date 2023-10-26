const express = require('express');
const passport = require('passport');

const cors = require('cors');
const { jwtStrategyForAdmin } = require('./config/passport');

const routes = require('./routes');
const ApiError = require('./utils/ApiError');

const app = express();



app.use(express.json());

app.use(express.urlencoded({ extended: true }));



app.use(cors());
app.options('*', cors());
app.use(passport.initialize());
passport.use('jwtadmin', jwtStrategyForAdmin('jwtadmin'));
app.use('/v1', routes);
// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(400, 'Not found'));
});



module.exports = app;
