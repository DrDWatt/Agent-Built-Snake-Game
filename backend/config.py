from functools import lru_cache

from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    mongo_uri: str = "mongodb://localhost:27017"
    mongo_db_name: str = "snake_dev"


@lru_cache
def get_settings() -> Settings:
    return Settings()
