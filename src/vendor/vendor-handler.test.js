const { EVENT_NAMES } = require('../utils');
const {
  toTest: { sendPickup, events },
} = require('./handler');

jest.useFakeTimers();

test('Vendor sendPickup', () => {
  // Arrange
  const emitMock = jest.spyOn(events, 'emit');

  // Act

  sendPickup();

  // Timers - skip setTimeout
  jest.runAllTimers();

  // Assert
  expect(emitMock).toHaveBeenCalledWith(
    EVENT_NAMES.pickup,
    expect.objectContaining({
      store: expect.stringContaining(''),
      orderId: expect.stringMatching(
        /[0-9A-F]{8}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{4}-[0-9A-F]{12}/i
      ),
    })
  );
events.close();
});
