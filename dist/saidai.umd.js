(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.saidai = factory());
}(this, (function () { 'use strict';

var _extends = Object.assign || function (target) {
  var arguments$1 = arguments;

  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var knot = function knot() {
  var extended = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var events = Object.create(null);

  function on(name, handler) {
    events[name] = events[name] || [];
    events[name].push(handler);
    return this;
  }

  function once(name, handler) {
    handler._once = true;
    on(name, handler);
    return this;
  }

  function off(name) {
    var handler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    handler ? events[name].splice(events[name].indexOf(handler), 1) : delete events[name];

    return this;
  }

  function emit(name) {
    var arguments$1 = arguments;

    var _this = this;

    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments$1[_key];
    }

    // cache the events, to avoid consequences of mutation
    var cache = events[name] && events[name].slice();

    // only fire handlers if they exist
    cache && cache.forEach(function (handler) {
      // remove handlers added with 'once'
      handler._once && off(name, handler);

      // set 'this' context, pass args to handlers
      handler.apply(_this, args);
    });

    return this;
  }

  return _extends({}, extended, {

    on: on,
    once: once,
    off: off,
    emit: emit
  });
};

var d = document;
var dd = document.documentElement;

var getSupport = function (_, doc) { return _.reduce(function (prev, curr) { return (doc ? curr in doc : curr in d) ? curr : prev; }, undefined); };

var saidai = function (options) {
  if ( options === void 0 ) options = {};


  var fullscreenchange = getSupport([
    'onfullscreenchange',
    'onMSFullscreenChange',
    'onmozfullscreenchange',
    'onwebkitfullscreenchange'
  ]).substr(2);

  var fullscreenElement = getSupport([
    'fullscreenElement',
    'msFullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'webkitCurrentFullScreenElement'
  ]);

  var requestFullscreen = getSupport([
    'requestFullscreen',
    'msRequestFullscreen',
    'mozRequestFullScreen',
    'webkitRequestFullscreen'
  ], dd);

  var exitFullscreen = getSupport([
    'exitFullscreen',
    'cancelFullScreen',
    'msExitFullscreen',
    'mozCancelFullScreen',
    'webkitExitFullscreen',
    'webkitCancelFullScreen'
  ]);

  var instance = knot({
    isFullscreen: function isFullscreen () {
      return !!d[fullscreenElement]
    },
    request: function request (el) {
      el = el || dd;
      el[requestFullscreen].call(el);
    },
    exit: function exit () {
      d[exitFullscreen].call(d);
    }
  });

  d.addEventListener(fullscreenchange, function (_) { return instance.emit('change', instance.isFullscreen()); });

  return instance
};

return saidai;

})));
