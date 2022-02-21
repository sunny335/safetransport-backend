const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  agree: String,
  comment: String,
  ReporterID: String,
  ReportedBusInfo: Array,
  reportedPhoto: String,
  ReportType: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Reports', postSchema);

// export default PostMessage;
