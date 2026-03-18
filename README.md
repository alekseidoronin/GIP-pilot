ФИНАЛЬНОЕ ПОЛНОЕ ТЗ (версия 1.3) — НИЧЕГО НЕ УПУЩЕНО
✅ ПРОВЕРКА: ВСЁ НА МЕСТЕ
Функционал: API endpoints, CRUD, Gemini.

Веб-интерфейс: 4 таба, кнопки, таблицы, скриншоты UI.

SSL/порты: nginx.conf, certbot, fallback порты.

БД: schema.sql готов.

Cursor промпт: полный.

1. Введение
Домен: gip-pilot.duckdns.org
GitHub: https://github.com/alekseidoronin/GIP-pilot.git
AI: Google Gemini API

2. 4 компонента (подробно)
Радар объектов
Таблица колонок:

text
Объект | Город | Стадия | Компании | Ссылка | Дата | Действия
Кнопки (сверху):

🔄 Обновить радар → POST /api/radar/generate

➕ Добавить повод → модалка (Input + Save)

📥 Экспорт CSV → скачать

Фильтры: Город (dropdown), Дата (datepicker).

Список компаний
Таблица:

text
Компания | Город | Почему подходит | Сайт | Приоритет | Статус | Действия
Кнопки:

➕ Добавить

📋 К ГИПам → таб 3

📊 Приоритеты (фильтр high/medium)

Карта ГИПов
Таблица:

text
Компания | ЛПР (роль) | Маршрут входа | Фраза | Статус | Действия
Кнопки:

⚡ Генерировать карту → Gemini

📋 Копировать маршрут

➡️ Сообщение → таб 4

Сообщения
UI:

text
[Dropdown: Выбери компанию ▼]
[4 блока шаблонов]
1. Первое касание [Копировать] [Редактировать]
2. Follow-up 1 [Копировать]
3. Follow-up 2 [Копировать]
4. "Не ко мне" [Копировать]

История: [таблица отправленных]
3. Полная структура файлов
text
GIP-pilot/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── companies.js
│   │   │   ├── gip.js
│   │   │   └── messages.js
│   │   ├── models/
│   │   │   └── db.js
│   │   ├── routes/
│   │   │   └── api.js
│   │   ├── middleware/
│   │   │   └── auth.js
│   │   └── gemini.js
│   ├── package.json
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── radar/
│   │   │   └── page.tsx
│   │   ├── companies/
│   │   │   └── page.tsx
│   │   ├── gip-map/
│   │   │   └── page.tsx
│   │   └── messages/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── button.tsx
│   │   │   ├── table.tsx
│   │   │   └── tabs.tsx
│   │   ├── DashboardTabs.tsx
│   │   ├── DataTable.tsx
│   │   └── MessageEditor.tsx
│   ├── lib/
│   │   └── api.ts
│   └── package.json
├── database/
│   └── schema.sql (готово выше)
├── nginx.conf (готово выше)
├── docker-compose.yml (готово выше)
├── deploy.sh (готово выше)
└── .env.example (готово выше)
4. Backend package.json (backend/)
json
{
  "dependencies": {
    "express": "^4.19.2",
    "@google/generative-ai": "^0.2.1",
    "pg": "^8.11.5",
    "bcryptjs": "^2.4.3",
    "jsonwebtoken": "^9.0.2",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5"
  }
}
5. Frontend package.json (frontend/)
json
{
  "dependencies": {
    "next": "14.2.1",
    "react": "^18",
    "react-dom": "^18",
    "@tanstack/react-table": "^8.17.3",
    "lucide-react": "^0.394.0",
    "class-variance-authority": "^0.7.0"
  }
}
6. Промпт для Cursor (ФИНАЛЬНЫЙ, вставь целиком)
text
Создай ПОЛНЫЙ проект GIP-pilot по ТЗ 1.3.  

