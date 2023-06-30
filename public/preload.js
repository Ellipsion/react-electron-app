const { channel } = require("diagnostics_channel");
const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

const api = {
  fs,
};

const services = {
  global: {
    send: (channel, data) => ipcRenderer.send(channel, data),
    on: (channel, func) =>
      ipcRenderer.on(channel, (event, ...args) => func(...args)),
    invoke: (channel, ...args) => ipcRenderer.invoke(channel, ...args),
  },
  getFilePath: () => ipcRenderer.invoke("get:filepath"),
  saveJson: (data) => ipcRenderer.invoke("save:json", data),
  loadJson: () => ipcRenderer.invoke("load:json"),
  openLink: (link) => ipcRenderer.send("open:url", link),
};

contextBridge.exposeInMainWorld("electron", api);
contextBridge.exposeInMainWorld("services", services);
