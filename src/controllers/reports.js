const express = require('express');

const PostMessage = require('../models/reports.js');
const mongoose = require('mongoose');
// const router = express.Router();

//  exports.getPosts = async (req, res) => {
//   const { page } = req.query;

//   try {
//     const LIMIT = 8;
//     const startIndex = (Number(page) - 1) * LIMIT;
//     const total = await PostMessage.countDocuments({});
//     const posts = await PostMessage.find()
//       .sort({ _id: -1 })
//       .limit(LIMIT)
//       .skip(startIndex);
//     res.status(200).json({
//       data: posts,
//       currentPage: Number(page),
//       numberOfPages: Math.ceil(total / LIMIT),
//     });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };
exports.getPosts = (req, res) => {
  PostMessage.find({}).exec((error, posts) => {
    if (error) return res.status(400).json({ error });
    if (posts) {
      res.status(200).json({ posts });
    }
  });
};

// const getPostsBySearch = async (req, res) => {
//   const { searchQuery, tags } = req.query;
//   try {
//     const title = new RegExp(searchQuery, 'i');
//     const posts = await PostMessage.find({
//       $or: [{ title }, { tags: { $in: tags.split(',') } }],
//     });
//     res.json({ data: posts });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

// const getPost = async (req, res) => {
//   const { id } = req.params;

//   try {
//     const post = await PostMessage.findById(id);

//     res.status(200).json(post);
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// };

exports.createPost = async (req, res) => {
  const post = req.body;

  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newPostMessage.save();

    res.status(201).json(newPostMessage);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// exports.deletePost = async (req, res) => {
//   const { id } = req.params;
//   try {
//     if (!mongoose.Types.ObjectId.isValid(id))
//       return res.status(404).send(`No post with id: ${id}`);

//     await PostMessage.findByIdAndRemove(id);

//     res.json({ message: 'report deleted successfully.' });
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// };

// const updatePost = async (req, res) => {
//   const { id: _id } = req.params;
//   const post = req.body;

//   if (!mongoose.Types.ObjectId.isValid(_id))
//     return res.status(404).send(`No post with id`);

// const updatedPost = await PostMessage.findByIdAndUpdate(_id, post , { new: true });
//   const updatedPost = await PostMessage.findByIdAndUpdate(
//     _id,
//     { ...post, _id },
//     { new: true }
//   );

//   res.json(updatedPost);
// };

// const likePost = async (req, res) => {
//   const { id } = req.params;

//   if (!req.userId) return res.json({ message: 'Unauthenticated' });

//   if (!mongoose.Types.ObjectId.isValid(id))
//     return res.status(404).send(`No post with id: ${id}`);

//   const post = await PostMessage.findById(id);
//   const index = post.likes.findIndex((id) => id === String(req.userId));
//   if (index === -1) {
//     post.likes.push(req.userId);
//   } else {
//     post.likes = post.likes.filter((id) => id !== String(req.userId));
//   }
//   const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
//     new: true,
//   });

//   res.json(updatedPost);
// };

// const commentPost = async (req, res) => {
//   const { id } = req.params;
//   const { value } = req.body;
//   const post = await PostMessage.findById(id);
//   post.comments.push(value);
//   const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
//     new: true,
//   });
//   res.json(updatedPost);
// };
// module.exports = {
//   commentPost,
//   likePost,
//   deletePost,
//   updatePost,
//   createPost,
//   getPost,
//   getPostsBySearch,
//   getPosts,
// };

// module.exports = router;
