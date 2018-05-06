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
  it('should allow proxied methods', async ()=> {
    let master = await Master.deployed()
    let library = await Library.deployed()
    await master.setVersion(library.address)
    let proxy = await Library.at(master.address)
    let foo = await proxy.foo.call()
    assert(foo === "bar", 'Unable to call foo on upgradable contract')
  })
})
