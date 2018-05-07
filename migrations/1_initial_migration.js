let Migrations = artifacts.require('Migrations.sol')
let Library = artifacts.require('Library.sol')
let Master = artifacts.require('Master.sol')

module.exports = (deployer) => {
  deployer.deploy(Migrations)
  deployer.deploy(Library)
  deployer.deploy(Master)
}
