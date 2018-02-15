import Model from '../models/powerplant';

const m = require('mithril');

export default class PowerPlant {
  oninit() {
    this.model = new Model();
  }
  view() {
    return m('main.w-75.p-3.mx-auto', [
      m('h1', 'Power Plant Administration'),
      m('.alert.alert-warning', [
        m.trust('<b>Access restriction</b><br>'),
        'Note that the actions on this page may only be performed by the contract owner',
      ]),
      m('section.mb-3', [
        m('h3', 'Register Power Plant'),
        m('form', [
          m('.form-group', [
            m('label[for=address]', 'Smart Meter Address'),
            m('input.form-control#address', { placeholder: 'Enter smart meter address here' }),
          ]),
          m('button.btn.btn-primary#CreateButton', { onclick: Model.create.bind(this.model) }, 'Create'),
        ]),
      ]),
      m('section.mb-3', [
        m('h3', 'Add User to Power Plant'),
        m('form', [
          m('.form-group', [
            m('label[for=smartmeter]', 'Smart Meter Address'),
            m('input.form-control#smartmeter', { placeholder: 'Enter smart meter address here' }),
          ]),
          m('.form-group', [
            m('label[for=user]', 'User Address'),
            m('input.form-control#user', { placeholder: 'Enter user address here' }),
          ]),
          m('.form-group', [
            m('label[for=percentage]', 'User Percentage'),
            m('input.form-control#percentage', { placeholder: 'Enter user percentage here' }),
          ]),
          m('button.btn.btn-primary#AddButton', { onclick: Model.addUser.bind(this.model) }, 'Add'),
        ]),
      ]),
      m('section', [
        m('h3', 'Remove user from Power Plant'),
        m('form', [
          m('.form-group', [
            m('label[for=smartmeter]', 'Smart Meter Address'),
            m('input.form-control#smartmeter', { placeholder: 'Enter smart meter address here' }),
          ]),
          m('.form-group', [
            m('label[for=user]', 'User Address'),
            m('input.form-control#user', { placeholder: 'Enter user address here' }),
          ]),
          m('button.btn.btn-primary#AddButton', { onclick: Model.removeUser.bind(this.model) }, 'Remove'),
        ]),
      ]),
    ]);
  }
}
