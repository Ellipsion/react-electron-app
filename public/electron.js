const { app, BrowserWindow, dialog, ipcMain, shell } = require("electron");
const path = require("path");
const { writeFile, promises } = require("fs");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    autoHideMenuBar: true,
    icon: path.join(__dirname, "favicon.png"),
    webPreferences: {
      devTools: !app.isPackaged,
      nodeIntegration: true,
      contextIsolation: true,
      enableRemoteModule: true,
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (app.isPackaged) {
    const html = path.join(__dirname, "index.html");
    console.log("loading", html);
    win.loadFile(html);
  } else {
    win.loadURL("http://localhost:3000");
  }
};

app.whenReady().then(() => {
  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

ipcMain.on("open:url", (event, link) => {
  shell.openExternal(link);
});

ipcMain.handle("get:filepath", async () => {
  const filepath = await dialog.showOpenDialog();
  console.log(filepath);
  return filepath;
});

ipcMain.handle("save:json", async (event, data) => {
  var fileSaved = false;
  const file = await dialog.showSaveDialog({
    defaultPath: "data",
    filters: [{ name: "JSON", extensions: ["json"] }],
  });
  if (file.canceled) {
    console.log("canceled");
  } else {
    writeFile(file.filePath, JSON.stringify(data), (err) => {
      if (err) {
        throw new err();
      }
      console.log("file saved succesfully!");
      fileSaved = true;
    });
  }
  return { file, fileSaved };
});

const schema = {
  keys: ["product_id", "title", "price", "sku"],
};
const checkSchema = (data) => {
  let isValid = false;
  if (Array.isArray(data)) {
    const validator = data.reduce((prev, row) => {
      var result;
      if (schema.keys.every((key) => Object.keys(row).includes(key)))
        result = true;
      else result = false;
      return result && prev;
    }, true);

    isValid = validator;
  }

  return isValid;
};

ipcMain.handle("load:json", async () => {
  var data = null;
  var loaded = false;
  const file = await dialog.showOpenDialog({
    defaultPath: "data.json",
    properties: ["openFile"],
    filters: [{ name: "JSON", extensions: ["json"] }],
  });
  if (file.canceled) {
    console.log("cancelled");
  } else {
    const filePath = file.filePaths[0];

    const rawData = await promises.readFile(filePath, "utf-8");
    try {
      const parsedData = JSON.parse(rawData);
      if (checkSchema(parsedData)) {
        console.log("valid data");
        data = { parsedData, filePath };
        loaded = true;
      } else {
        dialog.showErrorBox(
          "Invalid Data",
          `The file "${filePath}" contains invalid data.`
        );
      }
    } catch (error) {
      dialog.showErrorBox(
        "Cannot read file",
        `The file at "${filePath}" cannot be read. `
      );
      throw error;
    }
  }

  return [data, loaded];
});
