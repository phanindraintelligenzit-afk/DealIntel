"""Database models for DealIntel"""
from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, JSON, Text, Enum as SAEnum
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.sql import func
import enum

Base = declarative_base()


class DealStage(str, enum.Enum):
    DISCOVERY = "discovery"
    DEMO = "demo"
    PROPOSAL = "proposal"
    NEGOTIATION = "negotiation"
    CLOSED_WON = "closed_won"
    CLOSED_LOST = "closed_lost"


class Call(Base):
    __tablename__ = "calls"

    id = Column(Integer, primary_key=True, autoincrement=True)
    rep_id = Column(Integer, ForeignKey("reps.id"), nullable=False)
    deal_id = Column(Integer, ForeignKey("deals.id"), nullable=True)
    title = Column(String(255), nullable=True)
    audio_url = Column(String(500), nullable=True)
    duration_seconds = Column(Integer, nullable=True)
    recorded_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    status = Column(String(50), default="uploaded")


class Transcript(Base):
    __tablename__ = "transcripts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    call_id = Column(Integer, ForeignKey("calls.id"), nullable=False)
    full_text = Column(Text, nullable=True)
    segments = Column(JSON, nullable=True)  # [{speaker, text, start, end}]
    word_count = Column(Integer, default=0)
    language = Column(String(10), default="en")
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CallAnalysis(Base):
    __tablename__ = "call_analyses"

    id = Column(Integer, primary_key=True, autoincrement=True)
    call_id = Column(Integer, ForeignKey("calls.id"), nullable=False)
    sentiment = Column(String(50), nullable=True)
    sentiment_score = Column(Float, nullable=True)
    topics = Column(JSON, nullable=True)
    objections = Column(JSON, nullable=True)
    competitor_mentions = Column(JSON, nullable=True)
    next_steps_mentioned = Column(JSON, nullable=True)
    talk_ratio = Column(JSON, nullable=True)  # {rep: %, prospect: %}
    summary = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Deal(Base):
    __tablename__ = "deals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    value = Column(Float, nullable=True)
    stage = Column(String(50), default="discovery")
    health_score = Column(Float, nullable=True)
    predicted_close_date = Column(DateTime(timezone=True), nullable=True)
    win_probability = Column(Float, nullable=True)
    crm_id = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())


class Rep(Base):
    __tablename__ = "reps"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    team = Column(String(100), nullable=True)
    role = Column(String(100), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class CoachingInsight(Base):
    __tablename__ = "coaching_insights"

    id = Column(Integer, primary_key=True, autoincrement=True)
    rep_id = Column(Integer, ForeignKey("reps.id"), nullable=False)
    area = Column(String(100), nullable=False)
    observation = Column(Text, nullable=True)
    recommendation = Column(Text, nullable=True)
    priority = Column(String(20), default="medium")
    call_id = Column(Integer, ForeignKey("calls.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())