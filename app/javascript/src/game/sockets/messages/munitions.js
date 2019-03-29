import {Slug} from '../../entities/slug.js';

export class Munitions {
  constructor(payload, socket) {
    this.payload = payload;
    this.socket = socket;
  }

  update() {
    if(this.payload.id != this.socket.id){
        this.socket.networkObjects[JSON.stringify(this.payload)] = new Slug(this.payload.state.position, this.payload.state.angle);
    }
  }
}