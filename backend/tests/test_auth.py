import pytest
from flask import json

def test_register_success(client):
    """Test successful user registration."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "TestPass123!"
        }
    )
    assert response.status_code == 201
    data = json.loads(response.data)
    assert "user" in data
    assert data["user"]["username"] == "newuser"
    assert data["user"]["email"] == "newuser@example.com"

def test_register_duplicate_username(client, test_user):
    """Test registration with existing username."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": test_user.username,
            "email": "another@example.com",
            "password": "TestPass123!"
        }
    )
    assert response.status_code == 409
    data = json.loads(response.data)
    assert "username" in data["message"].lower()

def test_register_invalid_email(client):
    """Test registration with invalid email format."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": "newuser",
            "email": "invalid-email",
            "password": "TestPass123!"
        }
    )
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "email" in data["message"].lower()

def test_register_weak_password(client):
    """Test registration with weak password."""
    response = client.post(
        "/api/auth/register",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "weak"
        }
    )
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "password" in data["message"].lower()

def test_login_success(client, test_user):
    """Test successful login."""
    response = client.post(
        "/api/auth/login",
        json={
            "username": test_user.username,
            "password": "Test123!"  # Must match the password set in test_user fixture
        }
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "token" in data
    assert data["user"]["username"] == test_user.username

def test_login_invalid_credentials(client, test_user):
    """Test login with invalid credentials."""
    response = client.post(
        "/api/auth/login",
        json={
            "username": test_user.username,
            "password": "WrongPass123!"
        }
    )
    assert response.status_code == 401
    data = json.loads(response.data)
    assert "invalid password" in data["details"].lower()

def test_get_profile(client, auth_headers, test_user):
    """Test getting user profile with valid token."""
    response = client.get(
        "/api/auth/profile",
        headers=auth_headers
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["username"] == test_user.username
    assert data["email"] == test_user.email

def test_get_profile_no_token(client):
    """Test getting user profile without token."""
    response = client.get("/api/auth/profile")
    assert response.status_code == 401
    data = json.loads(response.data)
    assert "token" in data["details"].lower()