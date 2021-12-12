// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyProjectContract {
    uint totalWaves;    

    uint256 private seed;

    event NewWave(address indexed from, uint256 timestamp, string message);

    struct Wave {
        address waver; //Address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The time when the user waved. 
    }
    
    Wave[] waves; // A variable that stores an array of structs.

    mapping(address => uint256) public lastWavedAt;

    constructor () payable {
        console.log("Hello World.");
         //Generating an initial random number
        seed = (block.timestamp + block.difficulty) % 100;
    }
    //POST
    function wave(string memory _message) public {
        console.log("Last waved at : %d",lastWavedAt[msg.sender]);
        
        require(lastWavedAt[msg.sender] + 15 minutes <= block.timestamp,"wait 15 min");
        
        lastWavedAt[msg.sender]=block.timestamp;

        totalWaves +=1;
        waves.push(Wave(msg.sender, _message, block.timestamp));
        emit NewWave(msg.sender, block.timestamp, _message);

        //Generating a new random number
         seed = (block.difficulty + block.timestamp + seed) % 100;

        console.log("Random # generated: %d", seed);
        // 50% chance of win
        if(seed<=50){
            console.log("%s won!", msg.sender);
            
            uint256 appreciationMoney = 0.00001 ether;

            require(appreciationMoney <= address(this).balance, "Trying to withdraw more money than the contract has.");
            (bool success, ) = (msg.sender).call{value: appreciationMoney}("");
            require(success, "Failed to withdraw money from contract.");
        }

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

