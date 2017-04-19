module.exports = function(router) {
  var votes = require('../controllers/votes.js');

  router.route('/votes')
    .post(votes.manifest)
    .get(votes.list);
};