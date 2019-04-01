import {Update} from '../../app/javascript/src/game/sockets/messages/update.js';

const assert = require('assert');
const sinon = require('sinon');

describe('Update', function() {
  describe('#update', function() {
    it('Should use the data from the given event to create a remote player ship and update its state', function() {
      // Given
      const socket = {'id': 1, networkObjects: {}};
      const payload = {'id': 2, state: {
        position: {x:123, y:456}
      }}
      const update = new Update(payload, socket);

      // When
      update.update();
      
      // Then
      assert(socket.networkObjects[payload.id] != undefined);
      assert.equal(socket.networkObjects[payload.id].getPosition().x, payload.state.position.x);
    });

    it('Should use the data from the given event to update a ship that already exists', function() {
      // Given
      const socket = {'id': 1, networkObjects: {
        2: {setData: sinon.spy(), setName: sinon.spy()}
      }};
      const payload = {'id': 2, state: {
        position: {x:123, y:456},
        name: "Ted"
      }};
      const update = new Update(payload, socket);

      // When
      update.update();
      
      // Then
      assert(socket.networkObjects[2].setData.called);
      assert(socket.networkObjects[2].setName.called);
    });

    it('Should not update anything if the payload id is the same as the local id', function() {
      // Given
      const socket = {'id': 1, networkObjects: {}};
      const payload = {'id': 1};
      const update = new Update(payload, socket);

      // When
      update.update();
      
      // Then
      assert.equal(Object.keys(socket.networkObjects).length, 0);
    });
  });
});