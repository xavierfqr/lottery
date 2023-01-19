// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Lottery {
    uint maxParticipants;
    uint256 amount;
    address payable[] public participants;

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
        participants.push(payable(msg.sender));
    }

    function resetParticipants() private {
        delete participants;
    }

    function randomWinner() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants))) % participants.length;
    }

    function giveAway() external returns(address) {
        address payable winner = participants[randomWinner()];
        winner.call{ value: address(this).balance };
        resetParticipants();
        return winner;
    }
}
