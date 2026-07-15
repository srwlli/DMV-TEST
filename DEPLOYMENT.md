# Deployment Guide for DMV-TEST

## Quick Start (Local Testing)

### Using Node.js
```bash
cd DMV-TEST
node serve.js
# Open http://localhost:3000 in your browser
```

### Using Python 3
```bash
cd DMV-TEST/src
python -m http.server 3000
# Open http://localhost:3000 in your browser
```

### Using Python 2
```bash
cd DMV-TEST/src
python -m SimpleHTTPServer 3000
# Open http://localhost:3000 in your browser
```

### Using PHP
```bash
cd DMV-TEST/src
php -S localhost:3000
# Open http://localhost:3000 in your browser
```

---

## GitHub Pages Deployment

### Option 1: Manual GitHub Pages Setup (Recommended for Account Issues)

1. **Go to Repository Settings**
   - Navigate to: https://github.com/srwlli/DMV-TEST/settings
   - Scroll to "GitHub Pages" section

2. **Configure Pages Source**
   - Source: Select "Deploy from a branch"
   - Branch: Select "main"
   - Folder: Select "/src" (or "/" if you move src/* to root)
   - Click "Save"

3. **Wait for Deployment**
   - GitHub will build and publish your site
   - Visit: https://srwlli.github.io/DMV-TEST/
   - (May take 1-2 minutes after enabling)

### Option 2: Deploy to `/docs` Folder (Alternative)

If you prefer using the `/docs` folder approach:

```bash
# Copy src/ contents to docs/
cp -r src/* docs/
git add docs/
git commit -m "deploy: add docs folder for GitHub Pages"
git push origin main
```

Then in Settings > Pages, select "Deploy from a branch" → "main" → "/docs" folder.

### Option 3: GitHub Actions (When Account Issues Resolved)

The `.github/workflows/deploy.yml` workflow will automatically deploy when your account billing is resolved. The workflow will:
- Checkout the code
- Copy `/src` files to the `gh-pages` branch
- Publish to GitHub Pages

**To check workflow status:**
```bash
gh run list --repo srwlli/DMV-TEST
```

---

## Alternative Hosting Options

### Netlify (Free, Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect GitHub account and select `srwlli/DMV-TEST`
4. Build settings:
   - Build command: (leave blank)
   - Publish directory: `src`
5. Deploy

Your app will be live at `https://your-site-name.netlify.app`

### Vercel (Free)

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub: select `srwlli/DMV-TEST`
4. In settings:
   - Root Directory: `src`
   - Build Command: (override and leave blank)
   - Output Directory: (leave blank)
5. Deploy

---

## Publishing Your Own Instance

### Prerequisites
- Git and GitHub account
- Node.js 14+ (optional, only for local testing)

### Steps

1. **Fork the Repository**
   ```bash
   # On GitHub, click "Fork" on https://github.com/srwlli/DMV-TEST
   ```

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/DMV-TEST.git
   cd DMV-TEST
   ```

3. **Test Locally**
   ```bash
   node serve.js
   # or: python -m http.server 3000 (in src/)
   ```

4. **Enable GitHub Pages**
   - Go to your fork's Settings > Pages
   - Select source: "main" branch, "/src" folder
   - Save

5. **Your Site is Live!**
   - Visit: `https://YOUR-USERNAME.github.io/DMV-TEST/`

---

## Troubleshooting

### Pages Not Publishing

**Issue:** GitHub Pages shows "404 - There isn't a GitHub Pages site here"

**Solutions:**
1. Wait 2-3 minutes after enabling Pages (GitHub needs time to build)
2. Check Settings > Pages to confirm source is set correctly
3. Ensure `src/index.html` exists in the repository
4. Check GitHub Actions workflow status: https://github.com/srwlli/DMV-TEST/actions
5. Try clearing browser cache (Ctrl+Shift+Delete)

### App Not Loading Content

**Issue:** Page loads but no questions or road signs appear

**Solutions:**
1. Open browser DevTools (F12) and check Console for errors
2. Verify `src/data/questions.js` and `src/data/road-signs.js` are loading
3. Check that data file names match script src attributes in `index.html`
4. Try hard refresh (Ctrl+F5 on Windows, Cmd+Shift+R on Mac)

### CSS/Images Not Loading

**Issue:** Page loads but styling is missing

**Solutions:**
1. Check that file paths in CSS are relative (not absolute)
2. Verify `src/styles/main.css` and `src/styles/dark-mode.css` exist
3. Open DevTools Network tab to see which files fail to load
4. Check file permissions (should be readable by web server)

---

## Testing Your Deployment

Once your app is live, test these features:

1. **Home Screen**
   - Stats display (Best Score, Last Session, Streak)
   - Theme toggle works
   - Menu opens and closes
   - Resource link to PDF opens in new tab

2. **Quiz Mode**
   - Questions load
   - Options are clickable
   - Progress ring updates
   - Navigation buttons work
   - Feedback shows on answer submit

3. **Road Signs Gallery**
   - Signs display with emoji and name
   - Search/filter works
   - Click opens detail modal

4. **Progress Screen**
   - Displays session count (0 if no sessions yet)
   - Shows accuracy and mastered count
   - Weak areas display when data available

5. **Data Persistence**
   - Complete a quiz
   - Refresh page
   - Best score should still show
   - Quiz history persists

---

## Performance Notes

- **File Size:** ~200KB total (HTML, CSS, JS, data)
- **Load Time:** <1 second on typical broadband
- **Browser Support:** Chrome, Firefox, Safari, Edge (all modern versions)
- **Offline:** All data cached locally via IndexedDB after first visit
- **Mobile:** Optimized for 320px-1920px screens

---

## Updates and Maintenance

To deploy updates:

```bash
# Make changes to src/ files
git add src/
git commit -m "update: describe your changes"
git push origin main

# Pages will automatically rebuild and deploy
# Your live site will update within 1-2 minutes
```

---

Need help? Check the [README.md](./README.md) or open an issue on GitHub.
