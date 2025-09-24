# Deployment Guide (cPanel)

This document explains how to build and deploy the Linda Daily Gatsby site to a cPanel-based host.

## 1. Prerequisites

- Node.js 18+ and npm installed locally
- Access to the cPanel dashboard (File Manager or Terminal)
- Git repository remote configured: `https://github.com/ZuriJabari/Linda.git`

## 2. Build and Package Locally

### Option A – Automated Script

```bash
cd /path/to/LindaDaily
chmod +x scripts/prepare-cpanel.sh
./scripts/prepare-cpanel.sh
```

This script installs dependencies, runs `npm run build`, and produces `public-dist.zip` in the project root. The archive contains the compiled Gatsby site ready for upload.

### Option B – Manual Steps

```bash
cd /path/to/LindaDaily
npm install
npm run build
cd public
zip -r ../public-dist.zip .
```

## 3. Upload to cPanel

1. Log into cPanel.
2. Open **File Manager**.
3. Navigate to the target directory (`public_html/` or a subdirectory).
4. Upload `public-dist.zip`.
5. Select the uploaded file and choose **Extract**.
6. Ensure the extracted assets (HTML, CSS, JS, etc.) sit at the correct path for the domain/subdomain.

## 4. Post-Deployment Checklist

- Homepage loads without console errors.
- Navigation menu links (including `Initiatives` dropdown and `Podcast`) work correctly.
- Contact page form renders as expected.
- Podcast page sample audio player plays the built-in demo file.
- Favicon, SEO metadata, and OG tags are present (`src/components/SEO.js`).

## 5. Publishing Updates

1. Fetch latest changes:

   ```bash
   git pull origin master
   ```

2. Make edits, then commit:

   ```bash
   git add .
   git commit -m "Describe changes"
   git push origin master
   ```

3. Re-run the build script (`./scripts/prepare-cpanel.sh`).
4. Re-upload the new `public-dist.zip` and extract in cPanel.

## 6. Optional Enhancements

- Automate deployment via cPanel CLI or SSH if available.
- Use Git Version Control in cPanel to pull directly from GitHub (requires repository access from server).
- Configure caching or CDN via cPanel to improve performance.

---
For additional support, document any deployment-specific environment variables or custom server rules in this file as they arise.
