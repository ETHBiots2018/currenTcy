import Model from '../models/powerplant';

const m = require('mithril');

export default class PowerPlant {
  oninit() {
    this.model = new Model();
  }
  view() {
    return m('main', [
      m('h1', 'Register Power Plant'),
      m('form', [
        m('.form-group', [
          m('label[for=address]', 'Smart meter address'),
          m('input.form-control#address', { placeholder: 'Enter smart meter address here' }),
        ]),
        m('button.btn#CreateButton', { onclick: Model.create.bind(this.model) }, 'Create'),
      ]),
    ]);
  }
}
