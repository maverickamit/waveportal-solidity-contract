pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract MyProjectContract {
    uint totalWaves;
    constructor(){
        console.log("Hello World.");
    }
    function wave() public{
        totalWaves +=1;
        console.log("Just Waved. totalWaves = %s", totalWaves);
    }
}