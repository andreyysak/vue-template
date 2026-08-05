import { START_LOCATION } from 'vue-router';

import { setLocale } from '@/locales';
import { DEFAULT_LOCALE, SUPPORT_LOCALES } from '@/utils/locales';
import { storage } from '@/utils/storage.js';

const langLocales = SUPPORT_LOCALES.filter((item) => item.key !== DEFAULT_LOCALE);

const addAliasesToRoutes = (routes, lang, child) => {
  routes
    .filter((route) => route.path !== '/:pathMatch(.*)*')
    .forEach(function (route) {
      let alias = route.path;
      if (!child) {
        alias = '/' + lang + (alias.charAt(0) !== '/' ? '/' : '') + alias;
      }
      if (route.alias) {
        if (!Array.isArray(route.alias)) {
          route.alias = [route.alias];
        }
      } else {
        route.alias = [];
      }
      if (route.path !== alias && route.alias.indexOf(alias) === -1) {
        route.alias.push(alias);
      }
      if (route.children) {
        addAliasesToRoutes(route.children, lang, true);
      }
    });
};

// '/en/auth' -> 'en', '/auth' -> DEFAULT_LOCALE
export const getRouteLocale = (routePath) => {
  const lang = langLocales.find(({ key }) => routePath === `/${key}` || routePath.startsWith(`/${key}/`));
  return lang ? lang.key : DEFAULT_LOCALE;
};

// Rewrites the locale prefix of a path to the user's current locale
export const createLocaleRoute = (routePath) => {
  const userLang = storage.getItem('user_locale') || DEFAULT_LOCALE;
  const routeLang = getRouteLocale(routePath);
  const path = routeLang === DEFAULT_LOCALE ? routePath : routePath.slice(routeLang.length + 1) || '/';

  if (userLang === DEFAULT_LOCALE) {
    return path;
  }
  return `/${userLang}${path === '/' ? '' : path}`;
};

export const createAliasRoutes = (routes) => {
  langLocales.forEach((lang) => {
    addAliasesToRoutes(routes, lang.key);
  });
  return routes;
};

// On first load the URL defines the locale; afterwards the current locale is kept in the URL
// (named navigation like { name: 'Login' } always resolves to the path without a prefix)
export const localeGuard = async (to, from) => {
  if (from === START_LOCATION) {
    await setLocale(getRouteLocale(to.path));
    return;
  }

  const path = createLocaleRoute(to.path);
  if (path !== to.path) {
    return { path, query: to.query, hash: to.hash, replace: true };
  }
};
