const express = require('express');
const { adminController } = require('../controllers');
const { adminAuth } = require('../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(adminController.createAdmin);


  router
  .route('/')
  .put(adminAuth('adminProfile'),adminController.updateAdmin);

  router
  .route('/login')
  .post(adminController.loginAdmin);


  router
  .route('/get')
  .get(adminAuth('adminProfile'), adminController.getAdmin)

module.exports = router;
