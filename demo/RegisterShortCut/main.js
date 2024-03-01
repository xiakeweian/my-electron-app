const { app, BrowserWindow, globalShortcut } = require('electron');
let mainWindow = null;
app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
    });
    mainWindow.loadFile('index.html');
    globalShortcut.register('Alt+CommandOrControl+I', () => {
        mainWindow.loadURL('https://www.baidu.com');
    });
    let isRegister = globalShortcut.isRegistered('Alt+CommandOrControl+I') ? 'Success' : 'Fail';
    console.log('------>' + isRegister);
    mainWindow.webContents.on('before-input-event', (event, input) => {
        if (input.control && input.key.toLowerCase() === 'i') {
          console.log('Pressed Control+I')
          event.preventDefault();
        }
      })
    mainWindow.on('close', () => {
        mainWindow = null;
    })
});

// function createWindow () {
//     const win = new BrowserWindow({
//       width: 800,
//       height: 600
//     })
  
//     win.loadFile('index.html')
//   }
// app.whenReady().then(() => {
//   globalShortcut.register('Alt+CommandOrControl+I', () => {
//     console.log('Electron loves global shortcuts!')
//   })
// }).then(createWindow)

app.on('will-quit', () => {
    // 注销快捷键  
    globalShortcut.unregister('Alt+CommandOrControl+I');
    // 注销所有快捷键 
    globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})


