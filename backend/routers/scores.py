from fastapi import APIRouter, Depends, Query

from dependencies import get_score_repository
from models.score import ScoreCreate, ScoreRecord
from repositories.scores import ScoreRepository

router = APIRouter(prefix="/scores", tags=["scores"])


@router.post("", response_model=ScoreRecord)
async def create_score(
    score: ScoreCreate,
    repository: ScoreRepository = Depends(get_score_repository),
) -> ScoreRecord:
    return await repository.create(score)


@router.get("", response_model=list[ScoreRecord])
async def list_scores(
    limit: int = Query(default=5, ge=1, le=20),
    repository: ScoreRepository = Depends(get_score_repository),
) -> list[ScoreRecord]:
    return await repository.list_top(limit)
