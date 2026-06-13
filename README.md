# Mind Vault 🌸

> Your personal, soundless mindfulness oasis. No logins. Zero server logs.

A fully offline-capable Progressive Web App (PWA) — add it to your home screen and it behaves exactly like a native app, complete with your custom logo icon.

---

## 🚀 Deploy to GitHub Pages

1. Create a new GitHub repository (e.g. `mind-vault`)
2. Upload **all files and folders** from this zip as-is, keeping the folder structure
3. Go to **Settings → Pages**
4. Under *Branch*, select `main` and folder `/root`, then click **Save**
5. Your app will be live at `https://<your-username>.github.io/mind-vault/`

---

## 📁 File Structure

```
mind-vault/
├── index.html          ← Main app
├── manifest.json       ← PWA manifest (icons, theme, display mode)
├── sw.js               ← Service Worker (offline caching)
├── logo.jpg            ← App logo (used inside the app)
├── favicon.ico         ← Browser tab icon
└── icons/
    ├── apple-touch-icon.png   ← iOS home screen icon (180×180)
    ├── favicon-32x32.png
    ├── icon-72x72.png
    ├── icon-96x96.png
    ├── icon-128x128.png
    ├── icon-144x144.png
    ├── icon-152x152.png
    ├── icon-192x192.png       ← Android home screen icon
    ├── icon-384x384.png
    └── icon-512x512.png       ← Splash screen / Play Store icon
```

---

## 📱 Adding to Home Screen

| Platform | Steps |
|----------|-------|
| **iPhone / iPad** | Open in Safari → Share button → "Add to Home Screen" |
| **Android (Chrome)** | Open in Chrome → Three-dot menu → "Add to Home Screen" |
| **Desktop Chrome** | Click the install icon (⊕) in the address bar |

Once added, the app opens full-screen with **no browser UI** and your logo appears as the icon.

---

## 🤖 Connecting Lumi to a Real AI (Free)

By default, Lumi uses built-in offline responses. To give Lumi real AI conversations using Google's free-tier Gemini model, without ever exposing your API key publicly:

1. **Get a free Gemini API key**
   - Go to https://aistudio.google.com/app/apikey, sign in, and click "Create API key".

2. **Deploy the included `worker.js` to Cloudflare Workers** (free tier)
   - Go to https://dash.cloudflare.com → Workers & Pages → Create → Worker
   - Paste in the contents of `worker.js`, click Deploy
   - In the Worker's Settings → Variables, add a **secret** named `GEMINI_API_KEY` with the key from step 1
   - (Optional) Add a variable `ALLOWED_ORIGIN` set to your site's URL (e.g. `https://yourname.github.io`) to restrict who can use the proxy

3. **Point your site at the Worker**
   - Copy your Worker's URL (e.g. `https://lumi-proxy.yourname.workers.dev`)
   - Open `index.html`, find the line `const LUMI_WORKER_URL = 'https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev';`
   - Replace it with your Worker's URL

That's it — Lumi will now use real AI for every visitor, with your key kept safely on the server side. If the AI request ever fails (rate limit, offline, etc.), Lumi automatically falls back to its built-in offline responses.

**Note on free limits:** Gemini's free tier has generous but finite daily/per-minute limits. If your site gets a lot of traffic, all visitors share the same quota since they go through one Worker and one key.
