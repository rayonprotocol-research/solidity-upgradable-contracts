pragma solidity ^0.4.21;

contract Ownable {
    address public owner;
    constructor() public {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function transferOwnership(address _newOwner) public onlyOwner {
        require(_newOwner != address(0));
        owner = _newOwner;
    }
}

contract ScoreStore is Ownable {
    mapping (address => uint) scoreMap;

    function put(address _key, uint _value) public onlyOwner {
        scoreMap[_key] = _value;
    }

    function get(address _key) public view onlyOwner returns (uint) {
        return scoreMap[_key];
    }
}