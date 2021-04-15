const { ipcRenderer } = require('electron');

window.addEventListener('message', ({ data }) => {
  // our embedded site did a window.postMessage and therefor we will
  // proxy it back to our main process
  ipcRenderer.send('sendToWallet', data);
});

ipcRenderer.on('fromWallet', (event, ...args) => {
  // We received an event on the postMessage channel from
  // the main process. Do a window.postMessage to forward it
  console.log('>>>> message from wallet');
  window.postMessage([], '*');
});
