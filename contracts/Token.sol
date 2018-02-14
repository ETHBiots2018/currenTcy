pragma solidity ^0.4.4;

contract Token {
//Contract Variables
  //Mapping
  mapping(address => uint256) public balanceOf;
  //Who's powerplant is it?
  mapping(address => address) public user;
   //Adress
  address public owner = msg.sender;

//Functions
  //Wh -> Token Convertion
  function whToToken (uint256 wh) returns (uint256) {
    //TODO:  Algorithm for conversion
    uint256 token = wh; 
    return token;
  }

  //Token -> Wh
  function tokenToWh (uint256 token) returns (uint256) {
    uint256 wh = token;
    return wh;
  }

  //Credit the User tokens for Wh produced
  function produce (uint256 wh) public{
    balanceOf[user[msg.sender]] += whToToken(wh);
  }

  //Deduction of tokens for Wh consumed
  function consume (uint256 wh) public returns(uint256) {
    uint256 consumed = 0;
    if(balanceOf[user[msg.sender]] >= whToToken(wh)){
      consumed = wh;
      balanceOf[user[msg.sender]] -= whToToken(wh);
    }
    else {
      consumed = balanceOf[user[msg.sender]];
      balanceOf[user[msg.sender]] = 0;
    }
    return consumed;
  }

  string m = "bitch yes!";
  //Test Function
  function greeting() returns (string){
    return m;
  }
}
