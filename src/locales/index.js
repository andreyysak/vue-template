import axios from 'axios';
import { createI18n } from 'vue-i18n';

import { en, uk } from '@/locales/lang';
import { SUPPORT_LOCALES, DEFAULT_LOCALE } from '@/utils/locales.js';
import { storage } from '@/utils/storage.js';

let localTranslation = { en, uk };

const initDefaultLocale = () => {
  let supportKeys = SUPPORT_LOCALES.map((item) => item.key);
  let localStorageKey = storage.getItem('user_locale');

  if (!localStorageKey || !supportKeys.includes(localStorageKey)) {
    storage.setItem('user_locale', DEFAULT_LOCALE);
  }
};

const loadTranslation = async () => {
  let localeKey = storage.getItem('user_locale');
  let translation = localTranslation[localeKey];

  try {
    const response = await axios.get(`${import.meta.env.VITE_APP_ROOT_API}/v1/translations`, {
      headers: {
        Accept: 'application/json',
        'X-localization': localeKey
      }
    });
    translation = Object.assign({}, response.data, translation);
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return { [localeKey]: translation };
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

initDefaultLocale();
export const i18nManager = async () => {
  return createI18n({
    legacy: false,
    locale: storage.getItem('user_locale'),
    pluralizationRules: {
      uk: customPluralizationSlavicRule
    },
    messages: await loadTranslation()
  });
};
