var npt = require('../lib/npt');
var helpers = require('./helpers.js');
var expect = require('chai').expect;

describe('npt', function(){
  var arr = [1,2,3,4,5,6,7,8,9];

  describe('noop', function(){
    it('should throw an error if arguments are less than 2', function(){
      expect(npt.bind(null, helpers.noop)).to.throw('Please include parameters (fcn, inputIdx, ...args) \n fcn - The function that will be tested for performance. \n inputIdx - The index of the input array in the fcn argument. Defaults to 0 if not specified. \n ...args - The rest of the necessary arguments for fcn. Must be in the same order as the fcn.');
    });
  });

  describe('some', function(){
    it('should throw an error if second argument is not an array or number', function(){
      expect(npt.bind(null, helpers.some, 'foo')).to.throw('Please include a number or an array. Need to specify input index if it is not the first argument');
    });

    it('should throw an error if the index is negative', function(){
      expect(npt.bind(null, helpers.some, -1)).to.throw('Please include a positive integer for the input index.');
    });

    it('should throw an error if function length and input length are not equal', function(){
      expect(npt.bind(null, helpers.some, arr)).to.throw('Please add the necessary arguments for the function.');
    });

    it('should work with or without input index if input array is in place', function(){
      expect(npt(helpers.some, arr, function(el){return el === 3}).output).to.equal(true);
      expect(npt(helpers.some, 0, arr, function(el){return el === 3}).output).to.equal(true);
      expect(npt.bind(null, helpers.some, 1, arr, function(el){return el === 3})).to.throw('Please include the correct input index.');
    });
  });

  describe('array reduce', function(){
    it('should work array argument not at 0', function(){
      expect(npt(helpers.arrayReduce, 1, helpers.add, arr, 0, true).output).to.equal(45);
    });

    it('should throw an error if array is not included', function(){
      expect(npt.bind(null, helpers.arrayReduce, 1, helpers.add, 'arr', 0, true)).to.throw('Please include the correct input index.');
    });
  });
});