# Backend

## Stack
- Python 3.14, FastAPI, Uvicorn
- No database — data lives in `backend/data/portfolio_data.json`
- CORS allows `localhost:4200` and `localhost:8080`

## Running
```bash
cd backend
python -m uvicorn main:app --reload --port 8000
```

Swagger UI (auto-generated): `http://localhost:8000/docs`

## Endpoints
| Method | Path | Returns |
|---|---|---|
| GET | `/health` | `{status: "ok"}` |
| GET | `/api/all` | Full portfolio JSON |
| GET | `/api/personal` | Name, email, links |
| GET | `/api/stats` | 4 stat cards |
| GET | `/api/skills` | Skills by category |
| GET | `/api/experience` | Work history + projects |
| GET | `/api/achievements` | 4 metric achievements |
| GET | `/api/education` | Degree, CGPA |
| POST | `/api/contact` | Accepts `{name, email, subject, message}` |

## Data File
`backend/data/portfolio_data.json` is the single source of truth.
To update portfolio content (new project, new skill, etc.) — edit this file only.
The API reads it fresh on every request (no caching), so changes are instant.

## Data Schema
```json
{
  "personal": { "name", "title", "subtitle", "email", "phone", "linkedin", "summary" },
  "stats": [{ "value", "label", "icon" }],
  "skills": { "Category Name": ["skill1", "skill2"] },
  "experience": [{
    "role", "company", "period", "current": bool,
    "projects": [{ "title", "highlights": [], "stack": [] }]
  }],
  "achievements": [{ "metric", "description", "icon" }],
  "education": { "degree", "institution", "period", "cgpa" }
}
```

## Contact Endpoint
Currently prints to console. To wire up email:
1. Install `fastapi-mail` or use `smtplib`
2. Update `routers/contact.py` — the placeholder comment marks the exact location

## Adding New Data
1. Add the key to `portfolio_data.json`
2. Add a `@router.get("/api/<key>")` in `routers/portfolio.py`
3. Add the key to `get_all()` — it returns the whole JSON so it's automatic
4. Add a corresponding `@Input()` in the Angular component and bind in `app.html`
