

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema  = new Schema(
    {
  name: String
  account: String
  password: String
});

mongoose.model('todo', TodoSchema);

