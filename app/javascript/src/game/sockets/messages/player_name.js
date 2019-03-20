export class PlayerName {
  constructor(ws) {
    this.ws = ws;
  }

  update() {
    this.ws.send(this.messageString)
  }

  get messageString() {
    return JSON.stringify(this.message);
  }

  get message() {
    return { 'type': 'player', 'attributes': { 'name': this.playerName } };
  }

  get playerName() {
    return document.body.dataset.playerName;
  }
}

