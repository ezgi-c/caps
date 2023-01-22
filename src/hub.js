const { Server } = require('socket.io');
const { EVENT_NAMES } = require('./utils');

const { Queue } = require('../queue');

const io = new Server(3333);

const packageQueue = new Queue();
const waitingDrivers = new Queue();

function startEventServer() {
  io.on('connection', (socket) => {
    console.log('have new connection', socket.id);

    socket.on(EVENT_NAMES.driver_ready, (driverId) => {
        waitingDrivers.enqueue(driverId);
      console.log(driverId);
      console.log(waitingDrivers);
    });

    socket.on(EVENT_NAMES.pickup, (order) => {
      packageQueue.enqueue(order);
      console.log(packageQueue);
      if (!waitingDrivers.isEmpty()) {
        const driver = waitingDrivers.dequeue();
        const dequeuedOrder = packageQueue.dequeue();
        socket.broadcast.to(driver).emit(EVENT_NAMES.pickup, dequeuedOrder)
      } else {
        io.emit('No drivers available')
      }
    });

    // socket.on(EVENT_NAMES.delivered, (delivered) => {
    //   console.log('HUB delivered', delivered);

    //   io.emit(EVENT_NAMES.delivered, delivered);
    // });

    // socket.on(EVENT_NAMES.received, (delivered) => {
    //   console.log('HUB received:', delivered);

    // });

    // socket.on(EVENT_NAMES.getAll, (payload) => {
    //   console.log('HUB getAll:', payload);
    // });
  });

  console.log('Everything is started!');
}



module.exports = { startEventServer, io };
