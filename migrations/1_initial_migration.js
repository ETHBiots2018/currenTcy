const Migrations = artifacts.require('./Migrations.sol');

module.exports = function initial(deployer) {
  deployer.deploy(Migrations);
};
