import { describe, expect, it } from 'vitest';
import { formatDate, formatDateTime, formatPrettyDate } from './date.js';

describe('date utils', () => {
  it('formats ISO strings, timestamps and Date objects', () => {
    expect(formatDate('2026-03-08')).toBe('08.03.2026');
    expect(formatDate(new Date(2026, 2, 8))).toBe('08.03.2026');
    expect(formatDateTime('2026-03-08T14:05:00')).toBe('08.03.2026 14:05');
  });

  it('formats localized dates', () => {
    expect(formatPrettyDate('2026-03-08')).toBe('8 березня 2026');
  });

  it.each([null, undefined, 'not-a-date', {}])('returns the fallback for %o', (value) => {
    expect(formatDate(value)).toBe('—');
    expect(formatDate(value, 'dd.MM.yyyy', '')).toBe('');
  });
});
