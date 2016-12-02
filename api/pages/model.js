var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

var PageSchema = new mongoose.Schema({
  title: String,
  description: String,
  buttonLink: String,
  buttonText: String,  
  image: String,
  imageLink: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  /* // to add
  publishStartDate: Date,
  publishEndDate: Date 
  */

});

module.exports = mongoose.model('Page', PageSchema);
