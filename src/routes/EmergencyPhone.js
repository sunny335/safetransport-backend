const express = require('express');

const {
  getPosts,

  createPost,

  deletePost,
} = require('../controllers/EmergencyPhone.js');

const router = express.Router();


router.get('/getPhoneData', getPosts);


router.post('/EmergencyPhone', createPost);
router.delete('/:id', deletePost);


module.exports = router;
