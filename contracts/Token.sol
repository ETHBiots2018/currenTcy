pragma solidity ^0.4.4;

contract Token {
  /*
   * Modifiers
   */

  // For functions which can only be performed by the owner
  modifier ownerOnly {
    require(msg.sender == owner);
    _;
  }

  // For functions which can only be performed by smart meters
  modifier smartMeterOnly {
    require(registered[msg.sender] == true);
    _;
  }


  /*
   * State variables
   */

  // Ledger
  mapping(address => int256) public balanceOf;

  // Map consuming smart meters to their owners
  mapping(address => address) public userOfConsumingSmartMeter;

  // Mapping of trusted smart meters
  mapping(address => bool) registered;

  // owner
  address public owner;

  // set owner
  function Token() public {
    owner = msg.sender;
  }

  // represents joint ownership of a power plant
  struct PowerPlant {
    mapping(address => uint256) percentages;
    address[] users;
  }

  // maps producing smart meter to a power plant with different users which own percentages of it
  mapping(address => PowerPlant) powerplants;


  /* 
  * Functions which are only allowed to be executed by the owner (EWZ).
  * These functions include: setting and getting a smart meter to a user,
  * as well as registering and unregistering smart meters, for the smartMeterOnly modifier
  */

  // set owner of consuming smart meter
  function setUser(address _smartMeter, address _user) public ownerOnly {
    // _smartMeter must contain the address of a trusted smart meter
    require(registered[_smartMeter] == true);
    userOfConsumingSmartMeter[_smartMeter] = _user;
  }

  // get owner of consuming smart meter
  function getUser(address _smartMeter) public view ownerOnly returns (address) {
    // _smartMeter must contain the address of a trusted smart meter
    require(registered[_smartMeter] == true);
    return userOfConsumingSmartMeter[_smartMeter];
  }

  // register smart meter
  function regSmartMeter(address _smartMeter) public ownerOnly {
    registered[_smartMeter] = true;
  }

  // unregister smart meter
  function unregSmartMeter(address _smartMeter) public ownerOnly {
    registered[_smartMeter] = false; 
  }

  // add a power plant
  function addPowerPlant(address _smartMeter) public ownerOnly {
    // _smartMeter must contain the address of a trusted smart meter
    require(registered[_smartMeter] == true);
    PowerPlant memory plant;
    powerplants[_smartMeter] = plant;
  }

  // add a user to an existing power plant
  function addPowerPlantUser(address _smartMeter, address _user, uint256 _percentage) public ownerOnly {
    // _smartMeter must contain the address of a trusted smart meter
    require(registered[_smartMeter] == true);
    powerplants[_smartMeter].percentages[_user] = _percentage;
    powerplants[_smartMeter].users.push(_user);
  }

  // remove a user from a power plant
  function removePowerPlantUser(address _smartMeter, address _user) public ownerOnly {
    // _smartMeter must contain the address of a trusted smart meter
    require(registered[_smartMeter] == true);
    powerplants[_smartMeter].percentages[_user] = 0;
    for (uint256 i = 0; i < powerplants[_smartMeter].users.length; i++) {
      if (powerplants[_smartMeter].users[i] == _user) {
        delete powerplants[_smartMeter].users[i];
      }
    }
  }


  /*
   * The following functions are only for the smart meters
   * they are for production and consumption of electricity,
   * and the token balance management of each user
   */

  // credit the User tokens for Wh produced
  function produce(uint256 wh) public smartMeterOnly {
    PowerPlant storage plant = powerplants[msg.sender];
    for (uint256 i = 0; i < plant.users.length; i++) {
      // for each user associated with the plant, increment balance
      address currentUser = plant.users[i];
      balanceOf[currentUser] += whToToken(wh) * int256(plant.percentages[currentUser]) / 100;
    }
  }

  // deduction of tokens for Wh consumed
  function consume(uint256 wh) public smartMeterOnly {
    balanceOf[userOfConsumingSmartMeter[msg.sender]] -= whToToken(wh);
  }


  /*
   * Private functions for the token <-> Wh conversion
   */

  // Wh -> Token conversion
  function whToToken(uint256 wh) private pure returns (int256) {
    // As of right now, this performs a 1:1 conversion of Wh to tokens
    // May be adapted in future implementations
    return int256(wh);
  }

  // Token -> Wh conversion
  function tokenToWh(int256 token) private pure returns (uint256) {
    // As of right now, this performs a 1:1 conversion of Wh to tokens
    // May be adapted in future implementations
    return uint256(token);
  }
}
