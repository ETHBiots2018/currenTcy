const contract = require('truffle-contract');
const json = require('../../build/contracts/Token.json');

export default class PowerPlant {
  constructor() {
    // load Token contract ABI
    const token = contract({ abi: json.abi });
    token.setProvider(web3.currentProvider);
    // connect to contract on blockchain
    token.at(window.contractAddress).then((instance) => {
      this.contract = instance;
    });
  }

  static create() {
    // add smart meter
    const smartMeterAddress = document.getElementById('address').value;
    this.contract.addPowerPlant(smartMeterAddress, { from: window.currentAccount }).then(() => {
      window.alert('Power plant created');
    });
  }
}
