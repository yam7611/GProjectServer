

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema  = new Schema(
    {
  block:String,
  start_time: String,
  end_time: String,
  ration:float


});

mongoose.model('records', TodoSchema);

