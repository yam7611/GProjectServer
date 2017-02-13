

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema  = new Schema(
    {
  id:String,
  name: String,
  account: String,
  password:String


});

mongoose.model('members', TodoSchema);

