# 📋 Deployment Checklist for Towbotics

## Pre-Deployment

- [ ] Test locally - both frontend and backend running
- [ ] Verify API connection works (check status badge on landing page)
- [ ] Commit all changes to GitHub
- [ ] Push to GitHub repository

---

## Railway (Backend) Deployment

### Setup
- [ ] Create new project on Railway
- [ ] Connect GitHub repository
- [ ] **Set root directory: `backend`**
- [ ] Set start command: `npm start` (should be automatic)

### Environment Variables
- [ ] `PORT` = `8000`
- [ ] `NODE_ENV` = `production`
- [ ] `FRONTEND_URL` = `https://your-app.vercel.app` (add after Vercel deployment)

### Verify
- [ ] Deployment successful
- [ ] Copy Railway URL (e.g., `https://towbotics.up.railway.app`)
- [ ] Test health endpoint: `https://your-railway-url.railway.app/health`
- [ ] Test API endpoint: `https://your-railway-url.railway.app/api/status`

---

## Vercel (Frontend) Deployment

### Setup
- [ ] Create new project on Vercel
- [ ] Import GitHub repository
- [ ] **Set root directory: `frontend`**
- [ ] Framework preset: Vite (should auto-detect)

### Environment Variables
- [ ] `VITE_API_URL` = `https://your-railway-url.railway.app/api`

### Verify
- [ ] Deployment successful
- [ ] Copy Vercel URL (e.g., `https://towbotics.vercel.app`)
- [ ] Visit the URL - landing page should load
- [ ] Check API status badge - should show "✅ Connected"

---

## Post-Deployment

### Update Backend CORS
- [ ] Go back to Railway project
- [ ] Update `FRONTEND_URL` to your Vercel URL
- [ ] Redeploy (or it will auto-redeploy)

### Update README
- [ ] Update live URLs in README.md:
  - Frontend: `https://your-app.vercel.app`
  - Backend: `https://your-app.railway.app`
- [ ] Commit and push changes

### Final Testing
- [ ] Visit production site
- [ ] Verify all features work:
  - [ ] Landing page loads correctly
  - [ ] API status shows connected
  - [ ] Buttons are clickable (even if not functional yet)
  - [ ] Responsive design works on mobile
- [ ] Test on different browsers
- [ ] Test on mobile device

---

## Optional Enhancements

- [ ] Add custom domain to Vercel
- [ ] Add custom domain to Railway
- [ ] Set up analytics (Google Analytics, Plausible, etc.)
- [ ] Add monitoring (Railway has built-in metrics)
- [ ] Set up error tracking (Sentry, LogRocket, etc.)

---

## Future: Stripe Integration

When ready to add payments:
- [ ] Create Stripe account
- [ ] Get API keys (test mode first)
- [ ] Install `stripe` package in backend
- [ ] Add Stripe environment variables
- [ ] Implement checkout flow
- [ ] Test with Stripe test cards
- [ ] Switch to production keys

---

## Troubleshooting

**Frontend can't connect to backend?**
1. Check CORS settings in Railway
2. Verify `FRONTEND_URL` matches your Vercel URL exactly
3. Verify `VITE_API_URL` in Vercel matches Railway URL + `/api`

**Build failing on Railway?**
1. Check root directory is set to `backend`
2. Verify `package.json` has correct start script
3. Check logs for specific errors

**Build failing on Vercel?**
1. Check root directory is set to `frontend`
2. Verify all dependencies are in `package.json`
3. Check build logs for specific errors

---

✅ **Ready to deploy!** Follow this checklist step by step.
