export class FrameRate {

  constructor() {
    this._frameRate = 0;
    this.lastFpsUpdate = 0;
    this.numberOfFramesCounted = 0;

    // Constants
    this.UPDATES_PER_SECOND = 4;
    this.DECAY = 0.25;
  }

  update(timestamp) {
    if(timestamp > this.lastFpsUpdate + 1000 / this.UPDATES_PER_SECOND) {
      this._frameRate = this.DECAY * this.numberOfFramesCounted * this.UPDATES_PER_SECOND + (1 - this.DECAY) * this._frameRate;
      this.lastFpsUpdate = timestamp;
      this.numberOfFramesCounted = 0;
    }
    this.numberOfFramesCounted++;
  }

  get frameRate() {
    return this._frameRate;
  }
}