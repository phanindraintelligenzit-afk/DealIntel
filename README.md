# DealIntel — Open-Source Revenue Intelligence

**The open-source alternative to Gong — multi-agent AI platform that records, transcribes, and analyzes sales calls with zero vendor lock-in.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.12-blue.svg)](https://python.org)
[![React](https://img.shields.io/badge/React-18.3-61dafb.svg)](https://react.dev)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688.svg)](https://fastapi.tiangolo.com)
[![GitHub stars](https://img.shields.io/github/stars/phanindraintelligenzit-afk/DealIntel?style=social)](https://github.com/phanindraintelligenzit-afk/DealIntel)

---

## Why DealIntel?

Gong charges **$5K-$50K platform fee + $1,300 per seat per year**. Most sales teams can't justify that cost. DealIntel is:

- **100% open-source** — MIT licensed, self-hosted
- **Multi-agent AI** — 7 specialist agents working together
- **Privacy-first** — your call data stays on your infrastructure
- **CRM-agnostic** — works with HubSpot, Salesforce, any CRM
- **Extensible** — add custom agents, integrations, and analyzers

## Quick Start

### Option 1: Docker (recommended)

```bash
git clone https://github.com/phanindraintelligenzit-afk/DealIntel.git
cd DealIntel
cp .env.example .env
docker compose up -d
```

Open http://localhost:8000

### Option 2: Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

## Architecture: 7-Agent System

```
┌──────────────┐    ┌───────────────┐    ┌──────────────┐
│ Ingestion    │───▶│ Transcription │───▶│ Analysis     │
│ Agent        │    │ Agent(Whisper)│    │ Agent(LLM)   │
├──────────────┤    ├───────────────┤    ├──────────────┤
│ Zoom/Teams   │    │ Speaker Diariz│    │ Sentiment    │
│ API/Upload   │    │ Word-by-word  │    │ Topics/Object│
└──────────────┘    └───────────────┘    └──────┬───────┘
                                                │
                      ┌─────────────────────────┼──────────┐
                      │                         │          │
               ┌──────▼──────┐          ┌───────▼───────┐  │
               │ Deal Scoring│          │ Coaching     │  │
               │ Agent       │          │ Agent        │  │
               ├─────────────┤          ├───────────────┤  │
               │ Win Predict │          │ Skill Gaps   │  │
               │ Health Score│          │ Best Practice│  │
               └──────┬──────┘          └───────┬───────┘  │
                      │                         │          │
               ┌──────▼─────────────────────────▼───────┐  │
               │        CRM Sync Agent                  │  │
               │        (HubSpot / Salesforce)          │◀─┘
               └────────────────────────────────────────┘
                         │
               ┌─────────▼─────────┐
               │  Reporting Agent  │
               │  (Dashboards)     │
               └───────────────────┘
```

### Agent Roles

| Agent | Responsibility |
|-------|---------------|
| **Ingestion Agent** | Captures calls via upload, Zoom, or Teams integration |
| **Transcription Agent** | Converts audio to searchable text via Whisper with speaker diarization |
| **Analysis Agent** | Extracts sentiment, topics, objections, competitor mentions using LLM |
| **Deal Scoring Agent** | Calculates deal health score and win probability from conversation patterns |
| **Coaching Agent** | Identifies skill gaps and generates personalized coaching recommendations |
| **CRM Sync Agent** | Pushes insights back to HubSpot, Salesforce, or any CRM |
| **Reporting Agent** | Generates team and executive dashboards with trend analysis |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check and agent status |
| GET | `/api/calls` | List all analyzed calls |
| POST | `/api/calls/upload` | Upload call recording for analysis |
| GET | `/api/calls/{id}` | Get call with transcript and analysis |
| GET | `/api/deals` | List all deals with health scores |
| GET | `/api/deals/{id}` | Get deal details with scoring |
| GET | `/api/dashboard` | Aggregate revenue intelligence |
| GET | `/api/coaching/{rep_id}` | Coaching recommendations per rep |

## Tech Stack

- **Backend**: Python 3.12 + FastAPI + SQLAlchemy + Celery
- **Database**: PostgreSQL 16 + Redis 7
- **AI/ML**: OpenAI API / Whisper / LangChain
- **Frontend**: React 18 + TypeScript + Tailwind CSS + Recharts
- **Infrastructure**: Docker + Docker Compose + GitHub Actions
- **Storage**: S3-compatible (Cloudflare R2, MinIO, AWS S3)

## Deployment

### GitHub Actions (CI/CD)
The `.github/workflows/ci.yml` runs tests and deploys to Fly.io on every push to `main`.

### Docker Production
```bash
docker compose -f docker-compose.yml up -d --build
```

### Manual Deployment
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000

# Worker
celery -A app.tasks worker --loglevel=info
```

## Monetization

DealIntel follows an **open-core** model:

| Tier | What You Get | Price |
|------|-------------|-------|
| Community | Full source code, self-hosted | Free (MIT) |
| Enterprise | Managed cloud, SSO, custom agents, SLA | $49/seat/month |
| Setup | One-time deployment + integration | $2K-$5K |

## Project Structure

```
DealIntel/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── agents.py        # 7-agent system
│   │   ├── api.py           # REST endpoints
│   │   ├── config.py        # Settings
│   │   ├── main.py          # FastAPI app
│   │   ├── models.py        # SQLAlchemy models
│   │   └── tasks.py         # Celery background tasks
│   ├── tests/
│   │   └── test_api.py
│   ├── alembic/
│   ├── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── App.tsx
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Calls.tsx
│   │   │   ├── Deals.tsx
│   │   │   └── Coaching.tsx
│   ├── package.json
│   ├── vite.config.ts
├── docker-compose.yml
├── Dockerfile
└── .github/workflows/ci.yml
```

## Roadmap

- [x] Multi-agent architecture
- [x] Call transcription pipeline
- [x] Sentiment and topic analysis
- [x] Deal health scoring
- [x] Coaching recommendations
- [x] CRM sync (HubSpot)
- [ ] Salesforce integration
- [ ] Live call streaming
- [ ] Email integration
- [ ] Mobile app
- [ ] Slack bot

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License — see [LICENSE](LICENSE) for details.

---

**Built by [AgentsFactory](https://phanindraintelligenzit-afk.github.io/agentsfactory-marketplace/) — autonomous AI swarm development**