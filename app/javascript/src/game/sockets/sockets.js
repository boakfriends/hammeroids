import {MessageRouter} from './message_router.js';
import {Ship} from '../entities/ship.js';
import {Slug} from '../entities/slug.js';

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
    const router = new MessageRouter(event)
    router.action();
    const data = JSON.parse(event.data);
    if(data.type == 'welcome') {
      this.id = data.id;
    } else if(data.type == 'update' && this.id != data.id) {
      if(!this.networkObjects[data.id]) {
        this.networkObjects[data.id] = new Ship(data.data.position.x, data.data.position.y);
      }
      const remoteShip = this.networkObjects[data.id];
      remoteShip.setData(data.data);
      remoteShip.setName(data.name);
    } else if(data.type == 'slug') {
      this.networkObjects[JSON.stringify(data.slug)] = new Slug(data.slug.position);
    }
  };

  fire(slugState) {
    if(this.ws.readyState === 1 && this.id) {
      this.ws.send(JSON.stringify({'type': 'slug', 'slug': slugState}));
    }
  }
  
  updatePlayerShipState(ShipState, name) {
    if(this.ws.readyState === 1 && this.id) {
      this.ws.send(JSON.stringify({'type': 'update', 'name': name, 'id': this.id, 'data': ShipState}));
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
