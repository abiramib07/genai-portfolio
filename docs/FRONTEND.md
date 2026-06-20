# Frontend

## Key Decisions

### Highcharts Setup (CRITICAL — do not change without reading this)
Highcharts extra modules (`highcharts-more`, `solid-gauge`) cannot be initialized
via ES module imports with Angular's esbuild bundler — they crash with
"HighchartsMore is not a function".

**Solution:** They are loaded as global scripts in `angular.json`:
```json
"scripts": [
  "node_modules/highcharts/highcharts.js",
  "node_modules/highcharts/highcharts-more.js",
  "node_modules/highcharts/modules/solid-gauge.js"
]
```

Components reference `window.Highcharts` (globally initialized, all modules loaded):
```typescript
Highcharts: any = typeof window !== 'undefined' ? window.Highcharts : Highcharts;
```

The `HighchartsChartModule` from `highcharts-angular@4` is imported in the
component's `imports` array for the `<highcharts-chart>` directive.

Do NOT upgrade `highcharts-angular` to v5 — v5 completely changed the API
(`provideHighcharts()` config object, no `[Highcharts]` input). v4 is pinned.

### Tailwind Version
Tailwind v3 is used (not v4). v4 moved the PostCSS plugin to `@tailwindcss/postcss`
which breaks Angular's build pipeline. Config is at `tailwind.config.js` and
`postcss.config.js` at the frontend root.

### Standalone Components
All components are Angular standalone (no NgModules). Each component declares
its own `imports` array. `CommonModule` is imported in every component that uses
`@for`, `@if`, or pipes.

### Data Flow Pattern
The root `App` component fetches all portfolio data once on `ngOnInit` via
`PortfolioService.getAll()` and stores it in a signal. All child components
receive their slice via `@Input()`. No child component fetches data independently.

```typescript
// app.ts
data = signal<any>(null);
ngOnInit() { this.portfolio.getAll().subscribe(d => this.data.set(d)); }
```

```html
<!-- app.html -->
@if (data()) {
  <app-skills [skills]="data().skills" />
} @else {
  <div class="loader-wrap">...</div>
}
```

## Components Reference

### NavbarComponent (`app-navbar`)
- Inputs: `personal`
- Sticky on scroll (`HostListener` on window scroll)
- Smooth scrolls to `#section-id` on link click
- Mobile hamburger menu with CSS transition

### HeroComponent (`app-hero`)
- Inputs: `personal`, `stats`
- `@ViewChild('canvas')` — neural network particle animation via Canvas 2D API
- 80 nodes, connections drawn when distance < 140px
- Typewriter effect cycles through 4 role titles
- Canvas animation uses `requestAnimationFrame`, cleaned up on `ngOnDestroy`

### SkillsComponent (`app-skills`)
- Inputs: `skills` (Record<string, string[]>)
- Highcharts polar/radar chart — 7 categories, proficiency scores hardcoded in component
- Category tabs update the badge grid below the chart
- Chart uses `window.Highcharts` (global, has `highcharts-more` loaded)

### ExperienceComponent (`app-experience`)
- Inputs: `experience`
- Expandable project cards — `expandedProject` signal tracks open item
- Each job has multiple projects; click to expand highlights + tech stack

### AchievementsComponent (`app-achievements`)
- Inputs: `achievements`
- 4 Highcharts solid gauge charts, one per achievement metric
- Uses `window.Highcharts` (global, has `solid-gauge` loaded)
- Gauge value derived from metric string: "85%" → 85, "40+" → 40 (capped at 100)

### ContactComponent (`app-contact`)
- Inputs: `personal`
- Posts to `http://localhost:8000/api/contact`
- `status` signal: `'idle' | 'sending' | 'success' | 'error'`
- Shows success message on submit, resets form

## Adding a New Section
1. `ng generate component components/<name> --skip-tests` in `frontend/`
2. Add `@Input()` for the data slice it needs
3. Import it in `app.ts` imports array
4. Add `<app-name [prop]="data().prop" />` to `app.html` inside the `@if` block
5. Add a corresponding key to `portfolio_data.json` and the FastAPI routes
