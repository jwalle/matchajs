'use strict';

const express = require('express');
const path = require('path');
const mongodb = require('mongodb');
const assert = require('assert');
const cmd = require('node-cmd');
const request = require('request');
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
    db.createCollection('maCollec4', {'capped': true, 'size': 100000, 'max': 5000},
    function (mongoError, results) {
        console.log('collection CREATED !!!');
        callback();
        }
    );
};

app.get('/getUser', function (req, res) {
    let options = {
        url: 'https://randomuser.me/api/',
        dataType: 'json'
    };
    request.get(options, function(error, response, body) {
        console.log('test');
        if (!error) {
            console.log(body);
            res.send(body);
        }
        else {
            console.log('error request user : ', error);
        }
    })
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening : http://localhost:%s', port);
  }
});
