const { EVENT_NAMES, chance } = require('../utils');

const { io } = require('socket.io-client');

const socket = io('ws://localhost:3333');

function startDriver() {
  socket.on('connect', () => {
    console.log('Driver ready!');
    console.log(socket.id);
    socket.emit(EVENT_NAMES.driver_ready, socket.id);
  })
 

  socket.on(EVENT_NAMES.pickup, handlePickup);
}

function handlePickup(order) {
  setTimeout(
    () => deliver(order.orderId),
    chance.integer({ min: 1000, max: 5000 })
  );
}

function deliver(orderId) {
  console.log('Driver finished delivery', orderId);
  // events.emit(EVENT_NAMES.delivered, { clientId, orderId});
}





module.exports = {
  // deliver,
  // handlePickup,
  // events,
  startDriver,
};