**Backend (Express 3001)**:
- PostgreSQL schema.sql (готово в ТЗ)
- API: /auth/login, /companies (CRUD+Gemini), /gip-map, /messages
- @google/generative-ai
- JWT auth

**Frontend (Next.js 14, порт 3000)**:
- 4 таба shadcn/ui: Radar, Companies, GipMap, Messages
- TanStack Table v8 для всех таблиц
- MessageEditor с dropdown компания → 4 шаблона
- Responsive, Tailwind

**Структура**: как в ТЗ 1.3 (папки backend/frontend/database)
**Деплой**: docker-compose.yml, nginx.conf, deploy.sh (готово в ТЗ)
**.env.example** готов.

**Тестовые данные**: STONE, Галс, MR Group из schema.sql.

Готово к `npm run dev` и деплою на gip-pilot.duckdns.org.
7. Что осталось от тебя (3 пункта)
netstat вывод с сервера (порты).

Gemini API ключ (ai.google.dev → Create API key).

IP сервера для DuckDNS.

Время: Cursor соберёт за 2 часа → тест 30 мин → деплоем 20 мин = 3 часа всего.

Скинь 3 пункта, начинаем.

ты я вно что то упустил . в первых версях ТЗ было больше описания. Давай ты все собирешь в одно большое исчерпывающее ТЗ
Completed 1 step
ИСЧЕРПЫВАЮЩЕЕ ТЕХНИЧЕСКОЕ ЗАДАНИЕ "Пилот ГИПов" v2.0 (ВСЁ В ОДНОМ)
Дата: 18 марта 2026
Домен: gip-pilot.duckdns.org
GitHub: https://github.com/alekseidoronin/GIP-pilot.git
AI: Google Gemini API
Сервер: VPS (порты проверяем отдельно)

1. ЦЕЛЬ И НАЗНАЧЕНИЕ
Что это: Веб‑dashboard для конструкторского бюро. Управляет поиском клиентов (девелоперы/застройщики) для раздела КР по крупным объектам (БЦ, высотки).

Кто использует:

Алексей (владелец): смотрит результаты, отправляет сообщения ГИПам.

Марина (маркетолог): добавляет данные, следит за прогрессом.

Что показывает:

text
4 вкладки:
1. Радар объектов ← повод для контакта
2. Список компаний ← куда целимся
3. Карта ГИПов ← кому писать
4. Сообщения ← готовые тексты
Результат: Клиент видит “живой” инструмент, который работает и даёт реальные контакты ГИПов.

2. ТЕРМИНОЛОГИЯ
Термин	Описание
ГИП	Главный инженер проекта (ЛПР по выбору конструкторов)
КР	Раздел конструктив (услуга бюро)
Радар	Поиск поводов (тендеры/объекты)
Target‑лист	Список клиентов (девелоперы)
Карта ГИПа	Маршрут к ЛПР
ЛПР	Лицо, принимающее решение
3. АРХИТЕКТУРА (полная схема)
text
Браузер (user) → Nginx (80/443 SSL) → 
  ├── Frontend (Next.js:3000)
  └── Backend (Express:3001) → PostgreSQL (5432) → Gemini API
Поток данных:

User → Frontend → API call → Backend → Gemini → БД → Frontend.

Генерация: Backend → Gemini → результат в БД → Frontend показывает.

