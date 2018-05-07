const Migrations = artifacts.require("./Migrations.sol") // Required by truffle

const TestOwned      = "TestOwned.sol"
const TestProxy      = "TestProxy.sol"
const TestVersion    = "TestVersion.sol"
const TestVersioned  = "TestVersioned.sol"

module.exports = (deployer) => {
  deployer.deploy(Migrations)
  deployer.deploy(TestOwned)
  deployer.deploy(TestProxy)
  deployer.deploy(TestVersion)
  deployer.deploy(TestVersioned)
}
