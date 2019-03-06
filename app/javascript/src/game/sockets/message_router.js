import {Lobby} from'../ui/lobby';

const CLASSES = {
  'lobby': Lobby,
};

export class MessageRouter {
  constructor(event) {
    this.event = event;
  }

  action () {
    if (this.klass !== undefined) {
      this.klass_instance.update();
    }
  }

  get data () {
    return JSON.parse(this.event.data);
  }

  get klass () {
    return CLASSES[this.type]
  }

  get klass_instance () {
    return new this.klass(this.payload);
  }

  get payload () {
    return this.data.payload;
  }

  get type () {
    return this.data.type;
  }
}
