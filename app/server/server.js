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


function makeUser() {
    return new Promise(function (resolve, error) {
        let options = {
            url: 'https://randomuser.me/api/?nat=gb,fr,dk,ca,us,de',
            dataType: 'json'
        };
        request.get(options, function(error, response, body) {
            if (!error) {                                           // && response.statusCode === 200
                resolve(body);
            }
            else {
                reject('error request user : ', error);
            }
        })
    })
}

function getUser(username) {
    return new Promise(function(resolve, error) {
        client.connect(uri, function (err, db) {
            if (err) throw err;
            let query = {username}
            db.collection('users').find(query).toArray(function (err, result) {
                if (err) throw err;
                resolve(result);
                db.close();
            })
        })
    })
}

function fillDb(user) {
    client.connect(uri, function (err, db) {
        db.collection('users').insertOne(
            {
                username :  user.login.username,
                password :  user.login.password,
                email:      user.email,
                gender :    user.gender,
                firstname:  user.name.first,
                lastname:   user.name.last,
                dob:        user.dob,
                registered: user.registered,
                picture:    user.picture,
                city:       user.location.city,
                nat:        user.nat
            }
        );
        db.close();
    })
}

app.get('/getUser/:id', function (req, res, next)  {
        makeUser()
            .then((response) => {
            return JSON.parse(response).results[0]
        })
            .then((response) => {
            fillDb(response);
        }).then(() => {
            getUser(req.params.id)
                .then((response) => {
                res.send(response);
                })
        }).catch(next);
});

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


app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening : http://localhost:%s', port);
  }
});
