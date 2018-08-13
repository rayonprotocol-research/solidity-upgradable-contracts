pragma solidity ^0.4.21;

contract ScoreStore {
    mapping (address => uint) scoreMap;

    function put(address _key, uint _value) public {
        scoreMap[_key] = _value;
    }

    function get(address _key) public view returns (uint) {
        return scoreMap[_key];
    }
}