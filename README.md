# saidai

> A simple wrapper of Fullscreen API.

## Install

This project uses [node](http://nodejs.org) and [npm](https://npmjs.com). Go check them out if you don't have them locally installed.

```sh
$ npm install --save saidai
```

or if you use [yarn](https://yarnpkg.com).

```sh
$ yarn add saidai
```

Then with a module bundler like [rollup](http://rollupjs.org/) or [webpack](https://webpack.js.org/), use as you would anything else:

```javascript
// using ES6 modules
import saidai from 'saidai'

// using CommonJS modules
var saidai = require('saidai')
```

The [UMD](https://github.com/umdjs/umd) build is also available on [unpkg](https://unpkg.com):

```html
<script src="//unpkg.com/saidai/dist/saidai.umd.js"></script>
```

This exposes the `saidai()` function as a global.

* * *

## Usage

```js
import saidai from 'saidai';

const fullscreen = saidai()

// check if some element is in Fullscreen mode
saidai.isFullscreen()

// Request to Enter Fullscreen mode
saidai.request()

// Exit Fullscreen mode
saidai.exit()

// Listen to `fullscreenchange` event
fullscreen.on('change', isFull => console.log(`Fullscreen mode: ${isFull ? 'ON' : 'OFF'}`))
```

## Examples & Demos

[**Real Example on JSFiddle**](https://jsfiddle.net/fireyy/x1fkk0hb/) ➡️

## API

saidai's API is organized as follows:

### `saidai(options: Object)`

saidai will account for the following properties in options:

  * `param` ....

### `isFullscreen()`

return if some element in Fullscreen mode

### `request()`

Request to Enter Fullscreen mode

### `exit()`

Exit Fullscreen mode
