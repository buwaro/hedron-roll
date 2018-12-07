const Dice = require(__addondirHedronRoll + "/models/Dice");
const diceRegex = /(.*)d(.*)/i;
const targetNumberRegex = /tn(\d*)/i;
const checkSpecialCharactersRegex = /№|&|±|¿|¡|;|Π|π|Ω/i;

class DiceCollection {

  constructor() {
    this.dices = [];
    this.maxDice = 1000;
    this.maxSides = 100;
    this.sum = 0;
    this.targetNumbers = [];
  }

  parseParams(params) {
    for ( var param of params) {
      if (checkSpecialCharactersRegex.test(param)) {
        throw("U wot m8?!");
      }
      else if (this._isTargetNumber(param)) {
        this.addTargetNumber(param);
      }
      else if (this._isDice(param)) {
        this.addDiceFromString(param);
      }
      else {
        throw("Can't roll a " + param + ",\nPlease try something like: 1d6");
      }
    }
  }

  addTargetNumber(targetNumberString) {
    var [targetNumber] = targetNumberRegex.exec(diceString).slice(1,2)
    this.targetNumbers.push(targetNumber)
  }

  addDiceFromString(param) {
    var [amount, type] = diceRegex.exec(param).slice(1,3)

    if (isNaN(amount) && isNaN(type)){
      throw("Can't roll a " + param + ",\nPlease try something like: 1d6")
    }

    if (isNaN(amount)) {
      throw("The amount of dice is not a number")
    }
    else if (amount.length == 0) {
      amount = 1
    }
    else if (amount <= 0) {
      throw("The amount of dice has to be higher than 0")
    }
    else if (amount % 1 != 0) {
      throw("the amount of dice can't be a decimal number")
    }

    if (isNaN(type)) {
      throw("The amount of sides is not a number")
    }
    else if (type <= 1) {
      throw("Can't roll a dice with less than 2 sides")
    }
    else if (type > this.maxSides) {
      throw("Can't roll a dice with more than " + this.maxSides + " sides")
    }
    else if (type % 1 != 0) {
      throw("the amount of sides can't be a decimal number")
    }

    var dice = new Dice(type)
    this.dices.push([dice, amount]);

    if (this.totalAmount() > this.maxDice) {
      throw("Can't roll more than " + this.maxDice + " dice")
    }
  }

    rollDices() {
      var result = []
      for(var [dice, amount] of this.dices) {

        var i;
        for (i = 0; i < amount; i++) {
          var diceResult = dice.roll();
          this.sum += diceResult;
          result.push(diceResult);
        }
      }
      return result
    }

    totalAmount() {
        var result = 0
        for(var [dice, amount] of this.dices) {
            result += parseInt(amount)
        }

        return result
    }

    result(){
      var result = this.rollDices().join(", ");
      if(this.totalAmount() > 1) {
        result += `\n\nTotal:${this.sum}`;
      }
      return result;
    }

  _isTargetNumber(param) { return targetNumberRegex.test(param) }

  _isDice(param) { return diceRegex.test(param) }

}

module.exports = DiceCollection;
