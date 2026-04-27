# Blog API

REST API dla bloga osobistego, zbudowane w NestJS z Prisma ORM i JWT autoryzacją.

## Stack

- **NestJS** — framework backendowy
- **Prisma** — ORM + migracje bazy danych
- **JWT + Passport** — autoryzacja
- **bcrypt** — hashowanie haseł

## Struktura projektu

```
src/
├── features/
│   ├── auth/               # Autoryzacja (login, JWT)
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── jwt-auth.guard.ts
│   │   └── jwt.strategy.ts
│   ├── posts/              # CRUD postów
│   │   ├── create-post.dto.ts
│   │   ├── update-post.dto.ts
│   │   ├── posts.controller.ts
│   │   ├── posts.module.ts
│   │   └── posts.service.ts
│   └── users/              # CRUD userów
│       ├── create-user.dto.ts
│       ├── users.controller.ts
│       ├── users.module.ts
│       └── users.service.ts
├── prisma/
│   ├── prisma.module.ts
│   └── prisma.service.ts
├── app.module.ts
└── main.ts
```

## Instalacja

```bash
pnpm install
```

Stwórz plik `.env`:

```env
DATABASE_URL="twój connection string"
JWT_SECRET="twój sekretny klucz"
```

Uruchom migracje:

```bash
npx prisma migrate dev
```

Uruchom serwer:

```bash
pnpm run start:dev
```

## Endpointy

### Auth

| Metoda | Endpoint      | Opis                        | Chroniony |
| ------ | ------------- | --------------------------- | --------- |
| POST   | `/auth/login` | Logowanie, zwraca JWT token | ❌        |

### Posts

| Metoda | Endpoint     | Opis                    | Chroniony |
| ------ | ------------ | ----------------------- | --------- |
| GET    | `/posts`     | Lista wszystkich postów | ❌        |
| GET    | `/posts/:id` | Pojedynczy post         | ❌        |
| POST   | `/posts`     | Stwórz post             | ✅        |
| PATCH  | `/posts/:id` | Zaktualizuj post        | ✅        |
| DELETE | `/posts/:id` | Usuń post               | ✅        |

### Users

| Metoda | Endpoint     | Opis            | Chroniony |
| ------ | ------------ | --------------- | --------- |
| GET    | `/users`     | Lista userów    | ❌        |
| GET    | `/users/:id` | Pojedynczy user | ❌        |
| POST   | `/users`     | Stwórz usera    | ❌        |

## Autoryzacja

API używa JWT Bearer tokenów. Po zalogowaniu dołącz token do każdego chronionego requestu:

```
Authorization: Bearer <twój_token>
```

Token wygasa po 7 dniach.

TODO

- [ ] updateUser / deleteUser — domknięcie CRUD na userach
- [ ] paginacja w getPosts
- [ ] globalny ExceptionFilter — spójne błędy w całym API
- [ ] tagi / kategorie do postów
