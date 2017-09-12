var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function () {} // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (user, callback) {
      console.log('db post: ', typeof user.username)
      //need to insert username into database
      //not working, or don't know how to get it to update in mysql
      db.dbConnection.query("INSERT INTO users (username) VALUES(" + user.username + ");", function (error, results) {
        if (!error) {
          //make sure the response ends
          callback();
        }
      });
    }
  }
};
