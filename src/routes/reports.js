const express = require('express');

const {
  getPosts,
  // getPostsBySearch,
  // getPost,
  createPost,
  createNotify,
  // updatePost,
  // likePost,
  // deletePost,
  // commentPost,
  updateReport,
} = require('../controllers/reports.js');

const router = express.Router();
// const auth = require('../common-middleware/auth.js');

// router.get('/search', getPostsBySearch);
router.get('/getReportData', getPosts);
// router.get('/:id', getPost);

router.post('/reports', createPost);

router.post('/createNotify', createNotify);
router.post('/updateReport', updateReport);
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
