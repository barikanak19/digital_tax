# Digital Tax Filing Support for Small Businesses

A full-stack web application that helps small business owners understand digital tax-related
processes — what a service is for, who it applies to, what it costs, what documents are needed,
and how to complete it on the correct official government portal.

> **Important:** This platform is a guidance and awareness tool. It does **not** replace any
> official government portal. All actual filing, registration, or payment must be completed on the
> relevant official portal. This platform never asks for OTPs, government portal passwords, bank
> passwords, UPI PINs, or card PINs.

---

## 1. Project Overview

- **Frontend:** React + Vite (JavaScript), React Router, plain CSS
- **Backend:** Node.js + Express.js, REST API, JWT auth, bcryptjs password hashing
- **Database:** MySQL (InnoDB, UTF-8)
- **Tools:** Postman collection included, Git-friendly `.gitignore`

## 2. Features

- User registration & login (JWT-based), with login activity tracking
- 20 structured tax service guides, each with:
  introduction, purpose, eligibility, charges, documents checklist, official portal link,
  8-step how-to guide, 3 guide images (intro/middle/final), FAQs, and safety tips
- Dashboard with search and quick-access shortcuts
- Tax Calendar, general FAQs, Safety page
- Feedback and Contact-for-more-information forms
- Full Admin Panel: dashboard stats, users, login activity, service/step/FAQ/tax-calendar CRUD,
  feedback viewing, contact request management
- Backend-enforced authorization — normal users cannot access admin endpoints, regardless of
  frontend routing
- Fully responsive: mobile (hamburger nav), tablet, desktop, large screens

## 3. Technology Stack

| Layer      | Technology |
|------------|------------|
| Frontend   | React 18, Vite, React Router 6, CSS |
| Backend    | Node.js, Express 4, JWT (`jsonwebtoken`), `bcryptjs` |
| Database   | MySQL 8 (InnoDB) via `mysql2` |
| Dev tools  | nodemon, Postman |

## 4. Folder Structure

```
digital-tax-support/
├── backend/
│   ├── src/
│   │   ├── config/db.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── validators/
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── assets/{services,images}/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── admin/
│   │   ├── services/        (API client functions)
│   │   ├── context/         (AuthContext, ProtectedRoute)
│   │   ├── data/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── package.json
├── database/
│   ├── schema.sql
│   ├── generate-seed.js     (source of truth for seed content)
│   └── seed.sql             (generated — do not hand-edit, edit generate-seed.js instead)
└── postman/
    └── Digital-Tax-Support.postman_collection.json
```

## 5. Prerequisites

- Node.js 18+
- MySQL 8+ (or MariaDB 10.6+)
- npm

## 6. MySQL Setup

1. Start MySQL and log in as a user with permission to create databases.
2. Run the schema:
   ```bash
   mysql -u root -p < database/schema.sql
   ```
   This creates the `digital_tax_support` database and all 9 tables.
3. Seed the database:
   ```bash
   mysql -u root -p < database/seed.sql
   ```
   This inserts the admin user, a demo user, all 20 services (with documents, steps, and FAQs),
   general FAQs, and sample tax calendar entries.

   > If you ever change `database/generate-seed.js`, regenerate `seed.sql` with:
   > `node database/generate-seed.js` (run from inside the `database/` folder).

### Default accounts (change immediately after first login)

| Role  | Email | Password |
|-------|-------|----------|
| Admin | `admin@digitaltaxsupport.local` | `ChangeMe@123` |
| User  | `demo.user@digitaltaxsupport.local` | `Demo@1234` |

Both passwords are stored as real bcrypt hashes in `seed.sql` — never in plaintext.

## 7. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env`:

```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=digital_tax_support
JWT_SECRET=replace_this_with_a_long_random_secret_string
JWT_EXPIRES_IN=7d
FRONTEND_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev     # nodemon, auto-restart
# or
npm start       # plain node
```

The API runs at **http://localhost:5000**. Health check: `GET /api/health`.

## 8. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Edit `.env` if your backend runs on a different host/port:

