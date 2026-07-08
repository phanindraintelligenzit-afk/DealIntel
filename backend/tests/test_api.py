"""Tests for DealIntel."""
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app


@pytest.fixture
async def client():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
async def test_health(client):
    response = await client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["app"] == "DealIntel"
    assert "agents" in data
    assert len(data["agents"]) == 7


@pytest.mark.asyncio
async def test_list_calls(client):
    response = await client.get("/api/calls")
    assert response.status_code == 200
    assert "calls" in response.json()


@pytest.mark.asyncio
async def test_list_deals(client):
    response = await client.get("/api/deals")
    assert response.status_code == 200
    assert "deals" in response.json()


@pytest.mark.asyncio
async def test_dashboard(client):
    response = await client.get("/api/dashboard")
    assert response.status_code == 200
    data = response.json()
    assert "total_calls_analyzed" in data
    assert "active_deals" in data