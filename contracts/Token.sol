pragma solidity ^0.4.4;

contract Token {
//Contract Variables
  //Mapping
  mapping(address => uint256) public balanceOf;
  //Who's powerplant is it?
  mapping(address => address) user;
   //Adress
  address public owner = msg.sender;

  //Modifier for owner only
  modifier ownerOnly{
    require(msg.sender == owner);
    _;
  }

//Set and get the user to a smartmeter
  //set User(s) to smartmeter
  function setUser (address _smartMeter, address _user) public ownerOnly {
    user[_smartMeter] = _user;
  }

  //ger User(s) from smartmeters
  function getUser (address _smartMeter) public ownerOnly returns(address) {
    return user[_smartMeter];
  }

//Functions
  //Wh -> Token Convertion
  function whToToken (uint256 _wh) returns (uint256) {
    //TODO:  Algorithm for conversion
    uint256 token = _wh; 
    return token;
  }

  //Token -> Wh
  function tokenToWh (uint256 _token) returns (uint256) {
    uint256 wh = _token;
    return wh;
  }

  //Credit the User tokens for Wh produced
  function produce (uint256 _wh) public returns (uint256){
    balanceOf[user[msg.sender]] += whToToken(_wh);
    return _wh;
  }

  //Deduction of tokens for Wh consumed
  function consume (uint256 _wh) public returns(uint256) {
    uint256 consumed = 0;
    if(balanceOf[user[msg.sender]] >= whToToken(_wh)){
      consumed = _wh;
      balanceOf[user[msg.sender]] -= whToToken(_wh);
    }
    else {
      consumed = balanceOf[user[msg.sender]];
      balanceOf[user[msg.sender]] = 0;
    }
    return consumed;
  }
}
