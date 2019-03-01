export class Sockets {
  constructor(host, socket) {
    const scheme = "ws://",
      uri = scheme + host + ':8080' + '/game';
    this._networkObjects = [];
    this._ws = socket || new WebSocket(uri);
    this._ws.onmessage = this.onMessage;
  }

  setSocket = (socket) => {
    this._ws = socket;
    this._ws.onmessage = this.onMessage;
  }

  onMessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data);
  };
  
  updatePlayerShipState = (playerShipState) => {
    if(this._ws.readyState === 1) {
      this._ws.send(JSON.stringify(playerShipState));
    }
  }

  getNetworkObjects = () => {
    return this._networkObjects;
  }

}