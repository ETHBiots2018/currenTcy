import Dashboard from './views/dashboard';
import Register from './views/register';
import PowerPlant from './views/powerplant';
import Layout from './views/layout';

const m = require('mithril');

// Contract address
// Set as property of window object... better than using globals I guess...
window.contractAddress = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';

// Promisification of getAccounts()
// Works by ignoring the error and only passing on the result
// Ain't nobody got time for error handling!
function getAccounts() {
  return new Promise((resolve, reject) => {
    web3.eth.getAccounts((error, result) => {
      resolve(result);
    });
  });
}

// Get current account
getAccounts().then((accounts) => {
  window.currentAccount = accounts[0];

  // Mithril routing
  m.route(document.body, '/', {
    '/': {
      view() {
        return m(Layout, m(Dashboard));
      },
    },
    '/register': {
      view() {
        return m(Layout, m(Register));
      },
    },
    '/powerplant': {
      view() {
        return m(Layout, m(PowerPlant));
      },
    },
  });
});
