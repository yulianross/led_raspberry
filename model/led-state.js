'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ledSchema = Schema({
  status: String,
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ledSchema', ledSchema);
