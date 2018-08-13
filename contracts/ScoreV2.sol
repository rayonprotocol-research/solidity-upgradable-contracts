pragma solidity ^0.4.21;

contract ScoreV2 {
    mapping (address => uint) scoreMap;

    function hit() public {
        scoreMap[msg.sender] = scoreMap[msg.sender] + 20;
    }

    function score() public view returns (uint) {
        return scoreMap[msg.sender];
    }
}