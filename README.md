# PayWave — Digital Wallet Frontend

A production-minded, role-based frontend for a Digital Wallet System built with React, TypeScript, Redux Toolkit & RTK Query, Tailwind CSS and Shadcn ui. 

---

## Project Summary

**PayWave** is a secure, responsive single-page application that mirrors real-world digital wallet functionality (like bKash/Nagad). It supports three roles (User, Agent, Admin) and integrates with a RESTful backend for authentication and wallet operations. The UI emphasizes accessibility, performance, and a polished UX.

**Key highlights**

- Role-based dashboards (User / Agent / Admin)
- JWT-based authentication with persisted login
- RTK Query for API integration and caching
- Guided onboarding tour (react-joyride) with "run once" behavior
- Dark / Light theme toggle and responsive layout
- Charts, tables, toasts, skeleton loaders, and accessible forms

---

## What I implemented

- Public landing: Home, About, Features, Contact, FAQ (responsive)
- Authentication: Register (role), Login, JWT persistence, Logout
- User Dashboard: Balance,deposit/cash out/send money flows, transaction history with filtering & pagination
- Agent Dashboard: cash-in operations, transaction handling
- Admin Dashboard: user/agent management, system analytics, transaction search & filters
- State & API: Redux Toolkit + RTK Query, error handling
- UX polish: Toast notifications, guided tour (5+ steps), skeleton loaders, smooth transitions
- Theme: Light/Dark modes and accessible color contrast

---

## Live & Repo Links

- **Frontend (Live URL):** [https://digital-wallet-system-frontend-xi.vercel.app](https://digital-wallet-system-frontend-xi.vercel.app)
- **Backend (Live URL):** [https://digital-wallet-system-backend-gamma.vercel.app](https://digital-wallet-system-backend-gamma.vercel.app/api/v1)
- **Frontend Repo:** [https://github.com/emonpappu17/digital-wallet-system-frontend](https://github.com/emonpappu17/digital-wallet-system-frontend)
- **Backend Repo:** [https://github.com/emonpappu17/digital-wallet-system-backend](https://github.com/emonpappu17/digital-wallet-system-backend)

---

## Tech Stack

**Frontend**

- React (v19) + TypeScript
- React Router
- Redux Toolkit + RTK Query
- Tailwind CSS + Shadcn ui
- react-joyride (guided tour), react-hook-form + Zod (validation)
- recharts (charts) with shadcn ui

**Backend (integrated)**

- Node.js + Express
- MongoDB + Mongoose
- JWT for auth, bcrypt for password hashing

---

## Environment Variables

Create a `.env` file in the frontend root with the following keys:

```
VITE_API_BASE_URL=https://your-backend.example.com
```

**Backend required envs** (documented in backend README): `MONGO_URI`, `JWT_SECRET`, etc.

---

## Local Setup (Frontend)

1. Clone the repo:
    
    ```bash
    git clone https://github.com/emonpappu17/digital-wallet-system-frontend.git
    cd paywave-frontend
    ```
    
2. Install dependencies:
    
    ```bash
    pnpm install
    # or npm install / yarn install
    
    ```
    
3. Add `.env` (see Environment Variables)
4. Run dev server:
    
    ```bash
    pnpm dev
    # or npm run dev
    ```
    
5. Build for production:
    
    ```bash
    pnpm build
    ```
    

---

## API Integration

- All API calls are defined using **RTK Query** with axios`.
- Authentication flow:
    - Login/Registration endpoints return a JWT with accessToken refreshToken (role, id).
    - JWT saved to cookie  and attached to **withCredentials: true** for secured requests.
    - RTK Query baseQuery injects token and handles 500 refresh or sign-out.
- Error handling is centralized — toasts display API errors automatically.

---

## Role-based Routing & Guards

- Routes use a **withAuth** guard plus  wrapper to allow only permitted roles.
- After login, users are redirected to `/user`, agents to `/agent`, and admins to `/admin`.
- Unauthorized access returns a friendly message.

---

## Key Features & UX

**Public**

- Sticky navbar, hero CTA, responsive layout, contact form (simulated submission), FAQ accordion.

**User**

- Wallet overview, quick actions, send/deposit/cash in flows, search users, transaction history with filters & pagination, profile update.

**Agent**

- Cash-in interface, customer search, transaction handling, commission view, history & filters.

**Admin**

- Overview cards (total users, agents, volume), user/agent management (block/unblock, approve/suspend), full transaction table with advanced filters.

**General UX**

- Skeleton loaders, form validations via Zod, toast notifications, accessible form labels, keyboard navigable modals, responsive breakpoints.

---

## Guided Tour (Onboarding)

- Implemented with `react-joyride` and runs once per new user (flag saved in `localStorage`).
- Steps include:
    1. Navigation menu
    2. Dashboard home
    3. Transactions search/filter
    4. Profile & settings
- Users can restart the tour from Settings.

---

## Credentials

**Test Credentials**

- **Admin** — **jhankarmahbub@gmail.com** / **12345678**
- **Agent** — **luka@gmail.com** / **12345678**
- **User** — **neymar@gmail.com** / **12345678**

> Replace the above credentials with seeded accounts and test the site
> 

---

## Known Issues & Notes

- If you encounter CORS errors, ensure the backend `CORS` settings allow the frontend origin.
- For production, rotate JWT secret and set secure cookie.

---