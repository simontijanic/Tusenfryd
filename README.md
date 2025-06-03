# Tusenfryd Nettapplikasjon – Teknisk Dokumentasjon

## Innhold
- [Oversikt](#oversikt)
- [Datamodell](#datamodell)
- [API-endepunkter](#api-endepunkter)
- [Struktur](#struktur)
- [Eksempel på API-respons](#eksempel-på-api-respons)

---

## Oversikt
Tusenfryd skal modernisere infrastrukturen og brukersystemet for både ansatte og gjester.
Du er leid inn som utvikler og driftstekniker og skal utvikle en nettbasert applikasjon samt
sette opp nettverksinfrastruktur og drift, med sikker tilgangskontroll og dokumentasjon.

**Hovedfunksjoner:**
- Se og søke etter attraksjoner
- Reservasjonssystem med kølogikk
- Adminpanel for CRUD på attraksjoner, endre åpningstider, se reservasjoner
- System for varsling når attraksjoner er stengt
- (Bonus) Intern chat for ansatte

---

## Datamodell

### Attraction
```json
{
  "_id": "ObjectId",
  "name": "Thundercoaster",
  "description": "En heftig berg-og-dal-bane...",
  "openingTime": "10:00",
  "closingTime": "18:00",
  "waitTime": 15,
  "isOpen": true,
  "queueCapacity": 20,
  "queue": ["user1", "user2"]
}
```

### User
```json
{
  "_id": "ObjectId",
  "username": "admin",
  "password": "<hashed>",
  "role": "admin" // eller "user"
}
```

### Reservation
```json
{
  "_id": "ObjectId",
  "attraction": "ObjectId",
  "user": "brukernavn",
  "reservationTime": "2025-06-03T10:00:00.000Z"
}
```

---

## API-endepunkter

Alle API-endepunkter følger REST-prinsipper og returnerer JSON.

### Attraksjoner
- **GET /api/attractions**
  - Hent alle attraksjoner
- **GET /api/attractions/:id**
  - Hent én attraksjon
- **POST /api/attractions** *(krever innlogging)*
  - Opprett ny attraksjon
  - Body: `{ "name": "string", "description": "string", ... }`
- **PUT /api/attractions/:id** *(krever innlogging)*
  - Oppdater attraksjon
- **DELETE /api/attractions/:id** *(krever innlogging)*
  - Slett attraksjon

### Autentisering
- **POST /api/auth/login**
  - Logg inn bruker/admin
  - Body: `{ "username": "string", "password": "string" }`
- **POST /api/auth/logout**
  - Logg ut

### Reservasjon
- **POST /reserve/:id**
  - Reserver plass i kø for attraksjon (må være innlogget)

---

## Struktur

```
Tusenfryd/
├── index.js
├── config/
│   └── databse.js
├── controllers/
│   └── pageController.js
├── handlers/
│   ├── attractionHandler.js
│   └── authHandler.js
├── middleware/
│   ├── errorHandler.js
│   └── notFoundHandler.js
├── models/
│   ├── Attraction.js
│   ├── Reservation.js
│   ├── User.js
│   └── AdminMessage.js
├── routes/
│   ├── attractionRoutes.js
│   ├── authRoutes.js
│   └── pageRoutes.js
├── utils/
│   └── isAdmin.js
├── views/
│   ├── partials/
│   └── ...
├── public/
│   └── ...
└── seed.js
```

---

## Eksempel på API-respons

**GET /api/attractions**
```json
[
  {
    "_id": "665d1f...",
    "name": "Thundercoaster",
    "description": "En heftig berg-og-dal-bane...",
    "openingTime": "10:00",
    "closingTime": "18:00",
    "waitTime": 15,
    "isOpen": true,
    "queueCapacity": 20,
    "queue": ["user1", "user2"]
  },
  ...
]
```

**POST /api/auth/login**
```json
{
  "success": true,
  "message": "Innlogging vellykket"
}
```

**POST /api/attractions**
```json
{
  "_id": "665d1f...",
  "name": "SpinSpider",
  "description": "En gigantisk pendel...",
  ...
}
```

---

## Feilhåndtering
- Alle feil logges til konsoll og vises som flash-meldinger i frontend.
- 404-sider og generelle feil har egne visninger.

