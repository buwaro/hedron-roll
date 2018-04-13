const Dice = require(__addondirHedronRoll + "/models/Dice")
const diceRegex = /(.*)d(.*)/i
const checkSpecialCharactersRegex = /№|&|±|¿|¡|;|Π|π|Ω/i

class DiceCollection {

    constructor() {
        this.dices = []
        this.maxDice = 100
        this.maxSides = 100
    }

    addDices(diceStrings) {
        for (var diceString of diceStrings) {
            if (checkSpecialCharactersRegex.test(diceString)) {
                throw("U wot m8?!")
            }
            else if (diceRegex.test(diceString)) {
                var [amount, type] = diceRegex.exec(diceString).slice(1,3)

                if (isNaN(amount) && isNaN(type)){
                    throw("Can't roll a " + diceString + ",\nPlease try something like: 1d6")
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
            }
            else {
                throw("Can't roll a " + diceString + ",\nPlease try something like: 1d6")
            }

            var dice = new Dice(type)
            this.addDice(amount, dice)
        }

        if (this.totalAmount() > this.maxDice) {
            throw("Can't roll more than " + this.maxDice + " dice")
        }
    }

    addDice(amount, dice) {
        this.dices.push([dice, amount])
    }

    rollDices() {
        var result = []

        for(var [dice, amount] of this.dices) {

            var i;
            for (i = 0; i < amount; i++) {
                result.push(dice.roll())
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
}

module.exports = DiceCollection;
