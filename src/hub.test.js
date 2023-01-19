const { startEventServer, io } = require('./hub');

describe('Event Server', () => {
  test('server should start and listen for events', () => {
    const onMock = jest.spyOn(io, 'on');
    startEventServer();
    expect(onMock).toHaveBeenCalled();
  });
});
