'use strict';

const express = require('express');
const path = require('path');
const mysql = require('mysql');
const assert = require('assert');
const cmd = require('node-cmd');
const request = require('request');
const multer = require('multer');
const download = require('download-file');

/* eslint-disable no-console */

// const imageFilter = function (req, file, cb) {
//     //only accept image
//     if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
//         return cb(new Error('Only image files are allowed!'), false);
//     }
//     cb(null, true);
// };
//
// const storage = multer.diskStorage({
//    destination: function (req, file, cb) {
//        cb(null, './data');
//    },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
//
// let upload = multer({ storage: storage, fileFilter: imageFilter }).any();

let connection = mysql.createConnection({
    host : 'mysql_1',
    user : 'jwalle',
    password : '1234',
    database : 'matchadb'
});

connection.connect(function (err) {
   if (err) {
       console.error('error connecting: ' + err.stack);
       return;
   }
   console.log('connected as id ' + connection.threadId);
});

const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.join( __dirname, '../public')));
app.use(express.static(path.join( __dirname, '../data/photos')));

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

function getUser(login) {
    return new Promise(function(resolve, error) {
        let sql = "SELECT * FROM users WHERE login=?";
        connection.query(sql, login, function (err, result) {
            if (err) reject(error);
                resolve(result);
            })
        })
}

function getUserProfilePhoto(userId) {
    return new Promise(function(resolve, error) {
        let sql = "SELECT link FROM photos WHERE idUser=? AND isProfil=?"; //isProfile
        connection.query(sql, [userId, 1], function (err, result) {
            if (err) reject(error);
            resolve(result);
        })
    })
}

function downloadPhoto(url, login) {
    return new Promise((resolve, reject) => {
        let directory = "./data/photos/";
        let filename = login + '-' + Date.now() + '.jpg';
        let dlOptions = {
            directory: directory,
            filename: filename
        };
        download(url, dlOptions, function (err) {
            if (err)
                reject(err);
            resolve(filename);
        });
    })
}

function insertNewUser(user) {
    return new Promise((resolve, reject) => {
        let sql = "INSERT INTO users (login, password, email, gender, firstname, lastname, dob, registered, city, nat) VALUES (?,?,?,?,?,?,?,?,?,?)";
        let values = [
            user.login.username,
            user.login.password,
            user.email,
            user.gender[0],
            user.name.first,
            user.name.last,
            user.dob,
            user.registered,
            user.location.city,
            user.nat
        ];
        connection.query(sql, values, function (err, result) {
            if (err) reject(err);
            resolve(result.insertId);
        });
    })
}

function insertNewPhoto(link, idUser) {
    let sql = "INSERT INTO photos (link, idUser, created, isProfil) VALUES (?,?,?,?)";
    let values = [
        link,
        idUser,
        Date.now(),
        1
    ];
    return new Promise((resolve, reject) => {
        connection.query(sql, values, function (err, result) {
            if (err) reject(err);
            resolve(result);
        });
    })
}

function fillDb(user) {
    let url = user.picture.large;
    insertNewUser(user).then((result1) => {
        downloadPhoto(url, user.login.username).then((result2) => {
            insertNewPhoto(result2, result1).then(() => {
                console.log('Success ! ??');
            })
        })
    });
}

app.get('/makeUser', function (req, res, next)  {
    makeUser()
        .then((response) => {
            console.log('MAKING AN USER !!!!');
            return JSON.parse(response).results[0]
        })
        .then((response) => {
            fillDb(response);
        }).catch(next);
});

app.get('/getProfilePhoto/:id', function (req, res)  {
    getUserProfilePhoto(req.params.id)
        .then((response) => {
            res.send(response);
        })
});

app.get('/getUser/:id', function (req, res)  {
    getUser(req.params.id)
        .then((response) => {
            res.send(response);
        })
});
 
app.get('*', function (req, res) {
  res.sendFile(path.join( __dirname, '../public/index.html'));
});

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server listening : http://localhost:%s', port);
  }
});
