# Towbotics

A modern, aesthetic landing page showcasing Towbotics with integrated payment processing.

---

## 🚀 Tech Stack

### Frontend
- **React 18** + **Vite** - Modern, fast development
- **Tailwind CSS** - Beautiful, responsive design
- **Hosted on Vercel** - Global CDN, automatic deployments

### Backend
- **Express** - RESTful API server
- **Node.js 18+** - Runtime environment
- **Hosted on Railway** - Reliable backend hosting

### Payment Processing
- **Stripe** - Secure payment integration
- Checkout sessions
- Webhook handling

---

## 🌐 Live URLs

- **Frontend**: https://towbotics.vercel.app (coming soon)
- **Backend API**: https://towbotics.up.railway.app (coming soon)

---

## 🎨 Features

- ✨ **Aesthetic Landing Page** - Modern, eye-catching design
- 💳 **Stripe Payments** - Secure payment processing
- 📱 **Fully Responsive** - Perfect on all devices
- ⚡ **Lightning Fast** - Optimized performance
- 🔒 **Secure** - HTTPS, CORS configured

---

## 🛠️ Development

### Prerequisites
- Node.js 18+
- npm or yarn
- Stripe account

### Local Setup

```bash
# Clone the repository
git clone https://github.com/aidendevins/Towbotics.git
cd Towbotics

# Install backend dependencies
cd backend
npm install
cp env.example .env
# Add your environment variables to .env
npm run dev

# Install frontend dependencies (in new terminal)
cd frontend
npm install
cp env.example .env.local
# Add your environment variables to .env.local
npm run dev
```

### Environment Variables

**Backend (.env)**
```env
PORT=8000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

**Frontend (.env.local)**
```env
VITE_API_URL=http://localhost:8000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
```

---

## 🚀 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import repo to Vercel
3. Set root directory: `frontend`
4. Add environment variables
5. Deploy!

### Backend (Railway)
1. Push code to GitHub
2. Import repo to Railway
3. Set root directory: `backend`
4. Add environment variables
5. Deploy!

---

## 📁 Project Structure

```
towbotics/
├── backend/              # Express API
│   ├── routes/          # API endpoints
│   ├── server.js        # Main server file
│   └── package.json
├── frontend/            # React application
│   ├── src/
│   │   ├── App.jsx     # Main landing page
│   │   └── main.jsx    # Entry point
│   └── package.json
└── README.md
```

---

## 🎯 Roadmap

- [x] Project setup
- [ ] Design landing page
- [ ] Stripe integration
- [ ] Deploy to production
- [ ] Custom domain
- [ ] Analytics

---

## 📄 License

Private - All rights reserved

---

**Built with ❤️ for Towbotics**
