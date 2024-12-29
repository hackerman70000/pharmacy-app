import pytest
from flask import json
from datetime import datetime


def test_get_products(client, test_products):
    """Test getting all products."""
    response = client.get("/api/products/")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) == len(test_products)
    assert data[0]["name"] == test_products[0].name
    assert data[0]["price"] == test_products[0].price
    assert "expiry_date" in data[0]


def test_get_product_by_id(client, test_products):
    """Test getting a specific product by ID."""
    product_id = test_products[0].id
    response = client.get(f"/api/products/{product_id}")
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["name"] == test_products[0].name
    assert data["manufacturer"] == test_products[0].manufacturer
    assert data["description"] == test_products[0].description
    assert data["price"] == test_products[0].price


def test_get_product_invalid_id(client):
    """Test getting a product with invalid ID."""
    response = client.get("/api/products/999")
    assert response.status_code == 404
    data = json.loads(response.data)
    assert "no product found with id 999" in data["details"].lower()


def test_get_product_invalid_id_format(client):
    """Test getting a product with invalid ID format."""
    response = client.get("/api/products/invalid")
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "invalid" in data["message"].lower()


def test_product_expiry_date_format(client, test_products):
    """Test that product expiry date is returned in ISO format."""
    product_id = test_products[0].id
    response = client.get(f"/api/products/{product_id}")
    assert response.status_code == 200
    data = json.loads(response.data)
    try:
        datetime.fromisoformat(data["expiry_date"])
    except ValueError:
        pytest.fail("expiry_date is not in ISO format")
