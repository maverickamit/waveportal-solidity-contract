// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyProjectContract {
    uint totalWaves;
    constructor(){
        console.log("Hello World.");
    }
    //POST
    function wave() public{
        totalWaves +=1;
        console.log("Just Waved. totalWaves = %s", totalWaves);
    }
    //GET
    function getTotalWaves() public view returns (uint) {
        return totalWaves;        
    }
}

