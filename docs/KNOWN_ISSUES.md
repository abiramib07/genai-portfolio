# Known Issues & Gotchas

## Resolved — Do Not Re-introduce

### 1. Highcharts Module Init Crash
**Symptom:** `Uncaught TypeError: HighchartsMore is not a function`
**Cause:** Angular's esbuild bundler wraps CommonJS modules as namespace objects,
making them non-callable when imported via `import * as` or default imports.
**Fix:** Load via `angular.json` scripts array (global scripts, not bundled as ESM).
Components use `window.Highcharts` which is already initialized with all modules.
**Do not:** Try to `import HighchartsMore from 'highcharts/highcharts-more'` and
call it as a function — this always crashes with esbuild regardless of cast.

### 2. highcharts-angular Version
**Do not upgrade to v5.** v5 removed the `[Highcharts]` input and replaced it
with `provideHighcharts()` config — a completely different API that requires
async lazy loading. v4 is pinned and working.

### 3. Tailwind v4 PostCSS Break
**Symptom:** Build fails with "PostCSS plugin has moved to @tailwindcss/postcss"
**Cause:** Tailwind v4 extracted the PostCSS plugin to a separate package.
**Fix:** `tailwindcss@3` is installed. Do not upgrade to v4 without also
installing `@tailwindcss/postcss` and updating `postcss.config.js`.

### 4. Angular Material SCSS Import
**Symptom:** Blank page / CSS not loading
**Cause:** `@use '@angular/material' as mat;` in `styles.scss` without a configured
Material theme causes the stylesheet pipeline to fail silently.
**Fix:** Removed. Angular Material is installed (npm) but not used in templates —
no SCSS import needed. If Material components are added later, set up a proper
theme before importing the SCSS module.

### 5. Stale Import Crash (HighchartsChartComponent)
**Symptom:** Blank page, no console output
**Cause:** `import { HighchartsChartComponent } from 'highcharts-angular'` was left
in `achievements.ts` — this export doesn't exist in v4, causing a silent crash
before Angular could bootstrap.
**Fix:** Removed. Only `HighchartsChartModule` is imported from `highcharts-angular`.

### 6. Wrong Dev Server URL
Angular dev server runs on `http://localhost:4200`.
VS Code Live Server opens static files on a random port (e.g., 50948).
Always use `ng serve` and open port 4200 — never open `dist/` with Live Server.

## Active Limitations

### Contact Form
`POST /api/contact` currently only logs to console.
Email sending is not implemented. Add `fastapi-mail` and SMTP config to activate.

### Resume Download
The resume link in navbar and hero points to `assets/Abirami_Resume.pdf`.
Currently the `.docx` file is in assets. Convert to PDF and replace the file,
or update the `href` to point to the `.docx`.

### Scroll Animations
`.fade-up` CSS class is defined but the `IntersectionObserver` is only wired up
in `AboutComponent.ngOnInit()`. Other sections' `.fade-up` elements won't animate
unless the observer is also registered there.
To fix: move the observer setup to a shared directive or to `App.ngAfterViewInit()`.

### Mobile Responsiveness
Tested at breakpoints but not on a real device. The hero canvas may be slow on
low-end mobile. Consider disabling the canvas animation below 768px.
