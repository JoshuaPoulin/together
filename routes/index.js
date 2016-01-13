require('dotenv').load();
var express = require('express');
var router = express.Router();
var pg = require('pg')
var conString = process.env.DATABASE_URL || 'postgres://@localhost/together'
var bcrypt = require('bcrypt');
var async = require('async')

/* GET home page. */
router.get('/meetups', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if(err){
      console.log('error fetching client from pool', err);
    }
    async.parallel([
      function(cb){
        client.query('SELECT * FROM meetups', function(err, result){
          cb(err, result.rows)
        })
      },
      function(cb){
        client.query('SELECT * FROM attendees', function(err, result){
          cb(err, result.rows)
        })
      }
    ],
    function(err, result){
      done();
      if(err){
        console.log('error performing query', err)
      }
      res.json(result)
    })
  })
})
router.post('/newMeetup', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO meetups(name, streetadress, cityState, event, time, description, image) VALUES($1, $2, $3, $4, $5, $6, $7) returning id', [req.body.user.name, req.body.user.street, req.body.user.city, req.body.user.date, req.body.user.time, req.body.user.description, req.body.user.image], function(err, result){
      done();
      console.log(result);
      res.status(200).json(result)
      if(err){
        return console.error('error running query', err);
      }
      console.log('connected to database');
    })
  })
})
router.post('/joinGroup', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('INSERT INTO attendees(users_id, meetups_id) VALUES($1, $2) returning id', [req.body.user.id, req.body.meetup], function(err, result){
      done();
      res.status(200).json(result);
      if(err){
        return console.error('error running query', err);
      }
      console.log('connected to database');
    })
  })
})
router.get('/group', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if (err) {
      return console.error('error fetching client from pool', err);
    }
    client.query('SELECT * FROM messages', function(err, result){
      done();
      res.json(result.rows);
      if(err){
        return console.error('error running query', err);
      }
      console.log('connected to database');
    })
  })
})
router.get('*', function(req, res, next) {
  res.sendFile('index.html', {
    root: __dirname + '/../public/'
  });
});
module.exports = router;