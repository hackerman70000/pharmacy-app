import pytest
import json
from unittest.mock import patch, MagicMock
from datetime import datetime
from app.utils import send_order_confirmation_email
from app.models import Order, User


@pytest.fixture
def mock_order():
    """Create a mock order for testing."""
    user = User(
        id=1, username="testuser", email="test@example.com", password="hashedpassword"
    )

    order = Order(
        id=1,
        user_id=1,
        payment_intent_id="TEST-ORDER-123",
        amount=299.97,
        status="completed",
        items=json.dumps(
            [
                {
                    "product_id": 1,
                    "name": "Test Medicine",
                    "quantity": 3,
                    "unit_price": 99.99,
                    "total": 299.97,
                }
            ]
        ),
        created_at=datetime(2024, 1, 1, 12, 0, 0),
        user=user,
    )
    return order


def test_send_order_confirmation_email_success(mock_order):
    """Test successful order confirmation email sending."""
    with patch("app.utils.mail.send") as mock_send:
        mock_send.return_value = None

        result = send_order_confirmation_email(mock_order)

        assert result is True
        mock_send.assert_called_once()

        call_args = mock_send.call_args
        msg = call_args[0][0]

        assert msg.subject == f"Order Confirmation #{mock_order.payment_intent_id}"
        assert msg.recipients == [mock_order.user.email]
        assert mock_order.payment_intent_id in msg.body
        assert f"${mock_order.amount:.2f}" in msg.body


def test_send_order_confirmation_email_with_invalid_items(mock_order):
    """Test email sending with invalid items JSON."""
    mock_order.items = "invalid json"

    with patch("app.utils.mail.send") as mock_send:
        mock_send.return_value = None

        result = send_order_confirmation_email(mock_order)

        assert result is True
        mock_send.assert_called_once()


def test_send_order_confirmation_email_with_empty_items(mock_order):
    """Test email sending with empty items list."""
    mock_order.items = "[]"

    with patch("app.utils.mail.send") as mock_send:
        mock_send.return_value = None

        result = send_order_confirmation_email(mock_order)

        assert result is True
        mock_send.assert_called_once()


def test_send_order_confirmation_email_failure(mock_order):
    """Test handling of email sending failure."""
    with patch("app.utils.mail.send") as mock_send:
        mock_send.side_effect = Exception("Email sending failed")

        result = send_order_confirmation_email(mock_order)

        assert result is False
        mock_send.assert_called_once()


def test_send_order_confirmation_email_template_rendering(mock_order):
    """Test that email template is properly rendered."""
    with (
        patch("app.utils.mail.send") as mock_send,
        patch("app.utils.render_template") as mock_render,
    ):
        mock_render.return_value = "<html>Test Template</html>"

        send_order_confirmation_email(mock_order)

        mock_render.assert_called_once_with(
            "email/order_confirmation.html",
            order=mock_order,
            user=mock_order.user,
            items=json.loads(mock_order.items),
        )

        msg = mock_send.call_args[0][0]
        assert msg.html == "<html>Test Template</html>"
