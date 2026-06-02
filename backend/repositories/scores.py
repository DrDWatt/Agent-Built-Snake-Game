from datetime import UTC, datetime
from typing import Protocol

from motor.motor_asyncio import AsyncIOMotorDatabase

from models.score import ScoreCreate, ScoreRecord


class ScoreRepository(Protocol):
    async def create(self, score: ScoreCreate) -> ScoreRecord:
        ...

    async def list_top(self, limit: int) -> list[ScoreRecord]:
        ...


class MongoScoreRepository:
    def __init__(self, database: AsyncIOMotorDatabase) -> None:
        self.collection = database["scores"]

    async def create(self, score: ScoreCreate) -> ScoreRecord:
        document = score.model_dump()
        document["created_at"] = datetime.now(UTC)
        result = await self.collection.insert_one(document)
        return ScoreRecord(id=str(result.inserted_id), **document)

    async def list_top(self, limit: int) -> list[ScoreRecord]:
        cursor = self.collection.find().sort("score", -1).limit(limit)
        records: list[ScoreRecord] = []
        async for document in cursor:
            document["id"] = str(document.pop("_id"))
            records.append(ScoreRecord(**document))
        return records
