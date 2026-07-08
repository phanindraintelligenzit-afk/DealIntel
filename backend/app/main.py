"""FastAPI application setup"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.api import router

app = FastAPI(
    title=settings.app_name,
    description="Open-Source Revenue Intelligence Platform — Gong Alternative",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router, prefix="/api")


@app.get("/health")
async def health():
    return {
        "status": "healthy",
        "app": settings.app_name,
        "version": "1.0.0",
        "agents": [
            "Ingestion Agent",
            "Transcription Agent",
            "Analysis Agent",
            "Deal Scoring Agent",
            "Coaching Agent",
            "CRM Sync Agent",
            "Reporting Agent"
        ]
    }