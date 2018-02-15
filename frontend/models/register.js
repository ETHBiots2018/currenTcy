const contract = require('truffle-contract');
const json = require('../../build/contracts/Token.json');

export default class Register {
  constructor() {
    // load Token contract ABI
    const token = contract({ abi: json.abi });
    token.setProvider(web3.currentProvider);
    // connect to contract on blockchain
    token.at(global.contractAddress).then((instance) => {
      this.contract = instance;
    });
  }

  static register(event) {
    const meterAddress = document.getElementById('address').value;
    this.contract.regSmartMeter(meterAddress, { from: global.currentAccount }).then((result) => {
      alert('Smart meter registered');
    });
  }

  static unregister(event) {
    const meterAddress = document.getElementById('address').value;
    this.contract.unregSmartMeter(meterAddress, { from: global.currentAccount }).then((result) => {
      alert('Smart meter unregistered');
    });
  }
}
