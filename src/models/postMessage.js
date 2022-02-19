const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  name: String,
  busNumber: String,
  PhoneNumber: String,
  DriverName: String,
  DriverLicense: String,
  DriverPhone: String,
  creator: String,
  // tags: [String],
  creatorID: 'String',
  selectedFile: String,
  nid: String,
  TravelChart: String,
  DriverImage:String,
  // likes: { type: [String], default: [] },
  // comments: { type: [String], default: [] },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('PostMessage', postSchema);

// export default PostMessage;
