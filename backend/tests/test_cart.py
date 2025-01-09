import pytest
from flask import json
from app.models import Product, Cart


def test_get_cart(client, auth_headers, test_cart):
    """Test getting user's cart items."""
    response = client.get("/api/cart/", headers=auth_headers)
    assert response.status_code == 200
    data = json.loads(response.data)
    assert "items" in data
    assert "total" in data
    assert len(data["items"]) == 1
    assert data["items"][0]["quantity"] == test_cart.quantity
    assert data["items"][0]["product"]["id"] == test_cart.product_id
    assert data["total"] == test_cart.quantity * Product.query.get(test_cart.product_id).price


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

def test_get_cart_order_and_total(client, auth_headers, test_user, test_products, db_session):
    """Test cart sorting by ID and total price calculation."""

    cart_items = [
        Cart(user_id=test_user.id, product_id=test_products[0].id, quantity=2),
        Cart(user_id=test_user.id, product_id=test_products[0].id, quantity=1),
        Cart(user_id=test_user.id, product_id=test_products[1].id, quantity=3),
    ]

    for item in cart_items:
        db_session.add(item)
    db_session.commit()

    expected_total = (
        test_products[0].price * 2 +
        test_products[0].price * 1 +
        test_products[1].price * 3
    )

    response = client.get("/api/cart/", headers=auth_headers)
    assert response.status_code == 200
    data = json.loads(response.data)

    assert "items" in data
    assert "total" in data

    items = data["items"]
    assert len(items) == 3
    assert items[0]["product"]["id"] == test_products[0].id
    assert items[1]["product"]["id"] == test_products[0].id
    assert items[2]["product"]["id"] == test_products[1].id

    assert data["total"] == expected_total

    response = client.put(
        f"/api/cart/update/{items[1]['id']}", 
        headers=auth_headers, 
        json={"quantity": 5}
    )
    assert response.status_code == 200

    response = client.get("/api/cart/", headers=auth_headers)
    data = json.loads(response.data)

    assert data["items"][0]["product"]["id"] == test_products[0].id
    assert data["items"][1]["product"]["id"] == test_products[0].id
    assert data["items"][2]["product"]["id"] == test_products[1].id

    new_expected_total = (
        test_products[0].price * 2 +
        test_products[0].price * 5 +
        test_products[1].price * 3
    )
    assert data["total"] == new_expected_total