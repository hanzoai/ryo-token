pragma solidity 0.4.23;


contract TestLibrary {
    address constant private TEST_ADDRESS = 0xdCad3a6d3569DF655070DEd06cb7A1b2Ccd1D3AF;
    address constant private ANOTHER_ADDRESS = 0x1C68f4f35AC5239650333D291E6ce7f841149937;
    enum Choices {UpHigh, DownLow, TooSlow}

    function staticString() public pure returns (string) {
        return "bar";
    }

    // Fun note. This will return outside of the blockchain with all the
    // characters in the address lowercased. The difference is harmless, as
    // case sensitivity isn't a thing for addresses, but .toLower() is implicit
    // here.
    function staticAddress() public pure returns (address) {
        return TEST_ADDRESS;
    }

    // In Javascript, this ends up becoming a BigNumber object to deal with all
    // of the potential numeric returns from the blockchain. Check this stack
    // exchange question for more info:
    // https://ethereum.stackexchange.com/questions/7656/what-are-c-e-and-s-properties-in-message-call-return-object
    function staticNumber() public pure returns (uint) {
        return 420;
    }

    // Since enum types are not part of the ABI, the signature of "getChoice"
    // will automatically be changed to "staticChoice() returns (uint8)"
    // for all matters external to Solidity. The integer type used is just
    // large enough to hold all enum values, i.e. if you have more values,
    // `uint16` will be used and so on. The indexing starts from 0.
    // As a corrolary, because they're returned as numbers, in Javascript they
    // also become BigNumber objects as well. See the stack exchange link
    // above.
    function staticChoice() public pure returns (Choices) {
        return Choices.TooSlow;
    }

    // This will only work when invoked off the blockchain.
    // Contract-to-contract, only static length types are accepted.
    function staticTwoStrings() public pure returns (string, string) {
        return ("foo", "bar");
    }

    function staticTwoAddresses() public pure returns (address, address) {
        return (TEST_ADDRESS, ANOTHER_ADDRESS);
    }

    function staticTwoNumbers() public pure returns (uint, uint) {
        return (420, 404);
    }

    function staticMixed() public pure returns (uint, string) {
        return (420, "bar");
    }

    // Compiler complains that this method signature "doesn't exist or not
    // unique". So - returning two enums from a function isn't possible right
    // now. Go figure.
    // function staticTwoChoices() public pure returns (Choice, Choice) {
    //     return (Choices.UpHigh, Choices.DownLow);
    // }
}
