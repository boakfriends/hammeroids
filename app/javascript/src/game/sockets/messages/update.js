import {Ship} from '../../entities/ship.js';

export class Update {
  constructor(payload, socket) {
    this.payload = payload;
    this.socket = socket
  }

  update() {
    if(this.socket.id != this.payload.id) {
      if(!this.socket.networkObjects[this.payload.id]) {
        this.socket.networkObjects[this.payload.id] = new Ship(this.payload.state.position.x, this.payload.state.position.y);
      }
      const remoteShip = this.socket.networkObjects[this.payload.id];
      remoteShip.setData(this.payload.state);
      remoteShip.setName(this.payload.name);
    }
  }
}