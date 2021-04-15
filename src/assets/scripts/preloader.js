const { ipcRenderer } = require('electron');

function init() {
  // add global variables to your web page
  window.isElectron = true
  window.ipcRenderer = ipcRenderer
}

init();

window.addEventListener('message', ({ data }) => {
  // our embedded site did a window.postMessage and therefor we will
  // proxy it back to our main process  
  window.ipcRenderer.send('sendToWallet', data);
});

ipcRenderer.on('fromWallet', (event, ...args) => {
  // We received an event on the postMessage channel from
  // the main process. Do a window.postMessage to forward it
  console.log('>>>> message from wallet');
  window.postMessage([], '*');
});