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
module.exports = router;