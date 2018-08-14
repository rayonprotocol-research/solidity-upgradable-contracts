pragma solidity ^0.4.21;

import "./ScoreInterface.sol";
import "./ScoreStore.sol";

contract ScoreV2 is ScoreInterface, Ownable {
    ScoreStore store;

    function setStoreContract(address _storeAddress) public {
        require(_storeAddress != address(0));
        store = ScoreStore(_storeAddress);
    }

    function hit() public {
        store.put(msg.sender, store.get(msg.sender) + 20);
    }

    function score() public view returns (uint) {
        return store.get(msg.sender);
    }

    function recliamStoreOwnership() public onlyOwner {
        store.transferOwnership(owner);
    }
}