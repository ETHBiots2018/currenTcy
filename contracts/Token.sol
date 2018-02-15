pragma solidity ^0.4.4;

// TODO:
// - Multiple users per smart meter
// - Implementation of smartMeterOnly modifier
// - Check visibility / privacy: https://solidity.readthedocs.io/en/develop/contracts.html#visibility-and-getters
// - Security concerns like race conditions, etc.: https://solidity.readthedocs.io/en/develop/security-considerations.html

contract Token {
  /*
   * Implementation of global variables, as well as mapping
   */

  // Ledger
  mapping(address => uint256) public balanceOf;

  // Map smart meters to their owners
  // TODO: This needs to be a mapping of sort (address => array(address)) so that a smart meter can be owned by multiple users
  mapping(address => address) public user;

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
  mapping(address => PowerPlant) powerplants; // maps smartmeter to a powerplant with diffrent users which own percentages of it

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

  // set smartmeter user(s)
  function setUser (address _smartMeter, address _user) public ownerOnly {
    user[_smartMeter] = _user;
  }

  // get smartmeter user(s)
  function getUser (address _smartMeter) public view ownerOnly returns (address) {
    return user[_smartMeter];
  }

  // register smartmeter
  function regSmartMeter (address _smartMeter) public ownerOnly {
    registered[_smartMeter] = true;
  }

  // unregister smartmeter
  function unregSmartMeter(address _smartMeter) public ownerOnly {
   registered[_smartMeter] = false; 
  }

  // Adding a new powerplant
  function addPowerPlant(address _smartMeter) public ownerOnly {
    PowerPlant memory plant;
    powerplants[_smartMeter] = plant;
  }

  // Adding new users to an existing powerplant
  function addPowerPlantUser(address _smartMeter, address _user, uint256 _percentage) public ownerOnly {
    powerplants[_smartMeter].percentages[_user] = _percentage;
    powerplants[_smartMeter].users.push(_user);
  }

  //removing users from an existing powerplant
  function removePowerPlantUser(address _smartMeter, address _user) public ownerOnly {
    delete powerplants[_smartMeter].percentages[_user];
    for (uint256 i = 0; i < powerplants[_smartMeter].users.length; i++) {
      if (powerplants[_smartMeter].users[i] == _user) {
        delete powerplants[_smartMeter].users[i];
      }
    }
  }

  //transfer pertentages between existing powerplant users
  function tranferUserPercentage(address _smartMeter, address _from, address _to, uint256 _percentageTo) public ownerOnly {
    var plant = powerplants[_smartMeter];
    plant.percentages[_from] -= _percentageTo;
    plant.percentages[_to] += _percentageTo;
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
      var temp = plant.users[i];
      balanceOf[user[temp]] += whToToken(wh) * 100 / plant.percentages[temp];
    }
  }

  // Deduction of tokens for Wh consumed
  function consume (uint256 wh) public smartMeterOnly returns (uint256) {
    uint256 consumed = 0;
    if (balanceOf[user[msg.sender]] >= whToToken(wh)) {
      // Sufficient balance to cover entire transaction
      consumed = wh;
      balanceOf[user[msg.sender]] -= whToToken(wh);
    } else {
      // Insufficient balance, use up remaining balance
      consumed = balanceOf[user[msg.sender]];
      balanceOf[user[msg.sender]] = 0;
    }
    return consumed;
  }


  /*
   * Following functions are only mathematical functions for the token <-> wh conversion
   */

    // Wh -> Token conversion
  function whToToken (uint256 wh) public pure returns (uint256) {
    // As of right now, this performs a 1:1 conversion of Wh to tokens
    // May be adapted in future implementations
    return wh;
  }

  // Token -> Wh conversion
  function tokenToWh (uint256 token) public pure returns (uint256) {
    // As of right now, this performs a 1:1 conversion of Wh to tokens
    // May be adapted in future implementations
    return token;
  }

}
