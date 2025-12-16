# Productr

Full-stack OTP login + product dashboard demo. Frontend in Vue 3 + Vite with client-side product management and modal forms. Backend in Express for OTP email sending/verification.

## Structure
- `frontend/` Vue 3 + Vite app (TypeScript).
- `backend/` Express server with EJS views and Nodemailer OTP flow.

## Prerequisites
- Node.js 18+ and npm.
- Gmail SMTP credentials (or other SMTP) for OTP email in backend.

## Backend setup
```bash
cd backend
npm install
```

Create `.env` in `backend/`:
```env
My_Email=you@gmail.com
My_Password=app_password_here
PORT=8080
```

Run backend:
```bash
npm run dev   # or: npm start
```

## Frontend setup
```bash
cd frontend
npm install
npm run dev
```

Frontend dev server defaults to Vite’s port (e.g., 5173).

## Frontend behavior
- Landing on `/` redirects to `/login` (email/OTP mock). Success routes to `/app/home`.
- Sidebar + topbar persist; main area swaps Home/Products.
- Home: empty state with “Add your Products” button that opens modal.
- Products: grid of product cards showing image, type, quantities, pricing, exchange flag, URL, and publish/delete actions. Client-side store (no API persistence).
- Add Product modal: validation, image picker with preview, required fields (name, type, qty, MRP, selling price, image, total images, product URL, exchange flag).

## Notes
- Product data is in-memory only (lost on reload). Wire to an API as needed.
- OTP flow is backend-only; front-end login is mocked (no session).
- Image uploads are stored as data URLs in memory; replace with real uploads if persisting.

## Scripts
- Backend: `npm run dev` (nodemon), `npm start`.
- Frontend: `npm run dev`, `npm run build`, `npm run preview`.
