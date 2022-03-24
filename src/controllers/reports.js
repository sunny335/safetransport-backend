const express = require('express');

const PostMessage = require('../models/reports.js');
const mongoose = require('mongoose');
fetch = require('node-fetch');
const asyncHandler = require("express-async-handler");
const axios = require("axios");
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

exports.updateReport = asyncHandler(async (req, res, next) => {
  const id = req.body && req.body.id;
  const ReportStatuss = req.body.ReportStatus;

  const exitstUser = await PostMessage.findOne({ _id: req.body.id });
  if (exitstUser) {
    const ReportStatus = { ReportStatus: ReportStatuss };
    const filter = { _id: req.body.id };
    const updatedPost = await PostMessage.findOneAndUpdate(
      filter,
      ReportStatus,
      {
        new: true
      }
    );
  }
})


exports.createPost = async (req, res) => {
  const post = req.body;
  const newPostMessage = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  var notification = {
    "title": `New Report Created:${post.ReportType}`,
    'text': 'Please check'
  };
  var notification_body = {
    'notification': notification,
    'to': '/topics/topic',
  }
  try {
    await fetch('https://fcm.googleapis.com/fcm/send', {
      'method': 'POST',
      'headers': {
        'Authorization': 'key=' + 'AAAAQT-h5Ww:APA91bEuQDmggn98R-Ab9ulcNrEnGF_NeqHEp4bnpnP7XTzKPlsLZZ_gvC5wheeqhXi3yuoz0ane_ZaE2097HzIKCjtZCu84tRIp_FAIHOlM7GauF7EQ7boIAuS5L88iSMbwMYdWFWVs',
        'Content-Type': 'application/json'
      },

      'body': JSON.stringify(notification_body)
    })

    await newPostMessage.save();
    res.status(201).json(newPostMessage);

  } catch (error) {
    res.status(409).json({ message: error });
    // console.log(err);
  }
};


exports.createNotify = async (req, res) => {

  var notification = {
    "title": 'New Report Created',
    'text': 'Please check'
  };
  var notification_body = {
    'notification': notification,
    'to': '/topics/topic',
  }

  fetch('https://fcm.googleapis.com/fcm/send', {
    'method': 'POST',
    'headers': {
      'Authorization': 'key=' + 'AAAAQT-h5Ww:APA91bEuQDmggn98R-Ab9ulcNrEnGF_NeqHEp4bnpnP7XTzKPlsLZZ_gvC5wheeqhXi3yuoz0ane_ZaE2097HzIKCjtZCu84tRIp_FAIHOlM7GauF7EQ7boIAuS5L88iSMbwMYdWFWVs',
      'Content-Type': 'application/json'
    },

    'body': JSON.stringify(notification_body)
  }).then(() => {
    res.status(200).send('Notification send Successfull')
  }).catch((err) => {
    res.status(400).send('somwthing wrong')
    console.log(err)
  })
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
