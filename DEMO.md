# Demo Time

## Addresses
* ewz / owner: `0x627306090abab3a6e1400e9345bc60c78a8bef57`
* Smart Meter 1: `0xf17f52151EbEF6C7334FAD080c5704D77216b732`
* User 1A: `0xC5fdf4076b8F3A5357c5E395ab970B5B54098Fef`
* User 1B: `0x821aEa9a577a9b44299B9c15c88cf3087F3b5544`

## Program
1. ewz ...
  1. ... registers Smart Meter 1, thus marking it as trusted
  2. ... assigns Smart Meter 1 to User 1A. Anything that is consumed via Smart Meter 1
         will now be charged to User 1A's account.
  3. ... creates a new power plant
  4. ... adds User 1A and User 1B to the power plant with shares of 30 and 70 percent respectively.
2. Smart Meter 1 now __generates 2kWh of energy__
3. User 1A's balance thus rises to 600 Wh
4. User 2A's balance even rises to 1400 Wh
5. Smart Meter 1 now __consumes 1kWh of energy__
6. User 1A's balance drops to - 400 Wh
