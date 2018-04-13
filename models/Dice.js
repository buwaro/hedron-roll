class Dice {
    constructor(type) {
        this.type = type
    }

    roll() {
        return Math.floor(Math.random() * this.type) + 1
    }
}

module.exports = Dice;
