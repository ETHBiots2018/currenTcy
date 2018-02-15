pragma solidity ^0.4.4;

// TODO:
// - Check visibility / privacy: https://solidity.readthedocs.io/en/develop/contracts.html#visibility-and-getters
// - Security concerns like race conditions, etc.: https://solidity.readthedocs.io/en/develop/security-considerations.html

contract Token {
  /*
   * Implementation of global variables, as well as mapping
   */

  // Ledger
  mapping(address => int256) public balanceOf;

  // Map consuming smart meters to their owners
  mapping(address => address) public userOfConsumingSmartMeter;

  // map a boolean true, if a smartmeter is registered
  mapping(address => bool) registered;

  // owner
  address owner;

  // set owner
  function Token() public {
    owner = msg.sender;
  }

  struct PowerPlant {
    mapping(address => uint256) percentages;
    address[] users;
  }

  // maps smartmeter to a powerplant with different users which own percentages of it
  mapping(address => PowerPlant) powerplants;

  // For functions which can only be performed by the owner
  modifier ownerOnly {
    require(msg.sender == owner);
    _;
  }

  // For functions which can only be performed by smartmeters
  modifier smartMeterOnly {
    require(registered[msg.sender] == true);
    _;
  }


/* 
 * Functions which are only allowed to be executed by the owner (EWZ).
 * These functions include: setting and getting a smartmeter to a user,
 * as well as registering and unregistering smartmeters, for the smartMeterOnly modifier
 */

  // set owner of consuming smart meter
  function setUser (address _smartMeter, address _user) public ownerOnly {
    userOfConsumingSmartMeter[_smartMeter] = _user;
  }

  // get owner of consuming smart meter
  function getUser (address _smartMeter) public view ownerOnly returns (address) {
    return userOfConsumingSmartMeter[_smartMeter];
  }

  // register smartmeter
  function regSmartMeter (address _smartMeter) public ownerOnly {
    registered[_smartMeter] = true;
  }

  // unregister smart meter (consuming or producing)
  function unregSmartMeter(address _smartMeter) public ownerOnly {
    registered[_smartMeter] = false; 
  }

  // Adding a new powerplants
  function addPowerPlant(address _smartMeter) public ownerOnly {
    require(registered[_smartMeter] == true);
    PowerPlant memory plant;
    powerplants[_smartMeter] = plant;
  }

  // Adding new users to an existing powerplant
  function addPowerPlantUser(address _smartMeter, address _user, uint256 _percentage) public ownerOnly {
    require(registered[_smartMeter] == true);
    powerplants[_smartMeter].percentages[_user] = _percentage;
    powerplants[_smartMeter].users.push(_user);
  }

  //removing users from an existing powerplant
  function removePowerPlantUser(address _smartMeter, address _user) public ownerOnly {
    require(registered[_smartMeter] == true);
    powerplants[_smartMeter].percentages[_user] = 0;
    for (uint256 i = 0; i < powerplants[_smartMeter].users.length; i++) {
      if (powerplants[_smartMeter].users[i] == _user) {
        delete powerplants[_smartMeter].users[i];
      }
    }
  }


  /*
   * The following functions are only for the smartmeters
   * they are for production and consumption of electricity,
   * and the token balance management of each user
   */

  // Credit the User tokens for Wh produced
  function produce (uint256 wh) public smartMeterOnly {
    var plant = powerplants[msg.sender];
    for (uint256 i = 0; i < plant.users.length; i++) {
      // for each user associated with the plant, increment balance
      var currentUser = plant.users[i];
      balanceOf[currentUser] += whToToken(wh) * int256(plant.percentages[currentUser]) / 100;
    }
  }

  // Deduction of tokens for Wh consumed
  function consume (uint256 wh) public smartMeterOnly {
    balanceOf[userOfConsumingSmartMeter[msg.sender]] -= whToToken(wh);
  }


  /*
   * Following functions are only mathematical functions for the token <-> wh conversion
   */

    // Wh -> Token conversion
  function whToToken (uint256 wh) public pure returns (int256) {
    // As of right now, this performs a 1:1 conversion of Wh to tokens
    // May be adapted in future implementations
    return int256(wh);
  }

  // Token -> Wh conversion
  function tokenToWh (int256 token) public pure returns (uint256) {
    // As of right now, this performs a 1:1 conversion of Wh to tokens
    // May be adapted in future implementations
    return uint256(token);
  }
}
