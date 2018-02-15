const m = require('mithril');

export default class Layout {
  static view(vnode) {
    return m('.container-fluid', [
      m('nav.navbar.navbar-expand-lg', [
        m('span.navbar-brand', [
          m('a', { href: '/', oncreate: m.route.link }, [
            m('img', { src: '../img/currentcy.png' }),
          ]),
        ]),
        m('ul.navbar-nav.mr-auto', [
          m('li.nav-item', [
            m('a.nav-link', { href: '/register', oncreate: m.route.link }, 'Smart Meter Admin'),
          ]),
          m('li.nav-item', [
            m('a.nav-link', { href: '/powerplant', oncreate: m.route.link }, 'Power Plant Admin'),
          ]),
          m('li.nav-item', [
            m('a.nav-link', { href: '/meter', oncreate: m.route.link }, 'Smart Meter'),
          ]),
        ]),
        m('span.navbar-text', window.currentAccount),
      ]),
      vnode.children,
    ]);
  }
}
