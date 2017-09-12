var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (body, callback) {
      console.log('body: ', body)
      var roomId;
      var userId;
      db.dbConnection.query(`SELECT id FROM rooms WHERE roomname = '${body.roomname}';`, function (err, results) {
        if (err) {
          console.log(err)
        } else {
          if (!results.length) {
            db.dbConnection.query(`INSERT INTO rooms (\`roomname\`) VALUES ('${body.roomname}');`, function (err, results) {
              if (err) {
                console.log(err)
              } else {
                console.log('this is results: ' + JSON.stringify(results))
                roomId = results.insertId;
                console.log('roomid: ', roomId)
                callback();
              }
            });
          } else {
            // console.log('this is results: ' + JSON.stringify(results))
            roomId = results[0].id;
            console.log('roomid: ', roomId)
            callback();
          }
        }
      });

      module.exports.users.post(body, function (id) {
        console.log('id in exports post ', id)
        console.log('roomid ', roomId)
        userId = id;
        db.dbConnection.query(`INSERT INTO messages (\`USERS_ID\`,\`message\`, \`ROOM_ID\`) VALUES ('${userId}', '"${body.message}"', '${roomId}')`, function(err, results) {
          if (err) {
            console.log(err)
          } else {
            callback();
          }
        })
      })

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (user, callback) {
      console.log('db post: ', user.username)
      //need to insert username into database
      //not working, or don't know how to get it to update in mysql
      db.dbConnection.query(`SELECT id FROM users WHERE username = '${user.username}';`, function (err, results) {
        if (err) {
          console.log(err)
        } else {
          if (!results.length) {
            db.dbConnection.query(`INSERT INTO users (\`username\`) VALUES ('${user.username}');`, function (err, results) {
              if (err) {
                console.log(err)
              } else {
                console.log('this is results: ' + JSON.stringify(results))
                callback(results.insertId);
              }
            });
          }
          console.log('results ', results[0].id)
          callback(results[0].id);
        }
      });
    }
  }
};


/*
{ username: 'Valjean',
  message: 'In mercy\'s name, three days is all I need.',
  roomname: 'Hello' }
*/
