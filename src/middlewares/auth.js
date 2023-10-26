const passport = require('passport');
const ApiError = require('../utils/ApiError');
const {errorHandler} = require('../utils/ServiceHandler');

const verifyCallback = (req, resolve, reject) => async (err, user, info) => {
  if (err || info || !user) {
    return reject(new ApiError(401, 'Please authenticate'));
  }
  req.user = user;
  resolve();
};

const adminAuth =
  () =>
  async (req, res, next) => {
    console.log("indeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee")
    return new Promise((resolve, reject) => {
      passport.authenticate('jwtadmin', { session: false },  verifyCallback(req, resolve, reject))(
        req,
        res,
        next
      );
    })
      .then(() => next())
      .catch((err) => errorHandler(err,res));
  };
module.exports = {
  adminAuth,
};