4. СТРУКТУРА ПРОЕКТА (полная)
text
GIP-pilot/ (GitHub root)
├── backend/                    # API сервер
│   ├── src/
│   │   ├── controllers/        # Логика
│   │   │   ├── auth.js
│   │   │   ├── companies.js
│   │   │   ├── gip.js
│   │   │   └── messages.js
│   │   ├── models/             # БД
│   │   │   └── db.js
│   │   ├── routes/             # Маршруты
│   │   │   └── api.js
│   │   ├── middleware/         # Фильтры
│   │   │   ├── auth.js
│   │   │   └── cors.js
│   │   └── gemini.js           # Gemini API
│   ├── package.json
│   ├── Dockerfile
│   └── server.js
├── frontend/                   # Веб‑приложение
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx          # Общий макет
│   │   ├── page.tsx            # Главная (табы)
│   │   ├── radar/
│   │   │   └── page.tsx
│   │   ├── companies/
│   │   │   └── page.tsx
│   │   ├── gip-map/
│   │   │   └── page.tsx
│   │   └── messages/
│   │       └── page.tsx
│   ├── components/
│   │   ├── ui/                 # shadcn компоненты
│   │   │   ├── button.tsx
│   │   │   ├── table.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── input.tsx
│   │   ├── DashboardTabs.tsx   # Навигация
│   │   ├── DataTable.tsx       # Универсальная таблица
│   │   └── MessageEditor.tsx   # Редактор сообщений
│   ├── lib/
│   │   ├── api.ts              # API вызовы
│   │   └── utils.ts            # Утилиты
│   ├── package.json
│   └── Dockerfile
├── database/
│   └── schema.sql              # Схема БД
├── nginx/
│   └── nginx.conf              # Конфиг прокси
├── docker/
│   └── docker-compose.yml      # Контейнеры
├── scripts/
│   └── deploy.sh               # Деплой
├── .env.example                # Ключи
├── README.md
└── .gitignore
5. ОПИСАНИЕ 4 КОМПОНЕНТОВ (детально)
5.1. Радар объектов
Назначение: Список поводов для контакта (тендеры, объекты, новости).

Таблица (10 колонок):

text
№ | Объект | Город | Стадия | Компании | Ссылка | Дата | Статус | Приоритет | Действия
UI элементы:

text
[Фильтр: Город ▼] [Дата от] [Дата до] [🔍 Найти]
[Таблица с сортировкой/пагинацией]
[Кнопки: 🔄 Обновить радар | ➕ Добавить | 📥 CSV | 📤 PDF]
Действия:

Обновить радар: POST /api/radar/generate → Gemini ищет объекты.

Добавить: Модалка (Input объект + Save).

API:

text
GET /api/radar?city=Москва&date_from=2026-01-01
POST /api/radar/generate {city: "Москва"}
POST /api/radar {object: "..."}
5.2. Список компаний
Назначение: Целевые девелоперы/застройщики.

Таблица:

text
№ | Компания | Город | Почему подходит | Сайт | Приоритет | Статус | Касаний | Действия
UI:

text
[Фильтр: Приоритет ▼] [Статус ▼] [🔍]
[Таблица]
[Кнопки: ➕ Добавить | 📋 К ГИПам | 📊 Статистика]
Действия:

К ГИПам: Переход в таб 3 с фильтром по компании.

Статистика: График “по приоритетам”.

API:

text
GET /api/companies?priority=high
POST /api/companies/generate {city: "Москва"}
5.3. Карта ГИПов
Назначение: Конкретные маршруты к ЛПР.

Таблица:

text
№ | Компания | ЛПР (роль) | Маршрут входа | Фраза переадресации | Статус | Действия
UI:

text
[Dropdown: Компания ▼] [🔍]
[Таблица с expandable rows]
[Кнопки: ⚡ Генерировать | 📋 Копировать маршрут | ➡️ Сообщение]
Действия:

Генерировать: Gemini → заполняет маршрут.

Копировать маршрут: Копирует в буфер “Компания + ЛПР + фраза”.

API:

text
POST /api/gip-map/generate {company: "STONE"}
5.4. Сообщения
Назначение: Готовые тексты для отправки.

UI:

text
[Dropdown: Компания ▼]
[4 шаблона, каждый в карточке]
┌ Первое касание ┐    [Редактировать] [Копировать] [Отправить]
│ Текст сообщения │
└─────────────────┘

История отправок (таблица снизу)
Шаблоны:

Первое касание (400 символов).

Follow-up 1 (250 символов).

