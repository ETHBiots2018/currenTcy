const m = require('mithril');
const contract = require('truffle-contract');
const json = require('../../build/contracts/Token.json');

export default class PowerPlant {
  constructor() {
    // load Token contract ABI
    const token = contract({ abi: json.abi });
    token.setProvider(web3.currentProvider);
    // connect to contract on blockchain
    token.at(global.contractAddress).then((instance) => {
      this.contract = instance;
    });
  }

  static create(event) {
    // add smart meter
    const smartMeterAddress = document.getElementById('address').value;
    this.contract.addPowerPlant(smartMeterAddress, { from: global.currentAccount }).then((result) => {
      alert('Power plant created');
    });
  }
}
