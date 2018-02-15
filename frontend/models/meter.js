const contract = require('truffle-contract');
const json = require('../../build/contracts/Token.json');

export default class Meter {
  constructor() {
    // load Token contract ABI
    const token = contract({ abi: json.abi });
    token.setProvider(web3.currentProvider);
    // connect to contract on blockchain
    token.at(window.contractAddress).then((instance) => {
      this.contract = instance;
    });
  }

  static produce() {
    const wh = document.getElementById('wh').value;
    this.contract.produce(wh, { from: window.currentAccount }).then((result) => {
      console.log(result);
      window.alert(`produced ${wh} Wh`);
    });
  }

  static consume() {
    const wh = document.getElementById('wh').value;
    this.contract.consume(wh, { from: window.currentAccount }).then((result) => {
      console.log(result);
      window.alert(`consumed ${wh} Wh`);
    });
  }
}
