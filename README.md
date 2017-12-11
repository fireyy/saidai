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

// Request to Enter Fullscreen mode
saidai.request()

// Exit Fullscreen mode
saidai.exit()

// Listen to `fullscreenchange` event
fullscreen.on('change', (isFull) => {
  if (isFull) {
    console.log('Fullscreen mode')
  } else {
    console.log('Normal mode')
  }
})
```

## Examples & Demos

[**Real Example on JSFiddle**](https://jsfiddle.net/fireyy/xxxxxxxx/) ➡️

## API

saidai's API is organized as follows:

### `saidai(options: Object)`

saidai will account for the following properties in options:

  * `param` ....
