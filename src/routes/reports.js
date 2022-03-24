const express = require('express');

const {
  getPosts,
  createPost,
  createNotify,

  updateReport,
} = require('../controllers/reports.js');

const router = express.Router();

router.get('/getReportData', getPosts);

router.post('/reports', createPost);

router.post('/createNotify', createNotify);
router.post('/updateReport', updateReport);


module.exports = router;

