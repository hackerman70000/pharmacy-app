import pytest
from flask import json
from datetime import datetime
from unittest.mock import patch
from app.models import Order, Cart

def test_checkout_empty_cart(client, auth_headers):
    """Test checkout with empty cart."""
    response = client.post(
        "/api/payment/checkout",
        headers=auth_headers
    )
    assert response.status_code == 400
    data = json.loads(response.data)
    assert data["message"] == "Cart is empty"
    assert not data["success"]

def test_checkout_success(client, auth_headers, test_cart, test_products):
    """Test successful checkout process."""
    with patch('app.routes.payment.send_order_confirmation_email') as mock_email:
        mock_email.return_value = True
        
        response = client.post(
            "/api/payment/checkout",
            headers=auth_headers
        )
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["success"]
        assert "order" in data
        assert data["email_sent"]
        
        order = data["order"]
        assert order["amount"] == test_products[0].price * test_cart.quantity
        assert len(order["items"]) == 1
        assert order["items"][0]["quantity"] == test_cart.quantity

def test_checkout_with_multiple_items(client, auth_headers, test_user, test_products, db_session):
    """Test checkout with multiple items in cart."""

    cart_items = [
        Cart(user_id=test_user.id, product_id=test_products[0].id, quantity=2),
        Cart(user_id=test_user.id, product_id=test_products[1].id, quantity=1)
    ]
    
    for item in cart_items:
        db_session.add(item)
    db_session.commit()
    
    with patch('app.routes.payment.send_order_confirmation_email') as mock_email:
        mock_email.return_value = True
        response = client.post(
            "/api/payment/checkout",
            headers=auth_headers
        )
        
        assert response.status_code == 200
        data = json.loads(response.data)
        assert data["success"]
        
        expected_total = (test_products[0].price * 2) + (test_products[1].price * 1)
        assert data["order"]["amount"] == expected_total
        assert len(data["order"]["items"]) == 2

def test_get_orders(client, auth_headers, test_user, db_session):
    """Test getting user's order history."""

    order = Order(
        user_id=test_user.id,
        payment_intent_id="TEST-123",
        amount=99.99,
        status="completed",
        items=json.dumps([{
            "product_id": 1,
            "quantity": 1,
            "name": "Test Product",
            "unit_price": 99.99,
            "total": 99.99
        }]),
        created_at=datetime.utcnow()
    )
    db_session.add(order)
    db_session.commit()
    
    response = client.get(
        "/api/payment/orders",
        headers=auth_headers
    )
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["success"]
    assert len(data["orders"]) == 1
    assert data["orders"][0]["order_number"] == "TEST-123"
    assert data["orders"][0]["amount"] == 99.99

def test_get_specific_order(client, auth_headers, test_user, db_session):
    """Test getting specific order details."""
    order = Order(
        user_id=test_user.id,
        payment_intent_id="TEST-456",
        amount=149.99,
        status="completed",
        items=json.dumps([{
            "product_id": 1,
            "quantity": 1,
            "name": "Test Product",
            "unit_price": 149.99,
            "total": 149.99
        }]),
        created_at=datetime.utcnow()
    )
    db_session.add(order)
    db_session.commit()
    
    response = client.get(
        f"/api/payment/orders/{order.id}",
        headers=auth_headers
    )
    
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data["success"]
    assert data["order"]["order_number"] == "TEST-456"
    assert data["order"]["amount"] == 149.99

def test_get_nonexistent_order(client, auth_headers):
    """Test getting an order that doesn't exist."""
    response = client.get(
        "/api/payment/orders/99999",
        headers=auth_headers
    )
    
    assert response.status_code == 404
    data = json.loads(response.data)
    assert not data["success"]
    assert "not found" in data["message"].lower()

def test_get_order_invalid_id(client, auth_headers):
    """Test getting order with invalid ID format."""
    response = client.get(
        "/api/payment/orders/invalid",
        headers=auth_headers
    )
    
    assert response.status_code == 400
    data = json.loads(response.data)
    assert not data["success"]
    assert "invalid" in data["message"].lower()