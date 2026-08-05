import { http, HttpResponse } from 'msw';
import { testPassword, testRefreshedToken, testToken, testUser } from './fixtures.js';

export const api = (path) => `${import.meta.env.VITE_APP_ROOT_API}/${path.replace(/^\//, '')}`;

const isAuthorized = (request) =>
  [`Bearer ${testToken}`, `Bearer ${testRefreshedToken}`].includes(request.headers.get('Authorization'));

// Хендлери «щасливого шляху». Окремий тест перевизначає їх через server.use(...)
export const handlers = [
  http.post(api('v1/auth/login'), async ({ request }) => {
    const { email, password } = await request.json();

    if (email !== testUser.email || password !== testPassword) {
      return HttpResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    return HttpResponse.json({ access_token: testToken });
  }),

  http.post(api('v1/auth/refresh'), () => HttpResponse.json({ access_token: testRefreshedToken })),

  http.post(api('v1/auth/logout'), () => HttpResponse.json({})),

  http.get(api('v1/auth/me'), ({ request }) => {
    if (!isAuthorized(request)) {
      return HttpResponse.json({ message: 'Unauthenticated' }, { status: 401 });
    }

    return HttpResponse.json({ data: testUser });
  }),

  http.get(api('v1/translations'), () => HttpResponse.json({}))
];
