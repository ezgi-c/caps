const { events, EVENT_NAMES } = require('../eventPool');
const {
  toTest: { sendPickup },
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
  expect(emitMock).toHaveBeenCalledWith(EVENT_NAMES.pickup, expect.any(Object));
});