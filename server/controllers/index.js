var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      console.log('in msg get');
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('in msg post');
      console.log('msg post req body', req.body);


    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('in user get');
    },
    post: function (req, res) {
      console.log('in user post', req.body);
      //send to the models user.post function to send to the database
      models.users.post(req.body, function () {
        res.end();
      })
    }
  }
};
