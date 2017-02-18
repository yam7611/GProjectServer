

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema  = new Schema(
    {
   id:String,
  block:String,
  start_time: String,
  end_time: String 


});

mongoose.model('records', TodoSchema);

