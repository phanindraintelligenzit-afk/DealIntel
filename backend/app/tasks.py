"""Celery tasks for background processing"""
from celery import Celery

from app.config import settings

celery_app = Celery(
    "dealintel",
    broker=settings.redis_url,
    backend=settings.redis_url,
    include=["app.tasks"]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="UTC",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)


@celery_app.task(bind=True, max_retries=3)
def transcribe_call(self, call_id: int, audio_url: str):
    """Background task to transcribe and analyze a call."""
    try:
        # 1. Download audio
        # 2. Transcribe with Whisper
        # 3. Analyze with LLM
        # 4. Save results to DB
        return {"call_id": call_id, "status": "completed"}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)


@celery_app.task(bind=True, max_retries=3)
def analyze_deal(self, deal_id: int):
    """Background task to aggregate deal analysis."""
    try:
        return {"deal_id": deal_id, "status": "scored"}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=60)


@celery_app.task
def sync_to_crm(deal_id: int, platform: str = "hubspot"):
    """Background task to sync insights to CRM."""
    return {"deal_id": deal_id, "platform": platform, "status": "synced"}