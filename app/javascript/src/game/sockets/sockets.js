import {MessageRouter} from './message_router.js';

export class Sockets {
  constructor(uri, socket) {
    this.networkObjects = {};
    this.ws = socket || new WebSocket(uri);
    this.ws.onmessage = this.onMessage;
  }

  setSocket(socket) {
    this.ws = socket;
    this.ws.onmessage = this.onMessage;
  }

  onMessage = (event) => {
    const router = new MessageRouter(event, this)
    router.action();
  };

  fire(slugState) {
    if(this.ws.readyState === 1 && this.id) {
      this.ws.send(JSON.stringify({
        'type': 'munitions',
        'payload': {
          'id': this.id,
          'state': slugState
        }
      }));
    }
  }
  
  updatePlayerShipState(shipState, name) {
    if(this.ws.readyState === 1 && this.id) {
      this.ws.send(JSON.stringify({
        'type': 'update', 
        'payload': {
          'name': name,
          'id': this.id,
          'state': shipState
        }
      }));
    }
  }

  getNetworkObjects() {
    const objArr = [];
    for(let id in this.networkObjects) {
      objArr.push(this.networkObjects[id]);
    }
    return objArr;
  }

}
