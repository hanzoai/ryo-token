let Master = artifacts.require('TestMaster')
let Library = artifacts.require('TestLibrary')

contract('Ensure library version can be set', async (accounts) => {
  let master = await Master.deployed()
  let library = await Library.deployed()
  await master.setVersion(library.address)
  let version = master.currentVersion.call()
  version.should.eq(library.address)
})
