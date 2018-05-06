let Master  = artifacts.require('TestMaster')
let Library = artifacts.require('TestLibrary')

contract('Upgradeable', async () => {
  // Setup master/library contracts
  let master = await Master.deployed()
  let library = await Library.deployed()
  await master.setVersion(library.address)

  it('should upgrade version correctly', async () => {
    let version = await master.currentVersion.call()
    assert(version === library.address, 'Version is set to latest')
  })

  it('should allow proxied methods', async () => {
    let proxy = await Library.at(master.address)
    let staticString = await proxy.staticString.call()
    assert(staticString === 'bar', 'Unable to call staticString on upgradable contract')
    let staticAddress = await proxy.staticAddress.call()
    assert(staticAddress === '0xdcad3a6d3569df655070ded06cb7a1b2ccd1d3af', 'Unable to call staticAddress on upgradable contract')
    let staticNumber = await proxy.staticNumber.call()
    assert(staticNumber.toNumber() === 420, 'Unable to call staticNumber on upgradable contract')
    let staticChoice = await proxy.staticChoice.call()
    assert(staticChoice.toNumber() === 2, 'Unable to call staticChoice on upgradable contract')
    let staticTwoStrings = await proxy.staticTwoStrings.call()
    assert(staticTwoStrings[0] === 'foo', 'Failed to receive first element on staticTwoStrings on upgradable contract')
    assert(staticTwoStrings[1] === 'bar', 'Failed to receive second element on staticTwoStrings on upgradable contract')
    let staticTwoAddresses = await proxy.staticTwoAddresses.call()
    assert(staticTwoAddresses[0] === '0xdcad3a6d3569df655070ded06cb7a1b2ccd1d3af', 'Failed to receive first element on staticTwoAddresses on upgradable contract')
    assert(staticTwoAddresses[1] === '0x1c68f4f35ac5239650333d291e6ce7f841149937', 'Failed to receive second element on staticTwoAddresses on upgradable contract')
    let staticTwoNumbers = await proxy.staticTwoNumbers.call()
    assert(staticTwoNumbers[0].toNumber() === 420, 'Failed to receive first element on staticTwoNumbers on upgradable contract')
    assert(staticTwoNumbers[1].toNumber()  === 404, 'Failed to receive second element on staticTwoNumbers on upgradable contract')
    let staticMixed = await proxy.staticMixed.call()
    assert(staticMixed[0].toNumber() === 420, 'Failed to receive first element on staticMixed on upgradable contract')
    assert(staticMixed[1]  === 'bar', 'Failed to receive second element on staticMixed on upgradable contract')
  })
})
