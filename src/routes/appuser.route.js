const express = require('express');
const { appuserController } = require('../controllers');

const router = express.Router();

router
  .route('/')
  .post(appuserController.createUser);
  router
  .route('/login')
  .post(appuserController.getOtp);


module.exports = router;
