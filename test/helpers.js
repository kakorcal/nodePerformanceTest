module.exports = {
  noop: function noop(){},
  add: function add(a, b){return a + b;},
  some: function some(arr, cb){
    for(var i = 0; i < arr.length; i++){
      if(cb(arr[i])) return true;
    }
    return false;
  },
  arrayReduce: function arrayReduce(iteratee, array, accumulator, initAccum) {
    // lodash method - https://github.com/lodash/lodash/blob/master/dist/lodash.js#L681
    var index = -1,
        length = array ? array.length : 0;

    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
};