export class PlayerName {
  constructor(payload, socket) {
    this.payload = payload;
    this.socket = socket;
  }

  update() {
    this.socket.id = this.payload.id;
    this.socket.ws.send(this.messageString)
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

