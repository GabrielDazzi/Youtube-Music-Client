const {
  app,
  BrowserWindow,
  Menu,
  globalShortcut,
  ipcMain,
  Notification,
} = require("electron");
const path = require("path");
require("cross-fetch/polyfill");
const { ElectronBlocker } = require("@ghostery/adblocker-electron");

let store;
let mainWindow;
let blocker;

const plugins = [];

const handleSongChanged = (event, songInfo) => {};

function togglePlugin(pluginId) {}

function buildMenu() {
  const isMac = process.platform === "darwin";

  const menuTemplate = [
    ...(isMac
      ? [
        
          {
            label: app.name,
            submenu: [
              { role: "about", label: "Sobre o App" },
              { type: "separator" },
              { role: "services", label: "Serviços" },
              { type: "separator" },
              { role: "hide", label: "Ocultar" },
              { role: "hideOthers", label: "Ocultar Outros" },
              { role: "unhide", label: "Mostrar Tudo" },
              { type: "separator" },
              {
                label: "Sair",
                accelerator: "Command+Q",
                click: () => {
                  app.quit();
                },
              },
            ],
          },
        ]
      : []),
    { role: "fileMenu", label: "Arquivo" },
    { role: "editMenu", label: "Editar" },
    { role: "viewMenu", label: "Visualizar" },
    { role: "windowMenu", label: "Janela" },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

function registerMediaKeys() {
  if (!mainWindow) {
    return;
  }
  globalShortcut.register("MediaPlayPause", () => {
    mainWindow.webContents.send("media-control", "play-pause");
  });
  globalShortcut.register("MediaNextTrack", () => {
    mainWindow.webContents.send("media-control", "next");
  });
  globalShortcut.register("MediaPreviousTrack", () => {
    mainWindow.webContents.send("media-control", "previous");
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    autoHideMenuBar: true,
  });

  if (blocker) {
    blocker.enableBlockingInSession(mainWindow.webContents.session);
  } else {
    console.error("Ad-blocker não foi inicializado a tempo.");
  }

  mainWindow.loadURL("https://music.youtube.com");

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    blocker = await ElectronBlocker.fromPrebuiltAdsAndTracking(fetch);
    console.log("Ad-blocker inicializado com sucesso.");
  } catch (error) {
    console.error("Falha ao inicializar o ad-blocker:", error);
  }

  const { default: Store } = await import("electron-store");
  store = new Store();

  buildMenu();
  createWindow();
  registerMediaKeys();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
