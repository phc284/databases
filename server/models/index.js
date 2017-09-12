var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (body, callback) {
      console.log('body at beginning of message post models: ', body)
      var roomId;
      var userId;
      db.dbConnection.query(`SELECT id FROM rooms WHERE roomname = '${body.roomname}';`, function (err, results) {
        if (err) {
          console.log(err)
        } else if (results.length === 0) {
            db.dbConnection.query('INSERT INTO rooms (roomname) VALUES (?);', [body.roomname], function (err, results) {
              if (err) {
                console.log(err)
              } else {
                console.log('this is results in INSERT INTO rooms: ' + JSON.stringify(results))
                roomId = results.insertId;
                console.log('roomid in INSERT INTO rooms after setting it to results.insertId: ', roomId)
                whatever(callback);
              }
            });
          } else {
            console.log('this is results in select id from rooms; in else: ' + JSON.stringify(results))
            roomId = results[0].id;
            console.log('roomid in SELECT id FROM rooms if !results.length: ', roomId)
            whatever(callback);
          }
      });
      var whatever = function (callback) {
        module.exports.users.post(body, function (id) {
          console.log('id in exports post ', id)
          console.log('roomid ', roomId)
          userId = id;
          db.dbConnection.query(`INSERT INTO messages (\`USERS_ID\`, \`message\`, \`ROOM_ID\`) VALUES ('${userId}', ${JSON.stringify(body.message)}, ${roomId})`, function(err, results) {
            if (err) {
              console.log(err)
            } else {
              console.log('this is results in insert message query ', results)
              callback();
            }
          })
        })
      }

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function (user, callback) {
      console.log('db post at users post models: ', user)
      //need to insert username into database
      //not working, or don't know how to get it to update in mysql
      db.dbConnection.query(`SELECT id FROM users WHERE username = '${user.username}';`, function (err, results) {
        if (err) {
          console.log(err)
        } else if (results.length === 0) {
            db.dbConnection.query(`INSERT INTO users (\`username\`) VALUES ('${user.username}');`, function (err, results) {
              if (err) {
                console.log('USER ERROR', err)
              } else {
                console.log('this is results in INSERT user: ' + JSON.stringify(results))
                callback(results.insertId);
              }
            });
          } else {
              console.log('results[0].id in SELECT id in user post', results[0].id)
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
