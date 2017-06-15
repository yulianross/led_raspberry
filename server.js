'use strict'

const express = require('express');
const db = require('./model/db');
const app = express();
const port = process.env.PORT || 3000;
const ioApp = require('./sockets/sockets');

app.use(express.static(__dirname + '/public'));
app.get('/',(req, res) => {
    res.sendFile(__dirname + '/public/client.html')
});

db.addMongooseEvents();
db.connectMongoose()
  .then(() => {
    ioApp(app, port);
  })
  .catch(() => {
    console.log('error al conectarse a la base de datos');
  });
