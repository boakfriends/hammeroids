var assert = require('assert');

var app = require('../app/javascript/src/thing.js');

describe('Thing', function(){
  describe('#test()', function(){
    it('should return the argument it\'s given', function(){
      var t = new app.Thing('something');
      assert.equal(t.test(), 'something');
    });
  });
});