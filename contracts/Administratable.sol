pragma solidity 0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";


contract Administratable is Ownable {
    using SafeMath for uint256;

    address[] public adminsForIndex;
    mapping (address => bool) public admins;
    mapping (address => bool) private processedAdmin;

    event AdminAdded(address indexed admin);
    event AdminRemoved(address indexed admin);

    modifier onlyAdmins {
        if (msg.sender != owner && !admins[msg.sender]) revert();
        return _;
    }

    modifier onlyOwner {
        if (msg.sender != owner) revert();
        return _;
    }

    function totalAdminsMapping() public view returns (uint256) {
        return adminsForIndex.length;
    }

    function addAdmin(address admin) public onlyOwner {
        require(admin != address(0));
        admins[admin] = true;
        if (!processedAdmin[admin]) {
            adminsForIndex.push(admin);
            processedAdmin[admin] = true;
        }

        emit AdminAdded(admin);
    }

    function removeAdmin(address admin) public onlyOwner {
        require(admin != address(0));
        admins[admin] = false;

        emit AdminRemoved(admin);
    }
}
