module.exports = function(router) {
  var votes = require('../controllers/votes.js');

  /**
   * Define the http verbs for /api/votes
   *
   * POST { msg }   /api/votes to create a vote to the database
   * GET            /api/votes to retrieve a list of previously votes
   */
  router.route('/votes')
    .post(votes.manifest)
    .get(votes.list);
};