const catchAsync = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {console.log("errrrrrrrr",err); next(err)});
  };
  
  module.exports = catchAsync;
  