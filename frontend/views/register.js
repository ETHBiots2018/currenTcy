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
          m('label[for=address]', 'Smart Meter Address'),
          m('input.form-control#address', { id: 'address', placeholder: 'Enter smart meter adress' }),
        ]),
        m('button.btn#registerButton', { onclick: Model.register.bind(this.model) }, 'Register'),
        m('button.btn#unregisterButton', { onclick: Model.unregister.bind(this.model) }, 'Unregister'),
      ]),
      m('h1', 'Connect user to smart meter'),
      m('form', [
        m('.form-group', [
          m('label[for=connectSmartMeter]', 'Smart Meter Address'),
          m('input.form-control#connectSmartMeter', { id: 'connectSmartMeter', placeholder:'Enter smart meter address' }),
        ]),
        m('.form-group', [
          m('label[for=connectUser]', 'User Address'),
          m('input.form-control#connectUser', { id: 'connectUser', placeholder:'Enter user address'}),
        ]),
        m('button.btn#connectButton', { onclick: Model.connect.bind(this.model) }, 'Connect')
      ]),
    ]);
  }
}
