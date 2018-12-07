global.__addondirHedronRoll = __addondir["hedron-roll"]

const Dice = require(__addondirHedronRoll + "/models/Dice")
const DiceCollection = require(__addondirHedronRoll + "/models/DiceCollection")
const Secret = require(__addondirHedronRoll + "/models/Secret")

module.exports = (bot) => {
  bot.command('roll', (ctx) => {
    try {
      var params = getParams(ctx)
      secret = new Secret(ctx, params);

      if (params.length == 0 ) {
        result = new Dice(6).roll()
      }
      else if(secret.triggered) {
        secret.execute();
      }
      else {
        var diceCollection = new DiceCollection()
        diceCollection.parseParams(params);
        var result = diceCollection.result();
      }

      if (!secret.triggered) {
        ctx.reply(result)
      }
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
