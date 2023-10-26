
function errorHandler(err, res) {
  const statusCode = err.statusCode || 500;
  res.header(err.headers || {});
  delete err.headers;
  res.status(statusCode).send(err);
}




function serviceHandler(req, res, serviceP) {
  serviceP.then((body) => {
    const statusCode = (body && body.customCode) || 200;
     res.status(statusCode).send(body)
      }).catch((e) => {
    return errorHandler(e, res);
  });
}

module.exports.serviceHandler = serviceHandler;
module.exports.errorHandler = errorHandler;
