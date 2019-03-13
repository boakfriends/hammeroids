export class Drawer {
  constructor(params) {
    this.params = params;
  }

  draw(context) {
    context.save();
    Object.keys(this.params).forEach((key) => context[key] = this.params[key]);
    (this._draw || (() => {}))(context);
    context.restore();
  }
}