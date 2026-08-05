import axios from 'axios';
import { createI18n } from 'vue-i18n';

import { en, uk } from '@/locales/lang';
import { SUPPORT_LOCALES, DEFAULT_LOCALE } from '@/utils/locales.js';
import { storage } from '@/utils/storage.js';

const localTranslation = { en, uk };
const loadedLocales = new Set();

const getInitialLocale = () => {
  const localStorageKey = storage.getItem('user_locale');
  return SUPPORT_LOCALES.some((item) => item.key === localStorageKey) ? localStorageKey : DEFAULT_LOCALE;
};

// Server translations override local ones; local ones are the fallback when API is unavailable
const loadTranslation = async (localeKey) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_ROOT_API}/v1/translations`, {
      timeout: 5000,
      headers: {
        Accept: 'application/json',
        'X-localization': localeKey
      }
    });
    return { ...localTranslation[localeKey], ...response.data };
  } catch {
    return localTranslation[localeKey];
  }
};

const customPluralizationSlavicRule = (count, countLength) => {
  if (count === 0) {
    return 0;
  }

  const ensWithTeen = count > 10 && count < 20;
  const endsWithOne = count % 10 === 1;
  if (!ensWithTeen && endsWithOne) {
    return 1;
  }
  if (!ensWithTeen && count % 10 >= 2 && count % 10 <= 4) {
    return 2;
  }

  return countLength < 4 ? 2 : 3;
};

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: DEFAULT_LOCALE,
  pluralizationRules: {
    uk: customPluralizationSlavicRule
  },
  messages: { ...localTranslation }
});

export const setLocale = async (localeKey) => {
  if (!loadedLocales.has(localeKey)) {
    i18n.global.setLocaleMessage(localeKey, await loadTranslation(localeKey));
    loadedLocales.add(localeKey);
  }
  i18n.global.locale.value = localeKey;
  storage.setItem('user_locale', localeKey);
  document.documentElement.lang = localeKey;
};
