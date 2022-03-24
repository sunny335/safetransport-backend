const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  name: String,
  busNumber: String,
  PhoneNumber: String,
  DriverName: String,
  DriverLicense: String,
  DriverPhone: String,
  creator: String,
  creatorID: 'String',
  selectedFile: String,
  TravelChart: String,
  DriverImage:String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('PostMessage', postSchema);

// export default PostMessage;
