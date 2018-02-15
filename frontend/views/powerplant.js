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
          m('label[for=address]', 'Smart Meter Address'),
          m('input.form-control#address', { placeholder: 'Enter smart meter address here' }),
        ]),
        m('button.btn#CreateButton', { onclick: Model.create.bind(this.model) }, 'Create'),
      ]),
      m('h1', 'Add user to Power Plant'),
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
        m('button.btn#AddButton', { onclick: Model.addUser.bind(this.model) }, 'Add'),
      ]),
      m('h1', 'Remove user from Power Plant'),
      m('form', [
        m('.form-group', [
          m('label[for=smartmeter]', 'Smart Meter Address'),
          m('input.form-control#smartmeter', { placeholder: 'Enter smart meter address here' }),
        ]),
        m('.form-group', [
          m('label[for=user]', 'User Address'),
          m('input.form-control#user', { placeholder: 'Enter user address here' }),
        ]),
        m('button.btn#AddButton', { onclick: Model.removeUser.bind(this.model) }, 'Remove'),
      ]),
    ]);
  }
}
