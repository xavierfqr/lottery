// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

// import "hardhat/console.sol";

contract Lottery {
    uint maxParticipants;
    uint256 amount;
    address[] public participants;
    address public lastWinner;
    uint256 public test;

    constructor() {
        amount = 1 * 10 ** 16;
        maxParticipants = 2;
        test = 42;
    }

    function getParticipantsCount() public view returns(uint) {
        return participants.length;
    }

    function userExists() private view returns(bool success) {
        for (uint i = 0; i < getParticipantsCount(); i++) {
            if (participants[i] == msg.sender) {
                return true;
            }
        }
        return false;
    }

    function randomWinner() private view returns(uint) {
        return uint(keccak256(abi.encodePacked(block.difficulty, block.timestamp, participants))) % getParticipantsCount();
    }

    function giveAway() private {
        address payable winner = payable(participants[randomWinner()]);
        (bool success, ) = winner.call{ value: address(this).balance }("");
        require(success);
        lastWinner = winner;
        delete participants;
    }

    function participate() external payable {
        require(!userExists(), "User exists");
        require(msg.value >= amount, "Not enough funds");
        participants.push(msg.sender);
        if (getParticipantsCount() == maxParticipants) {
            giveAway();
        }
    }
}
