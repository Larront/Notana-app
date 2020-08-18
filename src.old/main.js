const electron = require("electron");
const url = require("url");
const path = require("path");
const fs = require('fs');

const { app, BrowserWindow, Menu, dialog, ipcMain } = electron;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}

const createWindow = () => {
    // Create new window
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, "preload.js") // use a preload script
        }
    });

    // Load HTML into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true,
    }));

    // Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    })

    // Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

    // Insert menu
    Menu.setApplicationMenu(mainMenu);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Create menu template
const mainMenuTemplate = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Session'
            },
            {
                label: 'Open Session',
                click() {
                    const files = dialog.showOpenDialog({
                        properties: ['openFile']
                    });

                    if (!files) { return; }

                    console.log(files)
                }
            },
            {
                label: 'Save Session',
                click() {
                    const files = dialog.showSaveDialog({
                        properties: ['openFile']
                    });

                    if (!files) { return; }

                    console.log(files)
                }
            },
            {
                label: 'Import Notes',
                click() {
                    const files = dialog.showOpenDialog({
                        properties: ['openFile']
                    });

                    if (!files) { return; }

                    console.log(files)
                }
            },
            {
                label: 'Quit',
                click() {
                    app.quit();
                }
            }
        ]
    }
];

// Add developer tools item to menu if not in prod
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle Dev Tools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools()
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}

// Load Database