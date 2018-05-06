let Migrations = artifacts.require('Migrations.sol')
let Library = artifacts.require('TestLibrary.sol')
let Master = artifacts.require('TestMaster.sol')

module.exports = (deployer) => {
  deployer.deploy(Migrations)
  deployer.deploy(Library)
  deployer.deploy(Master)
}
