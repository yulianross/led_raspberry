'use strict'

const io = require('socket.io');
const LedState = require('../model/led-state');

module.exports = (app, port) => {
  const ioApp = io.listen(app.listen(port, () => {
    console.log(`app corriendo el el puerto: ${port}`);
  }));

  ioApp.on('connection', function(socket) {
    LedState.find({}, null, { sort: { createdOn: -1 }}, function(err, docs) {
      if (err) throw err;
      console.log(`cosas guardadas: ${docs[0]}`);
      if (docs[0]) {
        ioApp.sockets.emit('broadcast', docs[0].status);
      } else {
        const ledState = new LedState({status: 'false'});

        ledState.save((err, ledStored) => {
          if (err) {
            console.log('error al guardar el estado del led');
          }
          console.log(`estado por defecto guardado: ${ledStored}`);
          ioApp.sockets.emit('broadcast', ledStored.status);
        });
      }

    });

    socket.on('stateChanged', function(state) {
      console.log(`server: ${state}`);
      const ledState = {'state': state};

      LedState.findOneAndUpdate(
        {'status': { $exists: true}},
        {$set:{status: state}},
        {new: true},
      (err, ledUpdated) => {
        if (err) throw err;
        console.log(`estado del led guardado: ${ledUpdated}`);
        ioApp.sockets.emit('broadcast', ledUpdated.status);
        ioApp.emit('pinChanged', state);
      });
    });
  });
};
