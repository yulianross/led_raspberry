(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

const config = {
  hostDB: 'mongodb://yulianross:yulianross@ds147497.mlab.com:47497/mongo_example',
  hostApp: 'https://fast-oasis-25824.herokuapp.com'
};

module.exports = config;

/*
const config = {
  hostDB: 'mongodb://yulianross:yulianross@ds147497.mlab.com:47497/mongo_example',
  // mongodb://localhost:27017
  hostApp: 'https://fast-oasis-25824.herokuapp.com'
  // http://localhost:3000
}
*/

},{}],2:[function(require,module,exports){
'use strict'
    
const config = require('../../config.js');
const socket = io.connect(config.hostApp);
let sendEvent = 'false';

socket.on('broadcast', (state) => {
  sendEvent = false;
  return state === 'true' ?
    $('#toggle-led').bootstrapToggle('on'):
    $('#toggle-led').bootstrapToggle('off');
});

  $(() => {
    $( '#toggle-led' ).on('change', function(e) {
      if (sendEvent) {
        socket.emit('stateChanged', e.target.checked);
      }
    });
    $('.toggle-group').on('click', function() {
      sendEvent = true;
    });
  });

},{"../../config.js":1}]},{},[2]);
