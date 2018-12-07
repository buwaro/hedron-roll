const DiceCollection = require(__addondirHedronRoll + "/models/DiceCollection")

test('Throws an error when the given string is not a diceString', function (t) {
    t.plan(1);
    diceString = "blep"
    try {
        const d = new DiceCollection()
        d.parseParams([diceString])
    }
    catch(e){
        t.is(e, "Can't roll a " + diceString + ",\nPlease try something like: 1d6")
    }
})

test('Throws an error when the given string is not a diceString', function (t) {
    t.plan(2);
    diceString = "blep"
    try {
        const d = new DiceCollection()
        d.parseParams([diceString])
    }
    catch(e){
        t.is(e, "Can't roll a " + diceString + ",\nPlease try something like: 1d6")
    }


    diceString = "blepdblep"
    try {
        const d = new DiceCollection()
        d.parseParams([diceString])
    }
    catch(e){
        t.is(e, "Can't roll a " + diceString + ",\nPlease try something like: 1d6")
    }
})

test("Throws an error when the amount of dice is negative", function (t) {
    t.plan(1);
    diceString = "-1d6"
    try {
        const d = new DiceCollection([diceString])
        d.parseParams([diceString])
    }
    catch(e){
        t.is(e, "The amount of dice has to be higher than 0")
    }
})

test("Throws an error when the amount of sides is not a number", function (t) {
    t.plan(1);
    diceString = "1dblep"
    try {
        const d = new DiceCollection([diceString])
        d.parseParams([diceString])
    }
    catch(e){
        t.is(e, "The amount of sides is not a number")
    }
})

test("Throws an error when the amount of dice is not a number", function (t) {
    t.plan(1);
    diceString = "blepd10"
    try {
        const d = new DiceCollection([diceString])
        d.parseParams([diceString])
    }
    catch(e){
        t.is(e, "The amount of dice is not a number")
    }
})

test("Throws an error when the amount of sides is lower than 2", function (t) {
    t.plan(1);
    diceString = "1d1"
    try {
        const d = new DiceCollection([diceString])
        d.parseParams([diceString])
    }
    catch(e){
        t.is(e, "Can't roll a dice with less than 2 sides")
    }
})

test("Throws an error when the maximum amount of dice is exceeded", function (t) {
    t.plan(2);
    const d = new DiceCollection()
    try {
        d.parseParams(["1001d6"])
    }
    catch(e){
        t.is(e, "Can't roll more than " + d.maxDice + " dice")
    }

    const d2 = new DiceCollection()
    try {
        d2.parseParams(["500d6", "501d10"])
    }
    catch(e){
        t.is(e, "Can't roll more than " + d2.maxDice + " dice")
    }
})

test("Throws an error when the maximum amount of sides is exceeded", function (t) {
    t.plan(1);
    const d = new DiceCollection()
    try {
        d.parseParams(["1d101"])
    }
    catch(e){
        t.is(e, "Can't roll a dice with more than " + d.maxSides + " sides")
    }
})

test("Throws an error when the amount of dice is a decimal number", function (t) {
    t.plan(1);
    const d = new DiceCollection()
    try {
        d.parseParams(["1.5d10"])
    }
    catch(e){
        t.is(e, "the amount of dice can't be a decimal number")
    }
})

test("Throws an error when the amount of sides is a decimal number", function (t) {
    t.plan(1);
    const d = new DiceCollection()
    try {
        d.parseParams(["1d5.5"])
    }
    catch(e){
        t.is(e, "the amount of sides can't be a decimal number")
    }
})

test("Throws an error when there are special characters", function (t) {
    t.plan(1);
    const d = new DiceCollection()
    try {
        d.parseParams(["№&±¿¡;ΠπΩ"])
    }
    catch(e){
        t.is(e, "U wot m8?!")
    }
})
