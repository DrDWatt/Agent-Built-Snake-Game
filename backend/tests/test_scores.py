from datetime import UTC, datetime

from fastapi.testclient import TestClient

from dependencies import get_score_repository
from main import app
from models.score import ScoreCreate, ScoreRecord


class InMemoryScoreRepository:
    def __init__(self) -> None:
        self.records: list[ScoreRecord] = []

    async def create(self, score: ScoreCreate) -> ScoreRecord:
        record = ScoreRecord(
            id=str(len(self.records) + 1),
            player_name=score.player_name,
            score=score.score,
            created_at=datetime.now(UTC),
        )
        self.records.append(record)
        return record

    async def list_top(self, limit: int) -> list[ScoreRecord]:
        return sorted(self.records, key=lambda item: item.score, reverse=True)[:limit]


def test_create_and_list_scores() -> None:
    repository = InMemoryScoreRepository()
    app.dependency_overrides[get_score_repository] = lambda: repository

    with TestClient(app) as client:
        response = client.post("/api/scores", json={"player_name": "Player", "score": 8})
        assert response.status_code == 200
        assert response.json()["score"] == 8

        response = client.get("/api/scores")
        assert response.status_code == 200
        assert response.json()[0]["player_name"] == "Player"

    app.dependency_overrides.clear()
