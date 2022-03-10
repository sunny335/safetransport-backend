const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  Phone: String,
  Name: String,
  UserID: String,
  Email: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('EmergencyPhone', postSchema);

// export default PostMessage;
