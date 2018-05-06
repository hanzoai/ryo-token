let Master = artifacts.require('TestMaster')
let Library = artifacts.require('TestLibrary')

contract('Upgradeable', async (accounts) => {
  it('should upgrade version correctly', async ()=> {
    let master = await Master.deployed()
    let library = await Library.deployed()
    await master.setVersion(library.address)
    let version = await master.currentVersion.call()
    assert(version === library.address, 'Version is set to latest')
  })
})
