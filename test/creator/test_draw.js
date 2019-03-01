import {Draw} from '../../app/javascript/src/creator/draw.js';

const assert = require('assert');
const sinon = require('sinon');

describe('Creator Draw', function() {
  describe('#getMouseCoords', function() {
    it('Should return mouse coordinates snapped to grid', function() {
      // Given
      const rect = {left: 0, top: 0, width: 1024, height: 768};
      const context = mockContext();
      const getContext = () => context
      const canvas = {getContext: getContext, getBoundingClientRect: () => rect};
      const draw = new Draw(canvas);
      const event = {clientX: 10.5, clientY: 8.2}

      // When
      const coords = draw.getMouseCoords(event);

      // Then
      assert.equal(coords.x % draw.GRID_SIZE, 0);
      assert.equal(coords.y % draw.GRID_SIZE, 0);
    });

    it('Should return mouse coordinates snapped to grid', function() {
      // Given
      const rect = {left: 0, top: 0, width: 1024, height: 768};
      const context = mockContext();
      const getContext = () => context
      const canvas = {getContext: getContext, getBoundingClientRect: () => rect};
      const draw = new Draw(canvas);
      const event = {clientX: 1.5, clientY: 8.2}

      // When
      const coords = draw.getMouseCoords(event);

      // Then
      assert.equal(coords.x % draw.GRID_SIZE, 0);
      assert.equal(coords.y % draw.GRID_SIZE, 0);
    });
  })
  describe('#inBounds', function() {
    it('Should report that the mouse is out of bounds when it\'s outside the canvas', function() {
      // Given
      const rect = {left: 0, top: 0, width: 1024, height: 768};
      const context = mockContext();
      const getContext = () => context
      const canvas = {getContext: getContext, getBoundingClientRect: () => rect};
      const draw = new Draw(canvas);
      const event = {clientX: 1025, clientY: 8.2}
      
      // Then
      assert(!draw.inBounds(event));
    });

    it('Should report that the mouse is in bounds when it\'s inside the canvas', function() {
      // Given
      const rect = {left: 10, top: 0, width: 1024, height: 768};
      const context = mockContext();
      const getContext = () => context
      const canvas = {getContext: getContext, getBoundingClientRect: () => rect};
      const draw = new Draw(canvas);
      const event = {clientX: 1033, clientY: 8.2}
      
      // Then
      assert(draw.inBounds(event));
    });
  });

  describe('#initialise', function() {
    it('Should draw a box and a grid', function() {
      // Given
      const rect = {left: 0, top: 0, width: 1024, height: 768};
      const context = mockContext();
      const getContext = () => context
      const canvas = {getContext: getContext, getBoundingClientRect: () => rect};
      const draw = new Draw(canvas);
      const event = {clientX: 10.5, clientY: 8.2}

      // When
      draw.initialise();

      // Then
      assert(context.fillRect.called);
      assert.equal(context.stroke.callCount, 180); // width and height % 10 plus two at grid 0
    })
  });

  describe('#drawPathHelper', function() {
    it('Should draw a helper point and no path when coords are empty', function() {
      // Given
      const rect = {left: 0, top: 0, width: 1024, height: 768};
      const context = mockContext();
      const getContext = () => context
      const canvas = {getContext: getContext, getBoundingClientRect: () => rect};
      const draw = new Draw(canvas);
      const event = {clientX: 10.5, clientY: 8.2}
      const coords = [];

      // When
      draw.drawPathHelper(coords, event);

      // Then
      assert.equal(context.fillStyle, "#42e5f4");
      assert(context.fillRect.called); // Box drawn
      assert(context.stroke.callCount, 180); // Only grid lines drawn
    })
  });

  describe('#drawPath', function() {
    it('Should draw the given path', function() {
      // Given
      const rect = {left: 0, top: 0, width: 1024, height: 768};
      const context = mockContext();
      const getContext = () => context
      const canvas = {getContext: getContext, getBoundingClientRect: () => rect};
      const draw = new Draw(canvas);
      const event = {clientX: 10.5, clientY: 8.2}
      const coords = [{x:1, y:1}, {x:2, y:2}];
      
      // When
      draw.drawPath(coords);

      // Then
      assert.equal(context.stroke.callCount, 1); //Should only draw the given coords
    })
  });
})

function mockContext() {
  return {
    fillRect: sinon.spy(),
    beginPath: sinon.spy(),
    moveTo: sinon.spy(),
    lineTo: sinon.spy(),
    stroke: sinon.spy()
  }
}