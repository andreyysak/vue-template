import { format, formatDistanceToNow, parseISO, isValid } from 'date-fns';
import { uk } from 'date-fns/locale';

const locales = { uk };

function toDate(value) {
  if (value == null) return null;

  let date;
  if (value instanceof Date) {
    date = value;
  } else if (typeof value === 'number') {
    date = new Date(value);
  } else if (typeof value === 'string') {
    date = parseISO(value);
  } else {
    return null;
  }

  return isValid(date) ? date : null;
}

export function formatDate(value, pattern = 'dd.MM.yyyy', fallback = '—') {
  const date = toDate(value);
  if (!date) return fallback;
  return format(date, pattern);
}

export function formatDateLocalized(value, pattern = 'd MMMM yyyy', localeKey = 'uk', fallback = '—') {
  const date = toDate(value);
  if (!date) return fallback;
  return format(date, pattern, { locale: locales[localeKey] });
}

export function formatDateOnly(value, fallback = '—') {
  return formatDate(value, 'dd.MM.yyyy', fallback);
}

export function formatTimeOnly(value, fallback = '—') {
  return formatDate(value, 'HH:mm', fallback);
}

export function formatDateTime(value, fallback = '—') {
  return formatDate(value, 'dd.MM.yyyy HH:mm', fallback);
}

export function formatPrettyDate(value, localeKey = 'uk', fallback = '—') {
  return formatDateLocalized(value, 'd MMMM yyyy', localeKey, fallback);
}

export function formatRelative(value, localeKey = 'uk', fallback = '—') {
  const date = toDate(value);
  if (!date) return fallback;
  return formatDistanceToNow(date, {
    locale: locales[localeKey],
    addSuffix: true
  });
}
