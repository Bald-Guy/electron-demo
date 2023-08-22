const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  mainWindow.loadFile("index.html");
  // mainWindow.loadURL('https://github.com')
  const contents = mainWindow.webContents
  console.log(contents)

  // mainWindow.webContents.openDevTools();
};

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
