# DEVIL DON OFFICIAL

Modern mobile-friendly APK selling website built with Next.js, Firebase Firestore, Firebase Storage, manual UPI QR payment, and Vercel-ready environment variables.

## Pages

- `/` home page with hero, featured pricing cards, features, and footer.
- `/buy` customer payment form with plan selection and screenshot upload.
- `/status` customer lookup by WhatsApp number with approved-only key and APK download access.
- `/admin` password screen plus dashboard for QR upload, UPI ID, order review, approve/reject, activation key, APK link, search, and delete.

## Setup

1. Copy `.env.example` to `.env.local`.
2. Fill in the Firebase web app values and set `NEXT_PUBLIC_ADMIN_PASSWORD`.
3. In Firebase, create Firestore and Storage.
4. Run locally:

```bash
npm install
npm run dev
```

5. Deploy to Vercel and add the same environment variables in Vercel project settings.

## Firestore Collections

- `orders`
  - `customerName`
  - `whatsappNumber`
  - `plan`
  - `paymentScreenshot`
  - `status`
  - `activationKey`
  - `apkDownloadLink`
  - `createdTime`
- `settings/payment`
  - `qrCodeUrl`
  - `upiId`

## Production Note

This starter uses a simple admin password gate for the dashboard UI. For a production store, protect admin writes with Firebase Auth custom claims and Firestore/Storage security rules.
