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

export const createLocaleRoute = (routePath) => {
  let userLang = storage.getItem('user_locale');
  let routePaths = routePath.split('/');

  let indexLocaleKey = -1;
  for (let i = 0; i < langLocales.length; i++) {
    indexLocaleKey = routePaths.indexOf(langLocales[i].key);
    if (indexLocaleKey > -1) {
      break;
    }
  }

  if (indexLocaleKey > -1) {
    if (userLang === DEFAULT_LOCALE) {
      routePaths.splice(indexLocaleKey, 1).join('/');
    } else if (routePaths[indexLocaleKey] !== userLang) {
      routePaths[indexLocaleKey] = userLang;
    }
    routePath = routePaths.join('/');
  } else {
    if (userLang !== DEFAULT_LOCALE) {
      routePath = '/' + userLang + routePath;
    }
  }

  return routePath;
};

export const createAliasRoutes = (routes) => {
  langLocales.forEach((lang) => {
    addAliasesToRoutes(routes, lang.key);
  });
  return routes;
};
