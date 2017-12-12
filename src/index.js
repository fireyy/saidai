import knot from 'knot.js'

const d = document
const dd = document.documentElement

const getSupport = (_, doc) => _.reduce((prev, curr) => (doc ? curr in doc : curr in d) ? curr : prev, undefined)

const saidai = (options = {}) => {

  const fullscreenchange = getSupport([
    'onfullscreenchange',
    'onMSFullscreenChange',
    'onmozfullscreenchange',
    'onwebkitfullscreenchange'
  ]).substr(2)

  const fullscreenElement = getSupport([
    'fullscreenElement',
    'msFullscreenElement',
    'mozFullScreenElement',
    'webkitFullscreenElement',
    'webkitCurrentFullScreenElement'
  ])

  const requestFullscreen = getSupport([
    'requestFullscreen',
    'msRequestFullscreen',
    'mozRequestFullScreen',
    'webkitRequestFullscreen'
  ], dd)

  const exitFullscreen = getSupport([
    'exitFullscreen',
    'cancelFullScreen',
    'msExitFullscreen',
    'mozCancelFullScreen',
    'webkitExitFullscreen',
    'webkitCancelFullScreen'
  ])

  const instance = knot({
    isFullscreen () {
      return !!d[fullscreenElement]
    },
    request (el) {
      el = el || dd
      el[requestFullscreen].call(el)
    },
    exit () {
      d[exitFullscreen].call(d)
    }
  })

  d.addEventListener(fullscreenchange, _ => instance.emit('change', instance.isFullscreen()))

  return instance
}

export default saidai
