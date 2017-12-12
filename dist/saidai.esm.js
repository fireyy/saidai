import knot from 'knot.js';

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

export default saidai;
