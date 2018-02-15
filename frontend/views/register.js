import Model from '../models/register';

const m = require('mithril');

export default class Meter {
  oninit() {
    this.model = new Model();
  }

  view() {
    return m('main', [
      m('h1', 'Register smart meter'),
      m('form', [
        m('.form-group', [
          m('label[for=address]'),
          m('input.form-control#address', { id: 'address' }),
        ]),
        m('button.btn#registerButton', { onclick: Model.register.bind(this.model) }, 'Register'),
        m('button.btn#unregisterButton', { onclick: Model.unregister.bind(this.model) }, 'Unregister'),
      ]),
    ]);
  }
}
