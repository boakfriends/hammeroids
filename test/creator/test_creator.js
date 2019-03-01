import {Creator} from '../../app/javascript/src/creator/creator.js';

const assert = require('assert');
const sinon = require('sinon');

describe('Creator', function() {
  describe('#initialise', function() {
    it('Should initialise the Draw object', function() {
      // Given
      const draw = {initialise: sinon.spy()};
      const creator = new Creator(draw);
      const eventListener = sinon.spy();

      // When
      creator.initialise(eventListener);

      // Then
      assert(draw.initialise.called);
      assert.equal(eventListener.callCount, 2);
    });
  });

  describe('#mouseUp', function() {
    it('Should only add to path when mouse is in bounds', function() {
      // Given
      const draw = {initialise: sinon.spy(), inBounds: () => false};
      const creator = new Creator(draw);
      const event = {};

      // When
      creator.mouseUp(event);

      // Then
      assert.equal(creator._coords.length, 0);
    });

    it('Should add mouse coord to coords when mouse is in bounds and draw a line with current coordinates', function() {
      // Given
      const draw = {initialise: sinon.spy(), inBounds: () => true, getMouseCoords: () => { return {x: 1, y: 1};}, drawPath: sinon.spy()};
      const coordsBox = {};
      const creator = new Creator(draw, coordsBox);
      const event = {};

      // When
      creator.mouseUp(event);

      // Then
      assert.equal(creator._coords.length, 1)
      assert(draw.drawPath.called);
      assert.equal(coordsBox.innerText, "[[1,1]]");
    });
  });

  describe('#xyToCoords', function() {
    it('Should correctly format a list of coords to a readable string', function() {
      // Given
      const coords = [
        {x: 1, y: 1},
        {x: 2, y: 2},
        {x: 3, y: 3},
      ];

      // When
      const text = Creator.xyToCoords(coords);

      // Then
      assert.equal(text, "[[1,1],\n[2,2],\n[3,3]]");
    });
  });

  describe('#mouseMove', function() {
    it('Should draw path helper', function() {
      // Givem
      const draw = {drawPathHelper: sinon.spy()};
      const creator = new Creator(draw, {});

      // When
      creator.mouseMove();

      // Then
      assert(draw.drawPathHelper.called);
    });
  });
});