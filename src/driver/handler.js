const { EVENT_NAMES, chance } = require('../utils');

const { io } = require('socket.io-client');
const events = io('ws://localhost:3333');

function deliver(orderId) {
  console.log('Driver finished delivery', orderId);
  events.emit(EVENT_NAMES.delivered, orderId);
}

function handlePickup(event) {
  console.log('Driver received a pickup event!', event.orderId);
  setTimeout(
    () => deliver(event.orderId),
    chance.integer({ min: 1000, max: 3000 })
  );
}

function startDriver() {
  console.log('Driver ready!');

  events.on(EVENT_NAMES.pickup, handlePickup);
}

module.exports = {
  toTest: {
    deliver,
    handlePickup,
    events,
    startDriver,
  },
};
