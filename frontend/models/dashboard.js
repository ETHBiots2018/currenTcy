const m = require('mithril');
const contract = require('truffle-contract');
const json = require('../../build/contracts/Token.json');

// TODO: Find a way without having to hard code the contract address
const contractAddress = '0x2c2b9c9a4a25e24b174f26114e8926a9f2128fe4';

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

export default class Dashboard {
  constructor() {
    this.accounts = [];
    this.balance = 0;
    this.currentAccount = '';

    getAccounts().then((result) => {
      this.accounts = result;
      // Currently no support for multiple accounts, just use first one
      this.currentAccount = this.accounts[0];

      // load Token contract ABI
      const token = contract({ abi: json.abi });
      token.setProvider(web3.currentProvider);
      // connect to contract on blockchain
      token.at(contractAddress).then((instance) => {
        instance.balanceOf(this.currentAccount).then((balance) => {
          // balance is a BigNumber
          this.balance = balance.toNumber();
        });
      });

      // Manually trigger redraw, since we're not using m.request()
      m.redraw();
    });
  }
}
