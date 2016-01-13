require('dotenv').load();
var io = require('socket.io')();
var conString = process.env.DATABASE_URL || 'postgres://@localhost/together'
var pg = require('pg');

io.on('connection', function(socket){
  socket.on('sendMessage', function(data){
    pg.connect(conString, function(err, client, done){
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO messages(users_display, meetups_id, content, posted, url) VALUES($1, $2, $3, $4, $5)', [data.users_display, data.meetups_id, data.content, data.date, data.url], function(err, result){
      if(err){
        return console.error('error running query', err);
      }
      client.query('select * from messages', [], function(err, result){
        done();
        io.sockets.emit('messageFeed', result.rows);
      })


      console.log('connected to database');
    })
  })
  })
})









module.exports = io;