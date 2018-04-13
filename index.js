global.__addondirHedronRoll = __addondir["hedron-roll"]

const Dice = require(__addondirHedronRoll + "/models/Dice")
const DiceCollection = require(__addondirHedronRoll + "/models/DiceCollection")

module.exports = (bot) => {
  bot.command('roll', (ctx) => {
    try {
      var params = getParams(ctx)
      if (params.length == 0 ) {
        result = new Dice(6).roll()
      }
      else {
        var diceCollection = new DiceCollection()
        diceCollection.addDices(params)
        var result = diceCollection.rollDices().join(", ")
      }

      ctx.reply(result)
    }
    catch (error) {
      ctx.reply(error)
    }
  })
}

function getParams(ctx) {
    var parts = ctx.message.text.split(" ")
    parts.shift()
    return parts
}
