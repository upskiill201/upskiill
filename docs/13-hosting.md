# Hosting & Live Links

## Live URLs

| Service | URL | What it is |
|---------|-----|-----------|
| **Frontend** | https://upskiill.vercel.app | The website users visit |
| **Backend API** | https://upskiill-backend.onrender.com | The server handling data |
| **GitHub Repo** | https://github.com/upskiill201/upskiill | Source code |

---

## Frontend — Vercel

**Platform:** [vercel.com](https://vercel.com)
**Plan:** Free
**Auto-deploys:** ✅ Every time you merge to `main`

### How it works
```
You push code to main on GitHub
        ↓
Vercel detects the push automatically
        ↓
Builds and deploys in ~1 minute
        ↓
Live at https://upskiill.vercel.app
```

### How to access Vercel dashboard
1. Go to [vercel.com](https://vercel.com)
2. Login with GitHub
3. Click on the **upskiill** project
4. You can see: deployments, logs, environment variables, analytics

### Adding environment variables (Vercel)
1. Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add variables like `NEXT_PUBLIC_API_URL`
3. After adding, **redeploy** for changes to take effect

---

## Backend — Render

**Platform:** [render.com](https://render.com)
**Plan:** Free (sleeps after 15 min idle) ⚠️
**Auto-deploys:** ✅ Every time you merge to `main`

### How it works
```
You push code to main on GitHub
        ↓
Render detects the push automatically
        ↓
Builds and deploys in ~2-3 minutes
        ↓
Live at https://upskiill-backend.onrender.com
```

### How to access Render dashboard
1. Go to [render.com](https://render.com)
2. Login with GitHub
3. Click on **upskiill-backend** service
4. You can see: logs, environment variables, deployment history

### Adding environment variables (Render)
1. Render dashboard → upskiill-backend → **Environment**
2. Add variables like `DATABASE_URL`, `JWT_SECRET`, `STRIPE_SECRET_KEY`
3. Click **Save Changes** — Render auto-restarts with new variables

### ⚠️ Free tier limitation
The free backend **sleeps after 15 minutes of no requests**.
- First request after sleep takes **30–60 seconds** to respond
- Upgrade to **Render Starter ($7/month)** before real launch

---

## How Frontend Connects to Backend

The frontend knows where the backend is through an environment variable:

```
NEXT_PUBLIC_API_URL = https://upskiill-backend.onrender.com
```

Set this in Vercel's environment variables.

In the code, every API call uses it like this:
```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/courses`);
```

### Testing locally vs production

| Environment | Frontend runs at | Backend runs at |
|-------------|-----------------|----------------|
| **Local (your laptop)** | http://localhost:3000 | http://localhost:3001 |
| **Production (internet)** | https://upskiill.vercel.app | https://upskiill-backend.onrender.com |

For local development, create a `.env.local` file in the `frontend/` folder:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```
This makes the frontend point to your local backend when developing.

---

## Checking if Backend is Running

Visit this URL in your browser:
```
https://upskiill-backend.onrender.com
```
If you see `Hello World!` → backend is running ✅
If it takes >30 seconds → it was sleeping, now waking up ⚠️
If it shows an error → check Render logs ❌

---

## Deployment Checklist

Every deployment is automatic, but verify after each merge:

- [ ] Go to Vercel dashboard → check latest deployment is green ✅
- [ ] Go to Render dashboard → check latest deployment is green ✅
- [ ] Visit https://upskiill.vercel.app to confirm site loads
- [ ] Visit https://upskiill-backend.onrender.com to confirm API responds
