# Stripe Integration Setup Guide

This guide will help you set up Stripe payments for your Mini Shop application.

## Prerequisites

- A Stripe account (sign up at https://stripe.com)
- Node.js and npm installed

## Packages Installed

The following packages have been installed:
- `stripe` - Server-side Stripe SDK
- `@stripe/stripe-js` - Client-side Stripe SDK

## Setup Instructions

### 1. Get Your Stripe API Keys

1. Log in to your Stripe Dashboard: https://dashboard.stripe.com
2. Navigate to **Developers** → **API keys**
3. You'll see two types of keys:
   - **Publishable key** (starts with `pk_test_`) - Safe to use in client-side code
   - **Secret key** (starts with `sk_test_`) - Must be kept secret, used server-side only

### 2. Configure Environment Variables

1. Open the `.env.local` file in the root directory
2. Add your Stripe keys:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

⚠️ **Important**: 
- Never commit `.env.local` to version control
- The `.env.example` file is provided as a template
- Keep your secret key confidential

### 3. Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Add items to your cart
3. Click "Proceed to Checkout"
4. You'll be redirected to Stripe's checkout page
5. Use Stripe's test card numbers:
   - **Success**: `4242 4242 4242 4242`
   - **Declined**: `4000 0000 0000 0002`
   - Use any future expiry date and any CVC

### 4. Test Card Numbers

For testing, use these card numbers:

| Card Number | Description |
|-------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |
| 4000 0025 0000 3155 | 3D Secure required |

- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

## File Structure

```
mini-inventory-tracker/
├── .env.local              # Your API keys (DO NOT COMMIT)
├── .env.example            # Template for environment variables
├── lib/
│   └── stripe.js          # Stripe client configuration
├── app/
│   ├── api/
│   │   └── checkout/
│   │       └── route.js   # Server-side checkout API
│   ├── cart/
│   │   └── page.js        # Cart page with checkout button
│   └── success/
│       └── page.js        # Payment success page
```

## How It Works

1. **Cart Page**: User clicks "Proceed to Checkout"
2. **API Call**: Frontend sends cart items to `/api/checkout`
3. **Stripe Session**: Backend creates a Stripe Checkout Session
4. **Redirect**: User is redirected to Stripe's hosted checkout page
5. **Payment**: User completes payment securely on Stripe
6. **Success**: User is redirected back to `/success` page
7. **Cart Cleared**: Cart is automatically cleared after successful payment

## Going to Production

When you're ready to go live:

1. Switch to **Live Mode** in your Stripe Dashboard
2. Get your **live** API keys (they start with `pk_live_` and `sk_live_`)
3. Update your `.env.local` with live keys:
```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key
```

4. Set up webhooks (optional but recommended):
   - Go to Stripe Dashboard → Developers → Webhooks
   - Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
   - Add webhook secret to `.env.local`:
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
   ```

## Important Security Notes

- ✅ Publishable keys (`NEXT_PUBLIC_*`) are safe to expose in client-side code
- ❌ Secret keys must NEVER be exposed in client-side code
- ❌ Never commit `.env.local` to Git
- ✅ Always use HTTPS in production
- ✅ Validate data on the server before creating charges

## Troubleshooting

### "Invalid API Key" Error
- Make sure your API keys are correctly copied
- Check that there are no extra spaces or quotes
- Ensure you're using test keys in development

### Checkout Button Not Working
- Check the browser console for errors
- Verify your publishable key is set in `.env.local`
- Make sure the development server was restarted after adding env variables

### Redirect Not Working
- Check that your success/cancel URLs are correct
- Ensure the origin header is being passed correctly

## Resources

- [Stripe Documentation](https://docs.stripe.com)
- [Stripe Testing Guide](https://docs.stripe.com/testing)
- [Stripe Checkout](https://docs.stripe.com/payments/checkout)
- [Stripe Dashboard](https://dashboard.stripe.com)

## Support

If you encounter issues:
1. Check the [Stripe Documentation](https://docs.stripe.com)
2. Review error messages in the browser console
3. Check server logs for API errors
4. Contact [Stripe Support](https://support.stripe.com)
