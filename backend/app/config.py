"""DealIntel Configuration"""
from pydantic_settings import BaseSettings
from typing import Optional


class Settings(BaseSettings):
    app_name: str = "DealIntel"
    debug: bool = False
    database_url: str = "postgresql+asyncpg://postgres:postgres@localhost:5432/dealintel"
    redis_url: str = "redis://localhost:6379/0"
    secret_key: str = "change-me-in-production"
    cors_origins: list[str] = ["http://localhost:5173"]
    openai_api_key: Optional[str] = None
    whisper_model: str = "base"
    storage_bucket: str = "dealintel-audio"
    storage_endpoint: str = ""
    sentry_dsn: Optional[str] = None

    class Config:
        env_file = ".env"


settings = Settings()