pragma solidity 0.4.23;

import "./Owned.sol";
import "./Proxy.sol";


contract Versioned is Owned, Proxy {
    event Upgrade(address indexed predecessor, address indexed successor);

    // Update current version and store method configurations
    function setVersion(address successor) public onlyOwner {
        address predecessor = delegate;
        delegate = successor;
        emit Upgrade(predecessor, successor);
    }
}
