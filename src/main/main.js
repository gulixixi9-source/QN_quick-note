const { app, BrowserWindow } = require('electron')
const path = require('path')

function createWindow () {
  const mainWin = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  mainWin.loadFile('src/index.html')
}

function createNoteWindow() {
  // 随机窗口位置，不会全部叠中间
  const screen = require('electron').screen
  const display = screen.getPrimaryDisplay()
  const w = 800
  const h = 600
  const maxX = display.workArea.width - w
  const maxY = display.workArea.height - h
  const randX = Math.floor(Math.random() * maxX)
  const randY = Math.floor(Math.random() * maxY)

  const noteWin = new BrowserWindow({
    x: randX,
    y: randY,
    width: w,
    height: h,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  noteWin.loadFile('src/note.html')
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// 暴露新建笔记窗口方法给渲染层
global.createNoteWindow = createNoteWindow
