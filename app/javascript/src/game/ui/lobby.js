/*jshint esversion: 6 */
export class Lobby {
  constructor(payload, elementId="lobby") {
    this.payload = payload;
    this.elementId = elementId;
  }

  update () {
    this.clearParent();
    this.players.forEach((player) => {
      const div = document.createElement("div");
      const text = document.createTextNode(`${player.name} (${player.id})`);
      div.appendChild(text);
      this.parentElement.appendChild(div)
    })
  }

  clearParent () {
    while (this.parentElement.firstChild) {
      this.parentElement.removeChild(this.parentElement.firstChild);
    }
  }

  get parentElement () {
    return document.getElementById(this.elementId);
  }

  get players () {
    return this.payload.players
  }
}
