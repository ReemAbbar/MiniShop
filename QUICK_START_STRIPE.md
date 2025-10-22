# 🚀 Quick Start: Stripe Payment Integration

## ✅ What's Been Set Up

### 📦 Packages Installed
- `stripe` (server-side)
- `@stripe/stripe-js` (client-side)

### 📁 Files Created

1. **`.env.local`** - Your API keys go here (already created)
2. **`.env.example`** - Template file for team members
3. **`lib/stripe.js`** - Stripe client configuration
4. **`app/api/checkout/route.js`** - Server-side checkout endpoint
5. **`app/success/page.js`** - Success page after payment
6. **`app/cart/page.js`** - Updated with Stripe checkout button

---

## 🔑 Next Steps: Add Your API Keys

### 1. Get Your Keys from Stripe

Visit: https://dashboard.stripe.com/test/apikeys

You'll find:
- **Publishable Key**: `pk_test_...`
- **Secret Key**: `sk_test_...`

### 2. Add Keys to `.env.local`

Open the `.env.local` file and replace the placeholders:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### 3. Restart Your Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

---

## 🧪 Test the Integration

### Test Card Numbers

| Card | Purpose |
|------|---------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |

**Other details:**
- Expiry: Any future date (e.g., `12/34`)
- CVC: Any 3 digits (e.g., `123`)
- ZIP: Any 5 digits (e.g., `12345`)

### Test Flow

1. ✅ Add items to cart
2. ✅ Click "Proceed to Checkout"
3. ✅ Enter test card: `4242 4242 4242 4242`
4. ✅ Complete payment
5. ✅ See success page
6. ✅ Cart automatically cleared

---

## 📖 Documentation

Full guide: **`STRIPE_SETUP.md`**

---

## ⚠️ Security Reminders

- ✅ `.env.local` is already in `.gitignore`
- ❌ Never commit your secret keys
- ✅ Always use test keys in development
- ✅ Switch to live keys only in production

---

## 🆘 Troubleshooting

**Checkout button not working?**
1. Check console for errors
2. Verify keys in `.env.local`
3. Restart dev server

**Still having issues?**
- Check `STRIPE_SETUP.md` for detailed troubleshooting
- Review Stripe Dashboard for errors
- Check server console for API errors

---

## 🎉 You're Ready!

Just add your API keys and start testing! 🚀
