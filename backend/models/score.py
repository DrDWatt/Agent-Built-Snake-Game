from datetime import datetime

from pydantic import BaseModel, Field


class ScoreCreate(BaseModel):
    player_name: str = Field(min_length=1, max_length=24)
    score: int = Field(ge=0)


class ScoreRecord(ScoreCreate):
    id: str
    created_at: datetime
