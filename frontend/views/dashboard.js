import Model from '../models/dashboard';

const m = require('mithril');

export default class Dashboard {
  oninit() {
    this.model = new Model();
  }
  view() {
    this.stfuEslint = true;
    return m('main', [
      m('.jumbotron', [
        m('.d-flex.justify-content-center.align-items-center', [
          m('img.mr-3', { src: './img/currentcy_logo.png' }),
          m('div', [
            m('h5.display-5', 'Your current energy budget'),
            m('h1.display-1', `${this.model.balance} Wh`),
          ]),
        ]),
      ]),
    ]);
  }
}
