import pytest
from flask import json


def test_get_cart(client, auth_headers, test_cart):
    """Test getting user's cart items."""
    response = client.get("/api/cart/", headers=auth_headers)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) == 1
    assert data[0]["quantity"] == test_cart.quantity
    assert data[0]["product"]["id"] == test_cart.product_id


def test_add_to_cart(client, auth_headers, test_products):
    """Test adding item to cart."""
    response = client.post(
        "/api/cart/add",
        headers=auth_headers,
        json={"product_id": test_products[0].id, "quantity": 1},
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "cart_item" in data
    assert data["cart_item"]["quantity"] == 1
    assert data["cart_item"]["product_id"] == test_products[0].id


def test_add_to_cart_invalid_product(client, auth_headers):
    """Test adding non-existent product to cart."""
    response = client.post(
        "/api/cart/add", headers=auth_headers, json={"product_id": 999, "quantity": 1}
    )
    assert response.status_code == 404
    data = json.loads(response.data)
    assert "does not exist" in data["details"]


def test_add_to_cart_invalid_quantity(client, auth_headers, test_products):
    """Test adding item with invalid quantity."""
    response = client.post(
        "/api/cart/add",
        headers=auth_headers,
        json={"product_id": test_products[0].id, "quantity": -1},
    )
    assert response.status_code == 400
    data = json.loads(response.data)
    assert "quantity" in data["message"].lower()


def test_update_cart_item(client, auth_headers, test_cart):
    """Test updating cart item quantity."""
    response = client.put(
        f"/api/cart/update/{test_cart.id}", headers=auth_headers, json={"quantity": 5}
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["cart_item"]["quantity"] == 5
    assert data["cart_item"]["id"] == test_cart.id


def test_remove_from_cart(client, auth_headers, test_cart):
    """Test removing item from cart."""
    response = client.delete(f"/api/cart/remove/{test_cart.id}", headers=auth_headers)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "removed" in data["message"].lower()


def test_remove_partial_quantity(client, auth_headers, test_cart):
    """Test removing partial quantity from cart."""
    original_quantity = test_cart.quantity
    response = client.delete(
        f"/api/cart/remove/{test_cart.id}?quantity=1", headers=auth_headers
    )
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["details"]["quantity_removed"] == 1
    assert data["details"]["remaining_quantity"] == original_quantity - 1


def test_cart_unauthorized(client):
    """Test accessing cart without authentication."""
    response = client.get("/api/cart/")
    assert response.status_code == 401
