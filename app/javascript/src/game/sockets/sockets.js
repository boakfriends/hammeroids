import {Ship} from '../entities/ship.js';
import {Slug} from '../entities/slug.js';

export class Sockets {
  constructor(host, socket) {
    const scheme = 'ws://',
      uri = scheme + host + ':8080' + '/game';
    this._networkObjects = {};
    this._ws = socket || new WebSocket(uri);
    this._ws.onmessage = this.onMessage;
  }

  setSocket(socket) {
    this._ws = socket;
    this._ws.onmessage = this.onMessage;
  }

  onMessage = (event) => {
    const data = JSON.parse(event.data);
    if(data.type == 'welcome') {
      this._id = data.id;
    } else if(data.type == 'update' && this._id != data.id) {
      if(!this._networkObjects[data.id]) {
        this._networkObjects[data.id] = new Ship(data.data.position.x, data.data.position.y);
      }
      const remoteShip = this._networkObjects[data.id];
      remoteShip.setData(data.data);
      remoteShip.setName(data.name);
    } else if(data.type == 'slug') {
      this._networkObjects[JSON.stringify(data.slug)] = new Slug(data.slug.position);
    }
  };

  fire(slugState) {
    if(this._ws.readyState === 1 && this._id) {
      this._ws.send(JSON.stringify({'type': 'slug', 'slug': slugState}));
    }
  }
  
  updatePlayerShipState(ShipState, name) {
    if(this._ws.readyState === 1 && this._id) {
      this._ws.send(JSON.stringify({'type': 'update', 'name': name, 'id': this._id, 'data': ShipState}));
    }
  }

  getNetworkObjects() {
    const objArr = [];
    for(let id in this._networkObjects) {
      objArr.push(this._networkObjects[id]);
    }
    return objArr;
  }

}