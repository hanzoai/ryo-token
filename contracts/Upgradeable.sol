pragma solidity ^0.4.4;

import "./Administratable.sol";

contract Upgradeable is Administratable {
    struct Method { address destination; uint outsize; }
    event Upgrade(address indexed predecessor, address indexed successor,
                  string methods);

    address public currentVersion;
    address public predecessor;
    mapping (bytes4 => Method) private currentMethods;

    constructor() { }
    // Update current version and store method configurations
    function setVersion(address successor, string methods) public onlyAdmins {
        predecessor = currentVersion;
        currentVersion = successor;
        //currentMethods = methods;
        emit Upgrade(predecessor, successor, methods);
    }

    function () payable {
        uint r;

        // Get routing information for the called method. Throw if it's not a
        // configured method, or do transfer or whatever sensibly
        address destination = currentMethods[msg.sig].destination;
        uint outsize = currentMethods[msg.sig].outsize;

        // Call contract in current context
        assembly {
            calldatacopy(mload(0x40), 0, calldatasize)
            r := delegatecall(sub(gas, 700), destination, mload(0x40),
                              calldatasize, mload(0x40), outsize)
        }

        // Throw if the call failed
        if (r != 1) { revert(); }

        // Pass on return value
        assembly {
            return(mload(0x40), outsize)
        }
    }

}
