// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyProjectContract {
    uint totalWaves;    
    
    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; //Address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The time when the user waved. 
    }
    
    Wave[] waves; // A variable that stores an array of structs.

    constructor(){
        console.log("Hello World.");
    }
    //POST
    function wave(string memory _message) public {
        totalWaves +=1;
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);
    }
    //GET
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;        
    }

    //GET
    function getTotalWaves() public view returns (uint) {
        return totalWaves;        
    }
}

