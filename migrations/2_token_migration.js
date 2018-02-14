const Token = artifacts.require('./Token.sol');

module.exports = function token(deployer) {
  deployer.deploy(Token);
};
