import GarageView from './views/Garage';
import WinnerView from './views/Winner';

const pathRegex = (path: string) =>
  new RegExp(`^${path.replace(/\//g, '\\/').replace(/:\w+/g, '(.+)')}$`);

const router = async () => {
  const routes = [
    { path: '/', View: GarageView },
    { path: '/winner', View: WinnerView },
  ];

  const potentialMatches = routes.map((route) => ({
    route,
    result: window.location.pathname.match(pathRegex(route.path)),
  }));

  let match = potentialMatches.find(
    (potentialMatch) => potentialMatch.result != null
  );

  if (!match) {
    match = { route: routes[0], result: [window.location.pathname] };
    window.location.pathname = '/';
  }

  const view = new match.route.View();
  const app = document.querySelector<HTMLElement>('#app');
  if (app) {
    app.innerHTML = await view.mount();
  }

  await view.mounted();
};

const navigateTo = (url: string) => {
  window.history.pushState(null, null, url);
  router();
};

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if ((e.target as Element).matches('[data-link]')) {
      e.preventDefault();
      navigateTo((e.target as HTMLLinkElement).href);
    }
  });
  router();
});
