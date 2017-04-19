var mongoose = require('mongoose');

var Vote = mongoose.model('Vote');

exports.manifest = function(req, res) {
  var vote = new Vote();
  vote.gender = req.body.gender;

  vote.save(function(err, vote) {
    if(err)
      res.send(err);

    res.json({ message: 'Vote casted' });
  });
};

exports.read = function(req, res) {

};

exports.update = function(req, res) {

};

exports.delete = function(req, res) {

};

exports.list = function(req, res) {
  Vote.find(function(err, votes) {
    if(err)
      res.send(err);

    res.json(votes);
  });
};