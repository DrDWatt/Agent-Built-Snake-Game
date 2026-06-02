# Snake Game

A web version of Snake with a React/Tailwind frontend, FastAPI backend, and MongoDB score storage.

## Requirements

- Docker and docker-compose
- Node.js 20+ for local frontend development
- Python 3.12+ for local backend development

## Environment

Copy `.env.example` if you need local overrides. Do not commit real secrets.

Development, test, and production should use different MongoDB database names:

- Development: `snake_dev`
- Test: `snake_test`
- Production: configure `MONGO_DB_NAME` to a production database name

## Run With Docker

```bash
docker compose up --build
```

Open `http://localhost:5173`.

The API is exposed at `http://localhost:18080` when running through Docker.

## Local Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

## Local Frontend

```bash
cd frontend
npm install
npm run dev
```

## Tests

Backend:

```bash
cd backend
pytest
```

Frontend:

```bash
cd frontend
npm test
```

Docker test stack:

```bash
docker compose -f docker-compose.test.yml run --rm backend-test
docker compose -f docker-compose.test.yml run --rm frontend-test
```
