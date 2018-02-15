import Model from '../models/meter';

const m = require('mithril');

export default class Meter {
  static oninit() {
    this.model = new Model();
  }

  static view() {
    return m('main', [
      m('h1', 'Smart Meter'),
      m('.alert.alert-warning', 'Please ensure your current account is a registered smart meter.'),
      m('form', [
        m('.form-group', [
          m('label[for=wh]', 'Produced / consumed power'),
          m('input.form-control#wh', { placeholder: 'Enter power production / consumption in Wh' }),
        ]),
        m('button.btn#produceButton', { onclick: Model.produce.bind(this.model) }, 'Produce'),
        m('button.btn#consumeButton', { onclick: Model.consume.bind(this.model) }, 'Consume'),
      ]),
    ]);
  }
}
