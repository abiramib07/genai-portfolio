# Architecture

## Stack
| Layer | Technology | Version |
|---|---|---|
| Frontend | Angular (standalone components) | 22.0.3 |
| Styling | SCSS + Tailwind CSS | v3 |
| Charts | Highcharts + highcharts-angular | HC 12.x, wrapper v4 |
| Animations | Canvas API (neural network BG) | native |
| Backend | FastAPI + Uvicorn | Python 3.14 |
| Data | Static JSON (no DB) | — |
| Package manager | npm (frontend), pip (backend) | — |

## Folder Structure
```
genai-portfolio/
├── CLAUDE.md                  ← Claude reads this first
├── docs/                      ← All project documentation
│   ├── ARCHITECTURE.md
│   ├── FRONTEND.md
│   ├── BACKEND.md
│   └── KNOWN_ISSUES.md
├── backend/
│   ├── main.py                ← FastAPI app, CORS config
│   ├── requirements.txt
│   ├── routers/
│   │   ├── portfolio.py       ← GET /api/* endpoints
│   │   └── contact.py         ← POST /api/contact
│   ├── models/
│   │   └── portfolio.py       ← Pydantic ContactMessage model
│   └── data/
│       └── portfolio_data.json ← Single source of truth for all content
├── frontend/
│   ├── angular.json           ← Highcharts scripts loaded here (global scripts array)
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── src/
│       ├── styles.scss        ← Global CSS variables, Tailwind, shared classes
│       └── app/
│           ├── app.ts         ← Root component, fetches all data once via signal
│           ├── app.html       ← @if(data()) gate — shows loader until data loads
│           ├── core/services/
│           │   └── portfolio.ts ← HttpClient wrapper, fallback data if API down
│           └── components/
│               ├── navbar/    ← Sticky nav, smooth scroll, mobile hamburger
│               ├── hero/      ← Canvas neural network, typewriter roles, CTAs
│               ├── about/     ← Summary + 4 stat cards
│               ├── skills/    ← Highcharts radar chart + category tabs + badges
│               ├── experience/ ← Timeline, expandable project cards
│               ├── achievements/ ← Highcharts solid gauge x4
│               ├── education/ ← CGPA card
│               └── contact/   ← Form → POST /api/contact
```

## Data Flow
```
FastAPI /api/all
    ↓  (HTTP GET, with fallback if API is down)
PortfolioService (portfolio.ts)
    ↓  (Observable → signal)
App component (app.ts) — data signal
    ↓  (@Input bindings)
Each section component renders its slice of data
```

## Design System (CSS Variables)
```css
--bg:           #0a0a12   /* page background */
--surface:      #0f0f1a   /* slightly lighter surface */
--card:         #161625   /* glassmorphism card base */
--border:       #1e1e35   /* card borders */
--primary:      #6366f1   /* indigo */
--primary-light: #818cf8  /* lighter indigo */
--accent:       #22d3ee   /* cyan */
--text:         #e2e8f0   /* body text */
--muted:        #64748b   /* secondary text */
```

Shared utility classes in `styles.scss`: `.glass-card`, `.gradient-text`, `.section`, `.section-title`, `.tech-badge`, `.fade-up`
