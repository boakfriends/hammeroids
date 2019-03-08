import {Lobby} from '../../app/javascript/src/game/ui/lobby.js';

const assert = require('assert');
const sinon = require('sinon');

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

describe('Lobby', function() {
  describe('#update', function() {

    /**
    * Sets up a new DOM with a 'lobby' div and no players
    **/
    beforeEach(function() {
      const jsdom = new JSDOM('<!DOCTYPE html><html><body><div id="lobby"></div></body></html>');
      const { window } = jsdom
      global.window = window;
      global.document = window.document;
    });

    /**
    * Helper function for testing if the DOM body element contains text
    **/
    const bodyContains = (text) => {
      return global.document.body.innerHTML.indexOf(text) > -1;
    }

    /**
    * Default payload of 2 players
    **/
    const payload = {players: [
      {
        name: "Rick",
        id: 'C-137'
      },{
        name: "Doofus Rick",
        id: 'J-19 Zeta 7'
      }
    ]};

    it('Should do nothing if the element id returns an element that doesn\'t exist', function() {
      // Given
      const lobby = new Lobby(payload, 'test');

      // When
      assert(!global.document.getElementById('lobby').firstChild);
      lobby.update();

      // Then
      assert(!bodyContains(payload.players[0].name));
      assert(!global.document.getElementById('lobby').firstChild);
    });

    it('Should update the DOM with new player (1) when none exist and one is passed in payload', function() {
      // Given
      const payloadOnePlayer = {players: [
        {
          name: "Rick",
          id: 'C-137'
        }
      ]};
      const lobby = new Lobby(payloadOnePlayer);

      // When
      assert(!global.document.getElementById('lobby').firstChild);
      lobby.update();

      // Then
      assert(bodyContains(payloadOnePlayer.players[0].name));
    });

    it('Should update the DOM with new players (2) when none exist and 2 are passed in payload', function() {
      // Given
      const lobby = new Lobby(payload);

      // When
      assert(!global.document.getElementById('lobby').firstChild);
      lobby.update();

      // Then
      assert.equal(global.document.getElementById('lobby').childNodes.length, 2);
      assert(bodyContains(payload.players[0].name));
      assert(bodyContains(payload.players[1].name));
    });

    it('Should remove all existing players if none in payload', function() {
      // Given
      let lobby = new Lobby(payload);
      lobby.update();
      assert.equal(global.document.getElementById('lobby').childNodes.length, 2);

      // When
      lobby = new Lobby({players: []});
      lobby.update();

      // Then
      assert.equal(global.document.getElementById('lobby').childNodes.length, 0);
    });

    it('Should not update the DOM if the payload has no players', function() {
      // Given
      const lobby = new Lobby({});

      // When
      assert(!global.document.getElementById('lobby').firstChild);
      lobby.update();

      // Then
      assert(!global.document.getElementById('lobby').firstChild);
    });
  });
})