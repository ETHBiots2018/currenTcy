const m = require('mithril');

export default class Layout {
  static view(vnode) {
    return m('.container-fluid', [
      m('nav.navbar', [
        m('span.navbar-brand', [
          m('a', { href: '/', oncreate: m.route.link }, [
            m('img', { src: '../img/currentcy.png' }),
          ]),
        ]),
        m('ul.navbar-nav', [
          m('li.nav-item', [
            m('a', { href: '/register', oncreate: m.route.link }, 'Smart-Meter Admin'),
          ]),
          m('li.nav-item', [
            m('a', { href: '/powerplant', oncreate: m.route.link }, 'Power Plant Admin'),
          ]),
          m('li.nav-item.ml-auto', [
            m('a', { href: `https://etherscan.io/address/${global.currentAccount}` }, global.currentAccount),
          ]),
        ]),
      ]),
      vnode.children,
    ]);
  }
}
