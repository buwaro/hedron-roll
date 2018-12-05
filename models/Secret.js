const triggers = ['barrel']
const fs = require('fs');

class Secret {
  constructor(ctx, params) {
    this.params = params.join(' ')
    this.ctx = ctx;
    this.triggered = this._isTriggered();
  }

  _isTriggered() {
    return triggers.includes(this.params);
  }

  execute() {
    if (this.params == 'barrel') {
      this.barrelRoll();
    }
  }

  barrelRoll(){
    const dir = `${__addondirHedronRoll}/data/barrel_roll`;
    fs.readdir(dir, (err, files) => {
      var fileNames = []
      files.forEach((file) => {
        if (file.endsWith('.mp4')) {
          fileNames.push(file);
        }
      })

      const randomNumber = Math.floor(Math.random() * fileNames.length);
      const fileName = fileNames[randomNumber];

      if (fileName !== undefined) {
        this.ctx.replyWithVideo({ source: `${__addondirHedronRoll}/data/barrel_roll/${fileName}`});
      }
    });
  }


}

module.exports = Secret;
