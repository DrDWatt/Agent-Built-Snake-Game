from database import get_database
from repositories.scores import MongoScoreRepository, ScoreRepository


def get_score_repository() -> ScoreRepository:
    return MongoScoreRepository(get_database())
