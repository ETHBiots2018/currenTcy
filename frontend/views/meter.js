import Model from '../models/meter';

const m = require('mithril');

export default class Meter {
  static oninit() {
    this.model = new Model();
  }

  static view() {
    return m('main.w-75.p-3.mx-auto', [
      m('h1', 'Smart Meter'),
      m('.alert.alert-warning', [
        m.trust('<b>Access restriction</b><br>'),
        'Note that the actions on this page may only be performed by a registered smart meter',
      ]),
      m('form', [
        m('.form-group', [
          m('label[for=wh]', 'Produced / consumed power'),
          m('input.form-control#wh', { placeholder: 'Enter power production / consumption in Wh' }),
        ]),
        m('button.btn.btn-primary.mr-3#produceButton', { onclick: Model.produce.bind(this.model) }, 'Produce'),
        m('button.btn.btn-primary#consumeButton', { onclick: Model.consume.bind(this.model) }, 'Consume'),
      ]),
    ]);
  }
}
