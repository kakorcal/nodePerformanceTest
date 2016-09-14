'use strict';
module.exports = function testPerformance(fcn, inputIdx){
  var args = Array.prototype.slice.call(arguments, 2);
  var t0, t1, time, input, N, output;

  // no arguments 
  if(arguments.length < 2) throw "Please include parameters (fcn, inputIdx, ...args) \n fcn - The function that will be tested for performance. \n inputIdx - The index of the input array in the fcn argument. Defaults to 0 if not specified. \n ...args - The rest of the necessary arguments for fcn. Must be in the same order as the fcn.";

  // check fcn
  if(typeof fcn !== 'function') throw 'Please include a function to test.';

  // check inputIdx 
  if(typeof inputIdx !== 'number'){
    if(Array.isArray(inputIdx)){
      N = inputIdx;
      input = [inputIdx].concat(args);
    }else{
      throw 'Please include a number or an array. Need to specify input index if it is not the first argument';
    }
  }else if(inputIdx < 0){
    throw 'Please include a positive integer for the input index.';
  }else if(!Array.isArray(args[inputIdx])){
    throw 'Please include the correct input index.';
  }else{
    N = args[inputIdx];
    input = args;    
  }

  // check args
  // if(!input.some(function(arg){return Array.isArray(arg);})) throw 'Arguments must have an input array.';
  if(fcn.length !== input.length) throw 'Please add the necessary arguments for the function.';

  t0 = present();
  output = fcn.apply(null, input);
  t1 = present();
  time = (t1-t0).toFixed(4);
  
  console.log('     N :', N.length);
  console.log('  Time :', time, 'ms');
  console.log('Output :', output);  

  // props to: https://github.com/dbkaplun/present/blob/master/lib/present-node.js
  function present() {
    var time = process.hrtime();
    return time[0] * 1e3 + time[1] / 1e6;
  };

  return {
    n: N.length,
    time: time,
    output: output
  };
}