```
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

The app runs at **http://localhost:5173**.

## 9. Environment Variables Summary

**backend/.env**

| Variable | Description |
|---|---|
| `PORT` | Backend server port |
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | MySQL connection |
| `JWT_SECRET` | Secret used to sign JWTs — use a long random string |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `FRONTEND_URL` | Allowed CORS origin |

**frontend/.env**

| Variable | Description |
|---|---|
| `VITE_API_URL` | Base URL the frontend calls for the API |

## 10. API Overview

All responses follow a consistent shape:

```json
{ "success": true, "message": "...", "data": { } }
{ "success": false, "message": "..." }
```

| Area | Endpoints |
|---|---|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `POST /api/auth/logout`, `GET /api/auth/me` |
| Services | `GET /api/services`, `GET /api/services/:id`, `GET /api/services/:id/documents`, `GET /api/services/:id/steps`, `GET /api/services/:id/faqs` |
| FAQs / Calendar | `GET /api/faqs`, `GET /api/tax-calendar` |
| Feedback / Contact | `POST /api/feedback` (auth), `POST /api/contact` |
| Admin | `GET /api/admin/dashboard`, `/api/admin/users`, `/api/admin/login-activity`, full CRUD under `/api/admin/services`, `/api/admin/steps`, `/api/admin/faqs`, `/api/admin/tax-calendar`, plus `/api/admin/feedback` and `/api/admin/contact-requests` |

All `/api/admin/*` routes require a valid JWT **and** `role = admin`, enforced in
`middleware/authenticateToken.js` and `middleware/requireAdmin.js` — not just hidden in the UI.

See `postman/Digital-Tax-Support.postman_collection.json` for a ready-to-import request set.

## 11. Admin Login Setup

1. Seed the database (creates the admin account above).
2. Go to `/admin/login` in the frontend, or use the "Admin Login" flow.
3. Log in with the seeded admin email/password.
4. **Change the admin password immediately** — there is currently no in-app "change password"
   flow in this initial build; update it directly via a new bcrypt hash in the database, e.g.:
   ```js
   const bcrypt = require('bcryptjs');
   bcrypt.hashSync('YourNewStrongPassword', 10); // then UPDATE users SET password_hash = '...' WHERE email = 'admin@digitaltaxsupport.local';
   ```

## 12. Image Asset Setup

Every service has exactly **3 guide images**: intro, middle, final. Paths are already wired into
the database and components — you only need to **add the files** with the exact names below.

```
frontend/src/assets/services/income-tax/
  income_tax_intro.png
  income_tax_middle.png
  income_tax_final.png

frontend/src/assets/services/gst-registration/
  gst_registration_intro.png
  gst_registration_middle.png
  gst_registration_final.png

... (same pattern for all 20 services — folder names match database/generate-seed.js "folder" field)
```

Until an image is added, the UI shows a clean placeholder ("Image coming soon") — nothing breaks.
Once you drop in a correctly named file, it appears automatically (Vite's `import.meta.glob`
picks it up, see `frontend/src/components/ServiceImage.jsx`).

**Transparent illustration images** (login, register, homepage, etc.) go here:

```
frontend/src/assets/images/login/login_tax.png
frontend/src/assets/images/register/register_tax.png
frontend/src/assets/images/backgrounds/tax_document.png
```

Keep these transparent PNGs — the CSS (`.tax-illustration`) never adds a boxed background and
preserves aspect ratio.

## 13. How to Replace Service Images

1. Create/export your image as PNG.
2. Name it exactly as specified in `database/generate-seed.js` (search for the service's `folder`
   field) — e.g. `gst_registration_intro.png`.
3. Place it in `frontend/src/assets/services/<folder>/`.
4. Restart the Vite dev server if it doesn't hot-reload automatically.

## 14. Troubleshooting

| Problem | Fix |
|---|---|
| Backend logs `ECONNREFUSED 127.0.0.1:3306` | MySQL isn't running, or `.env` DB values are wrong. |
| `403 Access denied` on admin routes | Your account's `role` isn't `admin` in the `users` table. |
| CORS error in browser console | Check `FRONTEND_URL` in `backend/.env` matches your frontend's actual origin. |
| Images not appearing | Confirm exact filename/path match (case-sensitive) inside the correct service folder. |
| `seed.sql` out of date after editing services | Re-run `node database/generate-seed.js`, then re-import `seed.sql`. |
| Login works but admin panel redirects to `/` | The logged-in account's role is `user`, not `admin`. |

## 15. Final Checklist

- [x] React frontend builds and runs
- [x] Node/Express backend boots and connects to MySQL
- [x] MySQL schema + seed data for all 20 services
- [x] Register / Login / JWT / bcrypt hashing
- [x] Login activity recorded per successful login
- [x] Admin authentication + backend-enforced authorization
- [x] All 20 services with full structured content (intro → safety tips)
- [x] 3-image system per service, with graceful placeholders
- [x] Service search, tax calendar, FAQs, safety page
- [x] Feedback and Contact forms (validated)
- [x] Responsive layout (mobile hamburger nav, tablet/desktop grids)
- [x] Full Admin Panel (users, login activity, services/steps/FAQs/calendar CRUD, feedback,
      contact requests)
- [x] Centralized API error handling and consistent response format
- [x] `.env.example` for both frontend and backend
- [x] Postman collection

---

**Note on content accuracy:** Official portal URLs, fees, and due dates in the seed data are
either verified public government portals or clearly marked placeholders/samples. Always verify
current fees, deadlines, and eligibility rules on the official portal before taking action — this
platform is guidance only.
