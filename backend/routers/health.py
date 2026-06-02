from fastapi import APIRouter

from database import get_database

router = APIRouter(tags=["health"])


@router.get("/health")
async def health() -> dict[str, str]:
    await get_database().command("ping")
    return {"status": "ok"}
