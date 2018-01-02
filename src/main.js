const {app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')
const client = require('electron-connect').client

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function checkProdEnv() {
  // This will check if the app is running in prod mode, incompatible with non-asar packages.
  return process.mainModule.filename.indexOf('app.asar') === -1
}

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({width: 800, height: 600})

  // Our dev URL will point to the webpack-dev-server.
  const devURL = 'http://localhost:40305'
  const prodURL = `file://${__dirname}'/../dist/index.html`
  const URL = checkProdEnv() ? devURL : prodURL

  // Load the URL.
  win.loadURL(URL)

  // Open the DevTools.
  if (checkProdEnv()) { win.webContents.openDevTools() }

  // Create the electron-connect client.
  if (checkProdEnv()) { client.create(win) }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
