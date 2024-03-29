import {Sockets} from '../../app/javascript/src/game/sockets/sockets.js';

const sinon = require('sinon');
const assert = require('assert');

describe('Sockets', function() {
  describe('#updatePlayerShipState', function() {
    it('Should not send a message to the Socket if socket is not ready', function() {
      // Given
      const hostname = "localhost";
      const socket = new Sockets(hostname, {send: sinon.spy()});

      // When
      socket.updatePlayerShipState({});

      // Then
      assert(!socket.ws.send.called);
    });

    it('Should call send on the socket if socket is ready', function() {
      // Given
      const hostname = "localhost";
      const socket = new Sockets(hostname, {send: sinon.spy(), readyState: 1});
      socket.id = 1

      // When
      socket.updatePlayerShipState({getState: sinon.spy()});

      // Then
      assert(socket.ws.send.called);
    });
  });
});