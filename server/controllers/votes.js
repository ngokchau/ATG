var mongoose = require('mongoose');

var Vote = mongoose.model('Vote');

/**
 * Create a Vote
 * @param req
 * @param res
 */
exports.manifest = function(req, res) {
  var vote = new Vote();
  vote.gender = req.body.gender;

  vote.save(function(err, vote) {
    if(err)
      res.send(err);

    res.json({ message: 'Vote casted' });
  });
};

/**
 * Retrieve a specified Vote
 *
 * @param req
 * @param res
 */
exports.read = function(req, res) {

};

/**
 * Update a specified Vote
 *
 * @param req
 * @param res
 */
exports.update = function(req, res) {

};

/**
 * Delete a specified Vote
 *
 * @param req
 * @param res
 */
exports.delete = function(req, res) {

};

/**
 * Retrieve a list of Votes
 *
 * @param req
 * @param res
 */
exports.list = function(req, res) {
  Vote.find(function(err, votes) {
    if(err)
      res.send(err);

    res.json(votes);
  });
};