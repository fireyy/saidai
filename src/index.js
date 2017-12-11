import Emitter from 'emitter'

const d = document.documentElement

const getSupport = _ => _.reduce((prev, curr) => d[curr] ? curr : prev, undefined)

const saidai = (options = {}) => {

  const fullscreenchange = getSupport([
    'fullscreenchange',
    'MSFullscreenChange',
    'mozfullscreenchange',
    'webkitfullscreenchange'
  ])

  const fullscreenElement = getSupport([
    'fullscreenElement',
    'msFullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'webkitCurrentFullScreenElement'
  ])

  const instance = Emitter({
    isFullscreen () {
      return !!d[fullscreenElement]
    },
    request (el) {
      el = el || d
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
      ])
      d[exitFullscreen].call(d)
    }
  })

  document.addEventListener(fullscreenchange, _ => instance.emit('change', d[fullscreenElement]))

  return instance
}

export default saidai
