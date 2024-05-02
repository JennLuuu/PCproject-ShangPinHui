var my = {};

my.throttle = function (center, time) {
  var lastDate = new Date();
  return function (e) {
    var nowDate = new Date();
    if (nowDate - lastDate < time) {
      return;
    }
    center.call(this, e);
  };
};
