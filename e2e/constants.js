export const E2E_APP_NAME = 'E2E';
export const E2E_API_URL = 'http://localhost:4174/api';

/** Ключ у localStorage так само, як у src/utils/storage.js */
export const storageKey = (key) => `APP_${E2E_APP_NAME}_${key}`;

export const e2eUser = { id: 1, email: 'john@example.com', name: 'John Doe' };
export const e2eToken = 'e2e-access-token';
