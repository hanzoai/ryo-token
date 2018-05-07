let Master  = artifacts.require('./test/Master.sol')
let Library = artifacts.require('./test/Library.sol')


contract('Ryo', async () => {
  let master, library, proxy = null

  // Setup master, library, proxy
  before(async () => {
    master = await Master.deployed()
    library = await Library.deployed()
    await master.setVersion(library.address)
    proxy = await Library.at(master.address)
  })

  it('should set version', async () => {
    let v = await master.currentVersion.call()
    assert(v === library.address, 'incorrect version of library contract returned')
  })

  it('should return static string from proxied method', async () => {
    let v = await proxy.staticString.call()
    assert.equal(v, 'bar', 'staticString() did not return expected string')
  })

  it('should return static address proxied method', async () => {
    let v = await proxy.staticAddress.call()
    assert(v === '0xdcad3a6d3569df655070ded06cb7a1b2ccd1d3af', 'staticAddress() did not return expected address')
  })

  it('should return static address from proxied method', async () => {
    let v = await proxy.staticNumber.call()
    assert(v.toNumber() === 42, 'staticNumber() did not return expected number')
  })

  it('should return static enum from proxied method', async () => {
    let v = await proxy.staticEnum.call()
    assert(v.toNumber() === 2, 'staticEnum() did not return expected enum')
  })

  it('should return static strings from proxied method', async () => {
    let [one, two] = await proxy.staticStrings.call()
    assert(one === 'foo', 'staticStrings() did not return expected string for first return value')
    assert(two === 'bar', 'staticStrings() did not return expected string for second return value')
  })

  it('should return static addresses from proxied method', async () => {
    let [one, two] = await proxy.staticAddresses.call()
    assert(one === '0xdcad3a6d3569df655070ded06cb7a1b2ccd1d3af', 'staticAddresses() did not return expected address for first return value')
    assert(two === '0x1c68f4f35ac5239650333d291e6ce7f841149937', 'staticAddresses() did not return expected address for second return value')
  })

  it('should return static numbers from proxied method', async () => {
    let [one, two] = await proxy.staticNumbers.call()
    assert(one.toNumber() === 42, 'staticNumbers() did not return expected number for first return value')
    assert(two.toNumber()  === 43, 'staticNumbers() did not return expected number for first return value')
  })

  it('should return mixed values from proxied method', async () => {
    let [num, str] = await proxy.staticMixed.call()
    assert(num.toNumber() === 42, 'staticMixed() did not return expected number for first return value')
    assert(str === 'bar', 'staticMixed() did not return expected string for second return value')
  })
})
