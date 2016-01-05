require('dotenv').load();
var express = require('express');
var router = express.Router();
var pg = require('pg')
var conString = process.env.DATABASE_URL || 'postgres://@localhost/together'
var bcrypt = require('bcrypt');

/* GET home page. */
router.get('/meetups', function(req, res, next){
  pg.connect(conString, function(err, client, done){
    if(err){
      console.log('error fetching client from pool', err);
    }
    client.query('SELECT * FROM meetups', function(err, result){
      done();
      res.json(result.rows);
      if(err){
        console.log('error running query', err);
      }
    })
  })
})
module.exports = router;