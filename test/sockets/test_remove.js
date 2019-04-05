import {Remove} from '../../app/javascript/src/game/sockets/messages/remove.js';

const assert = require('assert');

describe('Remove', function() {
  describe('#update', function() {
    it('Should remove the ship with the given player id from the sockets network objects store', function() {
      // Given
      const socket = {
        networkObjects: {
            1: "test"
        }
      };
      const payload = {'id': 1}
      const remove = new Remove(payload, socket);

      // When
      remove.update();

      // Then
      assert(socket.networkObjects[1] == undefined);
    });
  });
});