pragma solidity ^0.4.21;

contract ScoreInterface {
    function setStoreContract(address _storeAddress) public;
    function hit() public;
    function score() public view returns (uint);
    function recliamStoreOwnership() public;
}