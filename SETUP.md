# 🚀 Towbotics Setup Guide

## Quick Start (Local Development)

### 1️⃣ Setup Backend

```bash
cd backend
npm install
cp env.example .env
npm run dev
```

✅ Backend should be running on `http://localhost:8000`

---

### 2️⃣ Setup Frontend (New Terminal)

```bash
cd frontend
npm install
cp env.example .env.local
npm run dev
```

✅ Frontend should be running on `http://localhost:5173`

---

## 🌐 Deployment

### Deploy Backend to Railway

1. Push your code to GitHub
2. Go to [Railway.app](https://railway.app)
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your `towbotics` repository
5. **Important**: Set root directory to `backend`
6. Add environment variables:
   - `PORT` = 8000
   - `NODE_ENV` = production
   - `FRONTEND_URL` = (your Vercel URL once deployed)
7. Deploy!
8. Copy your Railway URL (e.g., `https://towbotics.up.railway.app`)

---

### Deploy Frontend to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project" → Import your GitHub repository
3. **Important**: Set root directory to `frontend`
4. Add environment variable:
   - `VITE_API_URL` = (your Railway backend URL + `/api`)
   - Example: `https://towbotics.up.railway.app/api`
5. Deploy!
6. Copy your Vercel URL

---

### Update Backend CORS

After deploying frontend to Vercel:

1. Go back to Railway
2. Update `FRONTEND_URL` environment variable to your Vercel URL
3. Redeploy backend

---

## ✅ Verification

- Visit your Vercel URL
- You should see the Towbotics landing page
- Check API status badge - should show "✅ Connected"

---

## 🔧 Troubleshooting

**API not connecting?**
- Check that `VITE_API_URL` in Vercel matches your Railway URL
- Check that `FRONTEND_URL` in Railway matches your Vercel URL
- Verify both services are running

**Build failing?**
- Make sure root directories are set correctly
- Backend root: `backend`
- Frontend root: `frontend`

---

## 📝 Next Steps

Once deployed:
- [ ] Test the live site
- [ ] Update README with live URLs
- [ ] Add custom domain (optional)
- [ ] Add Stripe integration (when ready)

---

**Need help?** Check the main README.md for more details.
