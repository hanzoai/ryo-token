pragma solidity ^0.4.4;

import "./Administratable.sol";

contract Upgradeable is Administratable {
    event Upgrade(address indexed predecessor, address indexed successor,
                  string methods);

    address public currentVersion;
    address public predecessor;

    constructor() { }
    // Update current version and store method configurations
    function setVersion(address successor, string methods) public onlyAdmins {
        predecessor = currentVersion;
        currentVersion = successor;
        emit Upgrade(predecessor, successor, methods);
    }

    function () payable {
        // Require successfull delegate call
        require(currentVersion.delegatecall(msg.data));
        assembly {
            let outsize := returndatasize
            let outptr := mload(0x40) // Load memory
            mstore(0x40, add(outptr, outsize)) // Load up to return size
            returndatacopy(outptr, 0, outsize) // Copy last return into pointer
            return(outptr, outsize)
        }
    }
}
