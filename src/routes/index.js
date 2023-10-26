const express = require('express');
const testRoute = require('./test.route');
const appuser = require('./appuser.route');
const admin=require('./admin.route')

const router = express.Router();

const defaultRoutes = [
  {
    path: '/test',
    route: testRoute,
  },
  {
    path: '/user',
    route: appuser,
  },
  {
    path: '/admin',
    route: admin,
  },
];



defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
