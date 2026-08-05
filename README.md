# Vue Template

Базовий шаблон для нових Vue-проєктів: роутинг з вкладеними layout'ами, авторизація, мультимовність, глобальна SCSS-система (змінні/міксини/типографіка без імпортів), і набір готових компонентів-обгорток над PrimeVue.

## Технічний стек

- **Node** `v24.14.0` (`package.json engines`: `^22.18.0 || >=24.12.0`)
- **Vue** 3.5 — Options API (`index.js` + `index.vue` окремими файлами) майже всюди, `<script setup>` лише в `App.vue`
- **Vite** 8 — білдер і dev-сервер
- **Vue Router** 5 — layout'и — батьківські маршрути (`children`), доступ — через `meta.requiresAuth` / `meta.guestOnly`
- **Pinia** 4 — стейт-менеджмент (`store/app.js`, `store/auth.js`)
- **PrimeVue** 4.5 + **@primeuix/themes** 2 (Aura preset) — UI-кит. Це останні MIT-версії; **не онови на PrimeVue 5** — там платна ліцензія на рантайм-рівні (детальніше — коментар у `src/utils/primevue.js` і історія чату)
- **vue-i18n** 11 — мультимовність, Composition API mode (`legacy: false`)
- **Sass** (dart-sass, `modern-compiler` API) — глобальні змінні/міксини/типографіка доступні в будь-якому `.scss`/`<style lang="scss">` без імпортів
- **Axios** — `$http` інстанс з інтерцепторами (токен, 401/404/500) у `utils/https.js`
- **Yup** — валідація форм
- **date-fns**, **lodash**, **@lucide/vue**, **swiper** — утиліти/іконки/карусель
- **ESLint** 10 (flat config) + **eslint-plugin-vue** + **@vue/eslint-config-prettier** + **Prettier** — лінт і форматування

## Старт

```bash
npm install
npm run dev       # dev-сервер
npm run build     # прод-білд
npm run preview   # прев'ю білда
npm run lint      # eslint --fix
npm run format    # prettier --write src/
```

### Змінні середовища

`.env`, `.env.dev`, `.env.stage`, `.env.prod` — по одному на кожне середовище (`.env.example` — шаблон для новачка в команді). Обидві базові змінні:

```
VITE_APP_NAME=TEMPLATE
VITE_APP_ROOT_API=http://localhost:8000
```

## Структура проєкту

```
src/
├── assets/
│   ├── fonts/                 # Lato woff2/woff (підключений через base/_fonts.scss)
│   └── styles/
│       ├── base/              # реальний CSS-вивід, підключається 1 раз через main.scss
│       │   ├── _fonts.scss    # @font-face (цикл по вагах Lato)
│       │   ├── _reset.scss    # мінімальний reset
│       │   ├── _typography.scss # :root токени шрифтів (--app-*), стилі body/h1-h6/a/code, утиліти .text-truncate/.text-muted/.visually-hidden
│       │   ├── _animation.scss # @keyframes
│       │   └── _transition.scss # класи для <Transition> (fade, slide-*, accordion, list)
│       ├── general/           # тільки змінні/міксини, без CSS-виводу
│       │   ├── _vars.scss     # $color-*, $radius, $shadow, $z-index-* — посилаються на CSS-змінні PrimeVue (--p-*)
│       │   ├── _mixins.scss   # up/down/between, light/dark, hover, focus-ring, transition, flex-*, grid, text(), heading() тощо
│       │   └── index.scss     # @forward vars+mixins — авто-інжектиться в кожен .scss (vite.config.js)
│       └── main.scss          # base/*, підключається один раз у main.js
├── components/
│   ├── core/                  # обгортки над PrimeVue: Button, Input, Select, Spinner, Loader, Toast
│   └── general/                # Header, Sidebar, Footer (поки заглушки)
├── layouts/
│   ├── Main/                  # layout для авторизованої частини
│   └── Auth/                  # layout для сторінок логіну/реєстрації
├── locales/
│   ├── index.js                # i18n інстанс + setLocale (довантажує переклади з API)
│   └── lang/{en,uk}/translation.js
├── router/
│   ├── index.js                # список маршрутів + router.beforeEach(authGuard)
│   ├── permissions.js          # authGuard — guard на requiresAuth/guestOnly
│   └── locales.js              # createAliasRoutes (/en-аліаси), createLocaleRoute, localeGuard
├── store/
│   ├── app.js                  # тема, модалка, сайдбар, глобальний лоадер
│   └── auth.js                 # логін/реєстрація/токен/me
├── utils/
│   ├── https.js                 # axios-інстанс з інтерцепторами
│   ├── storage.js               # обгортка над localStorage з префіксом
│   ├── validation.js, date.js, constants.js, primevue.js, locales.js
└── views/
    ├── Home/
    ├── Auth/{Login,Signup,Reset,Restore}/
    └── 404/, 500/
```

Кожен компонент/view/layout — папка з `index.vue` + `index.js` (логіка) + `index.scss` (стилі). Імпортувати можна без розширення — `@/components/core/Button` резолвиться в `index.vue` (налаштовано в `vite.config.js` → `resolve.extensions`).

## Якщо авторизація або мультимовність не потрібні

Це шаблон "на все", тому в конкретному проєкті щось із цього зазвичай зайве. Обидва блоки прибираються незалежно один від одного.

### Прибрати авторизацію

1. Видали папки `src/layouts/Auth/` і `src/views/Auth/`.
2. Видали файли `src/store/auth.js` і `src/router/permissions.js`.
3. У `src/router/index.js`:
   - прибери `import { authGuard } from '@/router/permissions.js';` та `router.beforeEach(authGuard);`
   - прибери маршрути `/auth`, `/auth/signup`, `/auth/reset`, `/auth/restore`
   - у маршруту `Home` прибери `requiresAuth: true` з `meta`
4. У `src/main.js`:
   - прибери блок відновлення токена:
     ```js
     if (storage.getItem('user_token')) {
         const authStore = useAuthStore();
         authStore.SET_AUTH().catch(() => {});
     }
     ```
   - разом з ним — імпорти `useAuthStore` і `storage` (якщо `storage` більше ніде в файлі не використовується)
5. У `src/utils/https.js` прибери `import { useAuthStore } from '@/store/auth.js';` `refreshToken` і блок `if (status === 401) { ... }` у відповідь-інтерцепторі (або спрости його під свою логіку — там є переадресація на видалений маршрут `Login`).

### Прибрати мультимовність (vue-i18n)

1. Видали папку `src/locales/` і файли `src/utils/locales.js`, `src/router/locales.js`.
2. У `src/router/index.js`:
   - прибери `import { createAliasRoutes, localeGuard } from '@/router/locales.js';` та `router.beforeEach(localeGuard);`
   - заміни `routes: createAliasRoutes(routes)` на `routes`
3. У `src/main.js` прибери `import { i18n } from '@/locales';` та `app.use(i18n);`
4. Видали пакет: `npm uninstall vue-i18n`.
5. Якщо десь у шаблонах з'явиться `$t('...')` — заміни на звичайний текст.

`storage.js` після обох кроків можна лишити як є — це загальна обгортка над `localStorage`, вона нічого не знає ні про auth, ні про locale напряму.
