# 目录
main.js：主程序
preload.js: 预加载脚本

# 核心
```
const { app, BrowserWindow } = require('electron');
const path = require('node:path');
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    });
    win.loadFile('index.html');
};
app.on('ready', () => {
    createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
```