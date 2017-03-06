'use strict'

const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.get('/api/v1/ads', (req, resp) => {
  fs.createReadStream(path.join(__dirname, 'server', 'ads.json')).
    pipe(resp)
})

app.get('/api/v1/metrics', (req, resp) => {
  fs.createReadStream(path.join(__dirname, 'server', 'metrics.json')).
    pipe(resp)
})

const isDeveloping = process.env.NODE_ENV !== 'production'

if (isDeveloping) {
  /* hack the webpack filesystem yaaaaaay! */
  const webpack = require('webpack')
  const wpMw = require('webpack-dev-middleware')
  const wpHotMw = require('webpack-hot-middleware')
  const config = require('./webpack.dev.config.js')
  const compiler = webpack(config)
  const mw = wpMw(compiler, {
    publicPath: config.output.publicPath,
    contentBase: 'app',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      module: false
    }
  })

  app.use(mw)
  app.use(wpHotMw(compiler))

  app.get('*', (req, resp) => {
    resp.write(mw.fileSystem.readFileSync(path.join(__dirname, 'index.html')))
    resp.end()
  })
}
else {
  app.use(express.static(path.join(__dirname, 'public')))
  app.get('*', (req, resp) => {
    fs.createReadStream(path.join(__dirname, 'public', 'index.html')).
      pipe(resp)
  })
}

app.listen(process.env.PORT || 3000, () => console.log(
  "Server running, open http://localhost:3000 in your browser to view"
)).on('error', console.log)
