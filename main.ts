import { app, BrowserWindow, screen, Tray, Menu } from 'electron';
import * as path from 'path';
import * as url from 'url';

let win, serve, trayIcon;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');
let isQuiting = false;

function openWindow() {
  if (win !== undefined) {
    win.show();
  }
}

function createWindow() {
  if (serve) {
    trayIcon = new Tray(path.join(__dirname, '/src/assets/img.png'));
  } else {
    trayIcon = new Tray(path.join(__dirname, '/dist/assets/img.png'));
  }
  trayIcon.on('click', openWindow);
  const trayMenu = Menu.buildFromTemplate([
    {
      label: 'Show App', click: openWindow
    },
    {
      label: 'Quit', click: function () {
        isQuiting = true;
        app.quit();
      }
    }
  ]);
  trayIcon.setContextMenu(trayMenu);

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  if (serve) {
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  if (serve) {
    win.webContents.openDevTools();
  }

  win.on('close', function (event) {
    if (!isQuiting) {
      event.preventDefault();
      win.minimize();
    }
    return false;
  });

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    // trayIcon = null;
    win = null;
  });

}

try {

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on('ready', createWindow);

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
