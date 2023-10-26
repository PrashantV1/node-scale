const express = require('express');

const testController = require('../controllers/test.controller');

const router = express.Router();


  router.route('/download/:fileName')
  .get(testController.downloadFile)



export default router;
