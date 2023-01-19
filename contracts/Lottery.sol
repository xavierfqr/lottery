// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Lottery {
    uint _maxParticipants;
    address[] _participants;
    uint256 private _amount;

    constructor() {
        _amount = 0;
        _maxParticipants = 10;
    }

    function userExists() private view returns(bool success) {
        for (uint i = 0; i < _participants.length; i++) {
            if (_participants[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function participate() public {
        require(!userExists());
        require(_participants.length < 10);
        _participants.push(msg.sender);
    }

    function resetParticipants() private {
        while (_participants.length > 0) {
            _participants.pop();
        }
    }

    function giveAway() public {
        // random give away
        resetParticipants();
    }
}
