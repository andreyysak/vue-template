src/
│
├── assets/              # стилі, картинки, шрифти
│   ├── styles/
│   │   ├── base/        # reset, typography
│   │   ├── helpers/     # variables, mixins, functions
│   │   ├── components/  # глобальні стилі компонентів
│   │   └── main.scss
│   └── images/
│
├── components/          # глобальні UI компоненти
│   ├── ui/              # кнопки, інпути
│   └── common/          # reusable блоки
│
├── layouts/             # layout-и
│   ├── MainLayout.vue
│   └── AuthLayout.vue
│
├── pages/               # сторінки (route-level)
│   ├── Home/
│   │   └── HomePage.vue
│   └── User/
│       └── UserPage.vue
│
├── router/
│   ├── index.js
│   └── routes.js
│
├── store/               # Pinia
│   ├── index.js
│   └── modules/
│       ├── user.js
│       └── auth.js
│
├── services/            # бізнес-логіка
│   ├── api/             # axios instance + endpoints
│   │   ├── client.js
│   │   └── user.api.js
│   └── helpers/         # util functions
│
├── composables/         # навіть з Option API — корисно
│
├── plugins/             # ініціалізація бібліотек
│   ├── axios.js
│   ├── swiper.js
│   └── toast.js
│
├── constants/
│
├── utils/
│
├── App.vue
└── main.js

/// Date FNS
# 🧱 БАЗА (must-have)

* **parseDate** — безпечний парсинг (string | Date → Date | null)
* **isValidDate** — перевірка валідності дати
* **formatDate** — формат у `dd.MM.yyyy`
* **formatDateTime** — дата + час
* **formatTime** — тільки час (`HH:mm`)

---

# ⏱️ ВІДНОСНИЙ ЧАС

* **fromNow** — "5 хвилин тому", "2 дні тому"
* **toNow** — "через 3 години"
* **getRelativeTime** — універсальна (today / yesterday / fromNow)

---

# 📊 РІЗНИЦЯ

* **diffDays** — різниця в днях
* **diffHours** — різниця в годинах
* **diffMinutes** — різниця в хвилинах
* **diffSeconds** — різниця в секундах

---

# 📅 МАНІПУЛЯЦІЯ ДАТАМИ

* **addDaysToDate** — +N днів
* **subDaysFromDate** — -N днів
* **addMonthsToDate**
* **subMonthsFromDate**
* **addYearsToDate**

---

# 🧭 ПЕРІОДИ

* **startOfDayDate** — початок дня
* **endOfDayDate** — кінець дня
* **startOfWeekDate**
* **endOfWeekDate**
* **startOfMonthDate**
* **endOfMonthDate**

---

# 🧠 CHECKS (дуже часто юзаються)

* **isTodayDate**
* **isYesterdayDate**
* **isTomorrowDate**
* **isPastDate** — чи дата в минулому
* **isFutureDate** — чи в майбутньому
* **isSameDay**
* **isSameMonth**

---

# 🔄 ДІАПАЗОНИ

* **isBetweenDates** — входить у діапазон
* **getDaysBetween** — масив дат між двома датами
* **getWeeksBetween**

---

# 🧾 ДЛЯ UI (дуже корисно)

* **formatForInput** — для `<input type="date">` (yyyy-MM-dd)
* **formatForApi** — ISO формат
* **formatHumanDate** — типу "12 березня 2024"
* **formatShortDate** — "12.03"

---

# ⚡ ПРОКАЧАНИЙ РІВЕНЬ (якщо хочеш топ шаблон)

* **getAge** — обчислення віку
* **getTimeAgoStrict** — без "майже", чітко
* **roundToNearestMinutes**
* **getQuarter** — квартал
* **getWeekNumber**
