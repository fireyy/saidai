'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var knot = _interopDefault(require('knot.js'));

var d = document;
var dd = document.documentElement;

var getSupport = function (_, doc) { return _.reduce(function (prev, curr) { return (doc ? doc[curr] : dd[curr]) ? curr : prev; }, undefined); };

var saidai = function (options) {
  if ( options === void 0 ) options = {};


  var fullscreenchange = [
    'fullscreenchange',
    'MSFullscreenChange',
    'mozfullscreenchange',
    'webkitfullscreenchange'
  ].reduce(function (prev, curr) { return ("on" + curr) in d ? curr : prev; }, undefined);

  var fullscreenElement = [
    'fullscreenElement',
    'msFullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'webkitCurrentFullScreenElement'
  ].reduce(function (prev, curr) { return curr in d ? curr : prev; }, undefined);

  var instance = knot({
    isFullscreen: function isFullscreen () {
      return !!d[fullscreenElement]
    },
    request: function request (el) {
      el = el || dd;
      var requestFullscreen = getSupport([
        'requestFullscreen',
        'msRequestFullscreen',
        'mozRequestFullScreen',
        'webkitRequestFullscreen'
      ]);
      el[requestFullscreen].call(el);
    },
    exit: function exit () {
      var exitFullscreen = getSupport([
        'exitFullscreen',
        'cancelFullScreen',
        'msExitFullscreen',
        'mozCancelFullScreen',
        'webkitExitFullscreen',
        'webkitCancelFullScreen'
      ], d);
      d[exitFullscreen].call(d);
    }
  });

  d.addEventListener(fullscreenchange, function (_) { return instance.emit('change', instance.isFullscreen()); });

  return instance
};

module.exports = saidai;
