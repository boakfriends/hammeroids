import {Lobby} from '../ui/lobby.js';
import {Update} from './messages/update.js';
import {Munitions} from './messages/munitions.js';
import {PlayerName} from './messages/player_name.js';

const CLASSES = {
  'lobby': Lobby,
  'update': Update,
  'munitions': Munitions,
  'welcome': PlayerName
};

export class MessageRouter {
  constructor(event, socket) {
    this.event = event;
    this.socket = socket;
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
    return new this.klass(this.payload, this.socket);
  }

  get payload () {
    return this.data.payload;
  }

  get type () {
    return this.data.type;
  }
}
