const { events, chance, EVENT_NAMES } = require('../eventPool');

// Vendor sends a pickup event for a store

function sendPickup() {
  const event = {
    store: chance.city(),
    orderId: chance.guid(),
    customer: chance.name(),
    address: chance.address(),
  };
  console.log('Vendor asking for pickup!', event);
  events.emit(EVENT_NAMES.pickup, event);
}

function acknowledgeDelivery(orderId) {
  console.log('Vendor thanks you for the delivery!', orderId);
}

function startVendor() {
  events.on(EVENT_NAMES.delivered, acknowledgeDelivery);
  console.log('Vendor ready!');

  function ready() {
    sendPickup();
    setTimeout(ready, chance.integer({ min: 1000, max: 5000 }));
  }
  ready();
}

module.exports = {
  startVendor,
  toTest: {
    sendPickup,
  },
};
