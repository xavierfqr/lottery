// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Lottery {
    uint maxParticipants;
    uint256 amount;
    address[] participants;

    constructor() {
        amount = 1 * 10 ** 18;
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

    function participate() external payable {
        require(!userExists());
        require(participants.length < 10);
        require(msg.value >= amount);
        participants.push(msg.sender);
    }

    function resetParticipants() private {
        delete participants;
    }

    function randomWinner() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants))) % participants.length;
    }

    function giveAway() external returns(address) {
        address winner = participants[randomWinner()];
        // Send amount to winner address
        // msg.sender.transfer
        resetParticipants();
        return winner;
    }
}
