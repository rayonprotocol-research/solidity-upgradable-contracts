pragma solidity ^0.4.21;

import "./ScoreInterface.sol";

contract ScoreV2 is ScoreInterface {
    mapping (address => uint) scoreMap;

    function hit() public {
        scoreMap[msg.sender] = scoreMap[msg.sender] + 20;
    }

    function score() public view returns (uint) {
        return scoreMap[msg.sender];
    }
}