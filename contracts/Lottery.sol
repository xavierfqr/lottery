// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Lottery {
    uint maxParticipants;
    uint256 amount;
    address[] public participants;
    address public lastWinner;

    constructor() {
        amount = 1 * 10 ** 16;
        maxParticipants = 2;
    }

    function userExists() private view returns(bool success) {
        for (uint i = 0; i < participants.length; i++) {
            if (participants[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function randomWinner() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants))) % participants.length;
    }

    function giveAway() private {
        address payable winner = payable(participants[randomWinner()]);
        winner.call{ value: address(this).balance };
        lastWinner = winner;
        delete participants;
    }

    function participate() external payable {
        require(!userExists());
        require(participants.length < maxParticipants);
        require(msg.value >= amount);
        participants.push(msg.sender);
        if (participants.length == maxParticipants) {
            giveAway();
        }
    }
}
