# CLAUDE.md — Portfolio Project Context Index

This file is the entry point for Claude to resume work on this project.
Read this first, then follow the links to the relevant doc for the task at hand.

## Project
**AI Engineer Portfolio** for Abirami B — Generative AI Developer.
Live at: `http://localhost:4200` (frontend) | `http://localhost:8000` (backend)
GitHub: `https://github.com/abiramib07/genai-portfolio`
Branches: `main` (stable) ← `dev` (active work — always work here)

## Docs Index
| File | When to read |
|---|---|
| [ARCHITECTURE.md](docs/ARCHITECTURE.md) | Understanding stack, folder structure, data flow |
| [FRONTEND.md](docs/FRONTEND.md) | Angular components, Highcharts setup, styling system |
| [BACKEND.md](docs/BACKEND.md) | FastAPI routes, portfolio data JSON, running the server |
| [KNOWN_ISSUES.md](docs/KNOWN_ISSUES.md) | Bugs fixed, gotchas to avoid, non-obvious decisions |

## How to Start Servers

```bash
# Terminal 1 — Frontend (Angular)
cd D:\genai-portfolio\genai-portfolio\frontend
ng serve --port 4200

# Terminal 2 — Backend (FastAPI)
cd D:\genai-portfolio\genai-portfolio\backend
python -m uvicorn main:app --reload --port 8000
```

## Git Workflow
```bash
# Always work on dev
git switch dev
git pull origin dev

# Commit and push
git add .
git commit -m "feat/fix: description"
git push origin dev

# Merge to main when stable
git switch main && git merge dev && git push origin main && git switch dev
```

## Owner
Abirami B | abiramib20.ai@gmail.com | linkedin.com/in/abirami-b-15a042213
