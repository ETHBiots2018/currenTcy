import Dashboard from './views/dashboard';
import Register from './views/register';
import PowerPlant from './views/powerplant';
import Layout from './views/layout';

// Entry point for frontend
const m = require('mithril');

let App = {};

// Is there is an injected web3 instance?
if (typeof web3 !== 'undefined') {
  App.web3Provider = web3.currentProvider;
  web3 = new Web3(web3.currentProvider);
} else {
  // If no injected web3 instance is detected, fallback to Ganache.
  App.web3Provider = new web3.providers.HttpProvider('http://127.0.0.1:7545');
  web3 = new Web3(App.web3Provider);
}

// Contract address
global.contractAddress = '0xecfcab0a285d3380e488a39b4bb21e777f8a4eac';

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
  global.currentAccount = accounts[0];

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
