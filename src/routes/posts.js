const express = require('express');

const {
  getPosts,
  // getPostsBySearch,
  // getPost,
  createPost,
  // updatePost,
  // likePost,
  // deletePost,
  // commentPost,
} = require('../controllers/posts.js');

const router = express.Router();
// const auth = require('../common-middleware/auth.js');

// router.get('/search', getPostsBySearch);
router.get('/getQrdata', getPosts);
// router.get('/:id', getPost);

router.post('/posts', createPost);
// router.delete('/:id', deletePost);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);
// router.post('/:id/commentPost', auth, commentPost);

module.exports = router;
// export default router;
// import { getPosts, getPostsBySearch, createPost, updatePost, likePost, deletePost } from '../controllers/posts.js';
// import auth from  '../middleware/auth.js';
// const router = express.Router();

// router.get('/', getPosts);
// router.get('/search', getPostsBySearch)
// router.post('/', auth, createPost);
// router.patch('/:id', auth, updatePost);
// router.delete('/:id', auth, deletePost);
// router.patch('/:id/likePost', auth, likePost);

// export default router;
