import Model from '../models/register';

const m = require('mithril');

export default class Meter {
  oninit() {
    this.model = new Model();
  }

  view() {
    return m('main.w-75.p-3.mx-auto', [
      m('h1', 'Smart Meter Administration'),
      m('.alert.alert-warning', [
        m.trust('<b>Access restriction</b><br>'),
        'Note that the actions on this page may only be performed by the contract owner',
      ]),
      m('section.mb-3', [
        m('h3', 'Register Smart Meter'),
        m('form', [
          m('.form-group', [
            m('label[for=address]', 'Smart Meter Address'),
            m('input.form-control#address', { id: 'address', placeholder: 'Enter smart meter adress' }),
          ]),
          m('button.btn.btn-primary.mr-3#registerButton', { onclick: Model.register.bind(this.model) }, 'Register'),
          m('button.btn.btn-primary#unregisterButton', { onclick: Model.unregister.bind(this.model) }, 'Unregister'),
        ]),
      ]),
      m('section', [
        m('h3', 'Assign Smart Meter to User'),
        m('form', [
          m('.form-group', [
            m('label[for=connectSmartMeter]', 'Smart Meter Address'),
            m('input.form-control#connectSmartMeter', { id: 'connectSmartMeter', placeholder: 'Enter smart meter address' }),
          ]),
          m('.form-group', [
            m('label[for=connectUser]', 'User Address'),
            m('input.form-control#connectUser', { id: 'connectUser', placeholder: 'Enter user address' }),
          ]),
          m('button.btn.btn-primary#connectButton', { onclick: Model.connect.bind(this.model) }, 'Connect'),
        ]),
      ]),
    ]);
  }
}
