const { app, BrowserWindow, Menu, Tray } = require('electron');
const { autoUpdater } = require('electron-updater');
const { windowConfig } = require('./utils/windowConfig');
const path = require('path');
const { stopServers } = require('./services');

let win;

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

function createWindow() {
  win = new BrowserWindow(windowConfig);
  win.loadFile(path.join(__dirname, 'main.html'));
  win.once('ready-to-show', () => {
    win.show(); // Muestra la ventana cuando está lista
    setTimeout(() => {
      win.hide();
      autoUpdater.checkForUpdates();
      console.log(
        `Comprobación de actualizaciones. Versión actual ${app.getVersion()}`
      );
    }, 2000);
    win.isMinimized();
  });

  // Menú contextual de la bandeja del sistema
  const trayMenuTemplate = [
    {
      label: 'Salir',
      click: () => app.quit(),
    },
  ];
  // Directorio de iconos de la bandeja del sistema
  const iconPath = path.join(__dirname, 'assets', 'images'); // app es el directorio seleccionado
  const appTray = new Tray(path.join(iconPath, 'splash.png')); // app.ico es el archivo ico en el directorio de la aplicación
  // El menú contextual del icono
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate);
  // Establecer texto al hacer hover en icono de bandeja
  appTray.setToolTip('Firmador');
  // Establecer el menú contextual de este icono
  appTray.setContextMenu(contextMenu);
}

/*New Update Available*/
autoUpdater.on('update-available', (info) => {
  curWindow.showMessage(
    `Actualización disponible. Versión actual ${app.getVersion()}`
  );

  autoUpdater
    .downloadUpdate()
    .then((downloadPath) => {
      console.log('AAAAAAAAAAAAAa', downloadPath);
      console.log('Descargado en:', downloadPath);

      curWindow.showMessage('Descargando actualización...');

      // Instala la actualización después de descargarla
      autoUpdater.quitAndInstall(true, true);
    })
    .catch((error) => {
      curWindow.showMessage(
        `Error al descargar la actualización: ${error.message}`
      );
    });
});

autoUpdater.on('update-not-available', (info) => {
  curWindow.showMessage(
    `No hay actualizaciones disponibles. Versión actual ${app.getVersion()}`
  );
});

/*Download Completion Message*/
autoUpdater.on('update-downloaded', (info) => {
  curWindow.showMessage(
    `Actualización descargada. Versión actual ${app.getVersion()}`
  );
});

autoUpdater.on('error', (info) => {
  console.log('ERROOOOOR', info);

  curWindow.showMessage(info);
});

app.whenReady().then(createWindow);
app.on('window-all-closed', () => {
  stopServers();
  app.quit();
});
