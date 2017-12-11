import knot from 'knot.js'

const d = document
const dd = document.documentElement

const getSupport = (_, doc) => _.reduce((prev, curr) => (doc ? doc[curr] : dd[curr]) ? curr : prev, undefined)

const saidai = (options = {}) => {

  const fullscreenchange = [
    'fullscreenchange',
    'MSFullscreenChange',
    'mozfullscreenchange',
    'webkitfullscreenchange'
  ].reduce((prev, curr) => `on${curr}` in d ? curr : prev, undefined)

  const fullscreenElement = [
    'fullscreenElement',
    'msFullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'webkitCurrentFullScreenElement'
  ].reduce((prev, curr) => curr in d ? curr : prev, undefined)

  const instance = knot({
    isFullscreen () {
      return !!d[fullscreenElement]
    },
    request (el) {
      el = el || dd
      const requestFullscreen = getSupport([
        'requestFullscreen',
        'msRequestFullscreen',
        'mozRequestFullScreen',
        'webkitRequestFullscreen'
      ])
      el[requestFullscreen].call(el)
    },
    exit () {
      const exitFullscreen = getSupport([
        'exitFullscreen',
        'cancelFullScreen',
        'msExitFullscreen',
        'mozCancelFullScreen',
        'webkitExitFullscreen',
        'webkitCancelFullScreen'
      ], d)
      d[exitFullscreen].call(d)
    }
  })

  d.addEventListener(fullscreenchange, _ => instance.emit('change', instance.isFullscreen()))

  return instance
}

export default saidai
