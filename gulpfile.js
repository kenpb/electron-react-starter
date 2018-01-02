const gulp = require('gulp')
const electronConnect = require('electron-connect')
const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackConfig = require('./webpack.config.js')

// will run the electron and webpack at the same time
gulp.task('dev', () => {
  const entryPoint = `${__dirname}/src/main.js`
  // we add stopOnClose true to kill everything once the last window is closed
  const electron = electronConnect.server.create({ stopOnClose: true, logLevel: 1 })

  // the API will ignore any devServer config in the file
  const devServerOptions = {
    contentBase: './dist',
    hot: true,
    host: 'localhost',
  }

  // setup the webpack server via API and enable the HMR module
  // https://github.com/webpack/webpack/issues/1151#issuecomment-162792966
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
  // https://webpack.js.org/guides/hot-module-replacement/#via-the-node-js-api
  webpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
  const compiler = webpack(webpackConfig)
  const devServer = new webpackDevServer(compiler, devServerOptions)
  
  // serve the 
  devServer.listen(40305, 'localhost', () => {
    console.log('Starting server on http://localhost:40305')
  })

  // this callback will kill the webpack server once we close the electron
  const stopOnClose = (electronProcState) => {
    // if the received status is stopped
    if (electronProcState == 'stopped') {
      devServer.close()
      // exit the electron-connect too
      process.exit()
    }
  }

  // Start browser process
  electron.start(entryPoint, stopOnClose)

  // Restart browser process
  gulp.watch(entryPoint, () => { electron.restart(stopOnClose) })
})

gulp.task('default', ['dev'])
