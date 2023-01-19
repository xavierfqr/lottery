// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Lottery {
    uint maxParticipants;
    uint256 amount;
    address[] participants;

    constructor() {
        amount = 0;
        maxParticipants = 10;
    }

    function userExists() private view returns(bool success) {
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function participate() public {
        require(!userExists());
        require(participants.length < 10);
        participants.push(msg.sender);
    }

    function resetParticipants() private {
        delete(participants);
    }

    function giveAway() public {
        // random give away
        resetParticipants();
    }
}
