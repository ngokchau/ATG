var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var VoteSchema = new Schema({
  gender: { type: String }
});

module.exports = mongoose.model('Vote', VoteSchema);