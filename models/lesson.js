const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema({
  lessonAuthor: {
    type: String,
    required: true
  },
  lessonTitle: {
    type: String,
    required: true
  },
  lessonDate: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = mongoose.model("Lesson", lessonSchema);
