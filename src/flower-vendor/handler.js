const { chance, EVENT_NAMES } = require('../utils');
const { io } = require('socket.io-client');

const socket = io('ws://localhost:3333');

function startFlowerVendor() {
  socket.on('connect', () => {
    console.log(socket.id);
    console.log('Vendor ready!');
    ready();
  })
  function ready() {
    sendPickup();
    setTimeout(ready, chance.integer({ min: 5000, max: 10000 }));
  }
  function sendPickup() {
    const order = {
      clientId: '1-800-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
    console.log('Vendor asking for pickup!', order);
    socket.emit(EVENT_NAMES.pickup, order, socket.id);
  }

  // socket.emit(EVENT_NAMES.getAll, {clientId: '1-800-flowwers', event: EVENT_NAMES.delivered});

  // socket.on(EVENT_NAMES.delivered, (payload) => {
  //   console.log('acme-widgets acknowledges delivery:', payload);
  //   events.emit(EVENT_NAMES.received, {clientId: '1-800-flowers', messageId: payload.messageId});
  // });
  
  

  
}



module.exports = {
    // sendPickup,
    // events,
    startFlowerVendor,
};
