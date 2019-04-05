export class Remove {
  constructor(payload, socket) {
    this.payload = payload;
    this.socket = socket;
  }

  update() {
    delete this.socket.networkObjects[this.payload.id];
  }
}