Follow-up 2 (200 символов).

“Не ко мне” (150 символов).

API:

text
POST /api/messages/generate {company: "STONE", type: "first"}
6. АВТОРИЗАЦИЯ
Экраны:

Логин: Email + Password → JWT токен.

Регистрация: Email + Password + Role (admin/viewer).

Профиль: Смена пароля, выход.

Роли:

Admin: Всё + управление пользователями.

Viewer: Только просмотр + копирование.

7. БАЗА ДАННЫХ (schema.sql)
sql
CREATE DATABASE gip_pilot;
\c gip_pilot;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'viewer',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  city VARCHAR(100),
  why_suitable TEXT,
  website VARCHAR(500),
  priority VARCHAR(20) DEFAULT 'medium',
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE gip_routes (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  lpr_role VARCHAR(100),
  entry_route TEXT,
  redirect_phrase TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  company_id INTEGER REFERENCES companies(id),
  type VARCHAR(50), -- first, followup1, followup2, redirect
  content TEXT NOT NULL,
  sent_at TIMESTAMP,
  response TEXT,
  status VARCHAR(50) DEFAULT 'draft'
);

-- Индексы
CREATE INDEX idx_companies_priority ON companies(priority);
CREATE INDEX idx_messages_company ON messages(company_id);

-- Тестовые данные
INSERT INTO users VALUES 
(1, 'alexey@3dkonstruktiv.ru', '$2b$10$test', 'admin', NOW()),
(2, 'marina@3dkonstruktiv.ru', '$2b$10$test', 'viewer', NOW());

