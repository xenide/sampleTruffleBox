pragma solidity ^0.6.0;

import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable {
    
    enum SupplyChainState { Created, Paid, Delivered }
    
    struct S_Item {
        Item _item;
        string _identifier;
        uint _itemPrice;
        SupplyChainState _state;
    }
    
    mapping (uint => S_Item) public items; 
    uint itemIndex;
    
    event SupplyChainEvent(uint itemIndex, SupplyChainState newState, address _itemAddress);
    
    function createItem(string memory _identifier, uint _itemPrice) public onlyOwner {
        Item item = new Item(this, _itemPrice, itemIndex);
        
        items[itemIndex] = S_Item(item, _identifier, _itemPrice, SupplyChainState.Created);
        
        emit SupplyChainEvent(itemIndex, SupplyChainState.Created, address(item));
        itemIndex++;
    }
    
    function triggerPayment (uint _index) public payable {
        
        
        require(msg.value == items[_index]._itemPrice, "Only exact payment accepted!");
        require(SupplyChainState.Created == items[_index]._state, "Only applicable for unpaid items!");
        
        items[_index]._state = SupplyChainState.Paid;
        
        emit SupplyChainEvent(_index, SupplyChainState.Paid, address(items[_index]._item)); 
    }
    
    function triggerDelivery(uint _index) public onlyOwner{
        require(SupplyChainState.Paid == items[_index]._state, "Only applicable for paid items!");
        items[_index]._state = SupplyChainState.Delivered;

        emit SupplyChainEvent(_index, SupplyChainState.Delivered,address(items[_index]._item));
    }
}