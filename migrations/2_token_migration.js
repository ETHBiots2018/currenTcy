const Token = artifacts.require('./Token.sol');

module.exports = function token(deployer) {
  deployer.deploy(Token, { from: '0x627306090abab3a6e1400e9345bc60c78a8bef57' });
};
