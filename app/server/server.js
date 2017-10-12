'use strict';

const express = require('express');
const path = require('path');
const mongodb = require('mongodb');
const assert = require('assert');
const cmd = require('node-cmd');
const client = mongodb.MongoClient;

/* eslint-disable no-console */

cmd.get(
    ';ls',
    function (err, data, stderr) {
        console.log('THE IP IS :', data)
       }
);

const uri = "mongodb://192.168.99.100:27017/dummy";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join( __dirname, '../public')));



app.get('*', function (req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

client.connect(uri, function (err, db) {
   assert.equal(null, err);
   console.log("CONNECTED !!!");
   createCapped(db, function () {
       db.close();
   });
});

let createCapped = function (db, callback) {
    db.createCollection('maCollec', {'capped': true, 'size': 100000, 'max': 5000},
    function (mongoError, results) {
        console.log('collection CREATED !!!');
        callback();
        }
    );
};

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening : http://localhost:%s', port);
  }
});