const express = require('express');

const {
  getPosts,

  createPost,

} = require('../controllers/posts.js');

const router = express.Router();

router.get('/getQrdata', getPosts);


router.post('/posts', createPost);


module.exports = router;

