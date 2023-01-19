// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Lottery {
    // Users
    uint256 private _totalUsers;
    mapping(uint256 => address) private _users;
    mapping(address => bool) private _participants;

    uint256 private _amount;

    constructor() {
        _totalUsers = 0;
        _amount = 0;
    }

    function userExists() private view returns(bool exists) {
        for (uint i = 0; i < _totalUsers; i++) {
            if (_users[i] == msg.sender) {
                return false;
            }
        }
        return true;
    }

    function register() public returns(bool success) {
        if (!userExists())
            return false;
        _users[_totalUsers] = msg.sender;
        _totalUsers += 1;
        return true;
    }

    function participate() public returns(bool success) {
        if (!userExists())
            return false;
        _participants[msg.sender] = true;
    }

    function resetParticipants() private {
        for (uint i = 0; i < _totalUsers; i++) {
            address tmpAddress = _users[i];
            _participants[tmpAddress] = false;
        }
    }

    function giveAway() public {
        // random give away
    }
}
