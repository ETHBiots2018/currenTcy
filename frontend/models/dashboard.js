const m = require('mithril');
const contract = require('truffle-contract');
const json = require('../../build/contracts/Token.json');

export default class Dashboard {
  constructor() {
    this.balance = 0;

    // load Token contract ABI
    const token = contract({ abi: json.abi });
    token.setProvider(web3.currentProvider);
    // connect to contract on blockchain
    token.at(window.contractAddress).then((instance) => {
      instance.balanceOf(window.currentAccount).then((balance) => {
        // balance is a BigNumber
        this.balance = balance.toNumber();
        // manually trigger redraw, since we're not using m.request()
        m.redraw();
      });
    });
  }
}
