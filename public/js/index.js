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