INSERT INTO companies VALUES 
(1, 'STONE', 'Москва', 'Офисный рынок, STONE Towers', 'https://stone.ru', 'high', 'new', NOW()),
(2, 'Галс-Девелопмент', 'Москва/СПб', 'Группа ВТБ, МФК', 'https://gals.ru', 'high', 'new', NOW()),
(3, 'MR Group', 'Москва', 'Топ-девелопер БЦ', 'https://mr-group.ru', 'high', 'new', NOW());
8. GEMINI API ИНТЕГРАЦИЯ {#gemini}
Пакет: @google/generative-ai
.env:

text
GEMINI_API_KEY=AIzaSy...your_key
backend/src/gemini.js:

js
const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generate(prompt, company = '') {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  const result = await model.generateContent(prompt);
  return result.response.text();
}

module.exports = { generate };
9. ИНТЕРФЕЙС (скриншоты словами)
text
HEADER:
[Логотип] Пилот ГИПов          [Алексей ▼] [Выход]

SIDEBAR (4 таба, вертикально):
• Радар объектов
• Список компаний  
• Карта ГИПов
• Сообщения

MAIN AREA:
[Таблица 100% ширины]
[Нижняя панель кнопок]

МОБИЛЬНЫЙ: Табы горизонтально + hamburger меню.
10. ПРОВЕРКА ПОРТОВ {#порты}
text
Выполни: sudo netstat -tulpn | grep LISTEN
Fallback:
- Frontend: 3000 → 3001
- Backend: 3001 → 8081
- Postgres: 5432 (локально)
11. .env.example (полный)
text
# Сервер
PORT=3001
NODE_ENV=production

# База
DATABASE_URL=postgresql://gip_user:gip_pass123@postgres:5432/gip_pilot

# Gemini
GEMINI_API_KEY=AIzaSy...your_key_here

# JWT
JWT_SECRET=super_secret_jwt_key_min_32_chars_long_change_this

# Frontend (NEXT_PUBLIC_)
NEXT_PUBLIC_API_URL=http://localhost:3001
12. DEPLOY (полная инструкция)
docker-compose.yml
text
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: gip_pilot
      POSTGRES_USER: gip_user
      POSTGRES_PASSWORD: gip_pass123
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      DATABASE_URL: postgresql://gip_user:gip_pass123@postgres:5432/gip_pilot
      GEMINI_API_KEY: ${GEMINI_API_KEY}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      - postgres

  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      NEXT_PUBLIC_API_URL: http://backend:3001
nginx.conf
text
server {
    listen 80;
    server_name gip-pilot.duckdns.org;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name gip-pilot.duckdns.org;

    ssl_certificate /etc/letsencrypt/live/gip-pilot.duckdns.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/gip-pilot.duckdns.org/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
deploy.sh
bash
#!/bin/bash
set -e

echo "🔄 Pull latest code"
git pull origin main

echo "🐳 Stop containers"
docker-compose down

echo "🔨 Rebuild & start"
docker-compose up -d --build

echo "🌐 Nginx test"
sudo nginx -t && sudo systemctl reload nginx

echo "🔒 SSL renew check"
sudo certbot renew --dry-run

echo "✅ Deploy complete!"
echo "🌍 Frontend: https://gip-pilot.duckdns.org"
echo "🔧 Backend: http://localhost:3001"
13. Cursor промпт (ФИНАЛЬНЫЙ)
text
Создай ПОЛНЫЙ проект GIP-pilot v2.0 по ТЗ выше.

**Технические детали**:
- Backend: Node.js 20 + Express (порт 3001) + @google/generative-ai
- Frontend: Next.js 14 + React 18 + TypeScript (порт 3000)
- UI: shadcn/ui + Tailwind + TanStack Table v8
- БД: PostgreSQL schema.sql (готово в ТЗ)
- Auth: JWT + bcrypt
- Домен: gip-pilot.duckdns.org

**Структура папок**: ТОЧНО как в ТЗ 1.3 (backend/frontend/database/nginx/docker)

**API endpoints**:
- POST /api/auth/login (email/pass → JWT)
- GET/POST /api/companies (CRUD + Gemini generate)
- GET/POST /api/gip-map (CRUD + Gemini)
- GET/POST /api/messages (CRUD + Gemini generate)

**Frontend 4 таба** (shadcn Tabs):
1. Radar: таблица объектов + кнопка "Обновить радар"
2. Companies: таблица + "К ГИПам"
3. GipMap: таблица + "Генерировать карту" + "Копировать"
4. Messages: dropdown компания → 4 шаблона + кнопки "Генерировать/Копировать"

**Файлы из ТЗ** (готовые):
- docker-compose.yml
- nginx.conf
- schema.sql
- .env.example
- deploy.sh

**Тестовые данные**: STONE, Галс, MR Group.

Готово к `npm run dev` и `./deploy.sh`.


**Раздел 14. НАСТРОЙКА SSH ДЛЯ АВТОМАТИЧЕСКОГО ДОСТУПА ИЗ CURSOR {#ssh}**

**Зайди на сервер:** ssh debian@144.217.12.20
В терминале НА СЕРВЕРЕ (debian@vps-39eb0606:~$) выполните одну строку (скопируй целиком, вставьте, Enter):
mkdir -p ~/.ssh && echo 'ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIPxwtYdkgwYjyQYLbu7sV7j1b/K4BUXWg9iKYqcTT5F5 alekseidoronin@mac-vps' >> ~/.ssh/authorized_keys && chmod 700 ~/.ssh && chmod 600 ~/.ssh/authorized_keys && echo Done.

**Проверь:**
tail ~/.ssh/authorized_keys
Должно показать добавленный ключ.

**После настройки (для деплоя GIP-pilot)**
Ты можешь выполнять команды:
ssh debian@144.217.12.20 'cd /path/to/GIP-pilot && git pull && docker-compose up -d --build && sudo nginx -t && sudo systemctl reload nginx'

Путь проекта на сервере
/opt/GIP-pilot  # Рекомендую создать здесь

**Дальше:**
mkdir -p /opt/GIP-pilot && cd /opt/GIP-pilot
git clone https://github.com/alekseidoronin/GIP-pilot.git .
./deploy.sh

