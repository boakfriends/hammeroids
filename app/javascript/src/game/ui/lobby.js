/*jshint esversion: 6 */
export class Lobby {
  constructor({players=[]}, socket, elementId="lobby") {
    this.socket = socket;
    this.players = players;
    this.elementId = elementId;
  }

  update () {
    if(this.parentElement) {
      this.clearParent();
      this.players.forEach((player) => {
        const div = document.createElement("div");
        const text = document.createTextNode(player.name);
        div.appendChild(text);
        this.parentElement.appendChild(div)
      });
    }
  }

  clearParent () {
    while (this.parentElement.firstChild) {
      this.parentElement.removeChild(this.parentElement.firstChild);
    }
  }

  get parentElement () {
    return document.getElementById(this.elementId);
  }

}
