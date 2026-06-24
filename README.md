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

## 🤖Lumi-Real AI
Lumi is using real AI for every visitor, with the API key kept safely on the server side. If the AI request ever fails (rate limit, offline, etc.), Lumi automatically falls back to its built-in offline responses.

