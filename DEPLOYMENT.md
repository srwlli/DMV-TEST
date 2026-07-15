# Deployment Guide for DMV-TEST

The app is plain static HTML/CSS/JS served from the **repo root**. GitHub Pages
hosts it for free using a **branch source** (no GitHub Actions required — this
matters because Actions are unavailable on some account plans).

---

## Local Testing

```bash
node serve.js                 # then open http://localhost:3000
# or any static server:
python -m http.server 3000    # then open http://localhost:3000
php -S localhost:3000
```

---

## GitHub Pages (branch source — the method this repo uses)

GitHub Pages can publish straight from a branch folder with **no Actions build
step**. Because the app lives at the repo root, point Pages at `main` / `/root`.

### Enable once (Settings)
1. Go to https://github.com/srwlli/DMV-TEST/settings/pages
2. **Source:** Deploy from a branch
3. **Branch:** `main`  •  **Folder:** `/ (root)`
4. **Save**

Within ~1 minute the site is live at:
**https://srwlli.github.io/DMV-TEST/**

### Enable via CLI (equivalent)
```bash
gh api -X POST repos/srwlli/DMV-TEST/pages \
  -f 'source[branch]=main' -f 'source[path]=/'
# check status:
gh api repos/srwlli/DMV-TEST/pages
```

### Publishing updates
Any push to `main` that changes the root files re-publishes automatically —
Pages rebuilds the branch source with no Actions minutes consumed.

```bash
git add index.html app.js ui.js quiz-engine.js styles data
git commit -m "update: describe your change"
git push origin main
# live within ~1 min at https://srwlli.github.io/DMV-TEST/
```

### Why no GitHub Actions?
A CI/Actions-based deploy (`peaceiris/actions-gh-pages`, `actions/deploy-pages`)
fails with **"account is locked due to a billing issue"** / no Actions minutes on
free/limited plans. The branch source avoids Actions entirely — it is the same
approach the sibling PRIMARY-SOURCES site uses (local publish + free branch
Pages) after hitting the identical limit.

---

## Alternative Hosting (also Actions-free)

### Netlify
1. [netlify.com](https://netlify.com) → New site from Git → select `srwlli/DMV-TEST`
2. Build command: *(blank)*  •  Publish directory: `/` (root)
3. Deploy → live at `https://<name>.netlify.app`

### Vercel
1. [vercel.com](https://vercel.com) → New Project → import `srwlli/DMV-TEST`
2. Framework preset: **Other**  •  Root Directory: `./`  •  Build/Output: *(blank)*
3. Deploy

---

## Troubleshooting

**404 "There isn't a GitHub Pages site here"**
- Pages isn't enabled yet, or points at the wrong branch/folder. Set it to
  `main` / `/root` (see above). Confirm with `gh api repos/srwlli/DMV-TEST/pages`.
- Wait 1–2 min after the first enable for the initial build.
- Ensure `index.html` exists at the **repo root** (not under `src/`).

**Actions workflow keeps failing**
- Expected on a billing-locked account. This repo intentionally has **no**
  deploy workflow; delete any `.github/workflows/*.yml` that tries to deploy.

**App loads but no questions/signs**
- Open DevTools (F12) → Console. Confirm `data/questions.js` and
  `data/road-signs.js` load (Network tab) and that `index.html`'s `<script>`
  paths are relative (`data/…`, not `/src/data/…`).

**Styling missing**
- Confirm `styles/main.css` and `styles/dark-mode.css` load; paths are relative.

---

## Smoke Test After Deploy

1. **Home** — stats show, theme toggle works, PDF resource link opens.
2. **Quiz** — questions render, options clickable, progress ring updates, feedback shows.
3. **Road Signs** — gallery renders, search/filter works, detail modal opens.
4. **Progress** — session count/accuracy/mastered display.
5. **Persistence** — finish a quiz, refresh, best score still shows (IndexedDB).
