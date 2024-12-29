from flask import Blueprint, jsonify, request, current_app
from app.models import Cart, Order, Product, db
from app.routes.auth import token_required
from app.utils import send_order_confirmation_email
from datetime import datetime
import json
import uuid

payment_bp = Blueprint("payment", __name__)


def generate_order_number():
    """Generate a unique order number"""
    timestamp = datetime.utcnow().strftime("%Y%m%d")
    unique_id = str(uuid.uuid4())[:8]
    return f"PH-{timestamp}-{unique_id}"


def parse_order_items(items_str):
    """Safely parse order items JSON string"""
    try:
        if not items_str:
            return []
        return json.loads(items_str)
    except json.JSONDecodeError:
        current_app.logger.error(f"Failed to parse order items: {items_str}")
        return []


@payment_bp.route("/checkout", methods=["POST"])
@token_required
def checkout(current_user):
    """Process checkout for the current user's cart"""
    try:
        cart_items = Cart.query.filter_by(user_id=current_user.id).all()

        if not cart_items:
            return jsonify({"success": False, "message": "Cart is empty"}), 400

        total_amount = 0
        items_data = []

        for cart_item in cart_items:
            product = Product.query.get(cart_item.product_id)
            if not product:
                return jsonify(
                    {
                        "success": False,
                        "message": f"Product with id {cart_item.product_id} not found",
                    }
                ), 404

            item_total = product.price * cart_item.quantity
            total_amount += item_total

            items_data.append(
                {
                    "product_id": product.id,
                    "name": product.name,
                    "quantity": cart_item.quantity,
                    "unit_price": product.price,
                    "total": item_total,
                }
            )

        order = Order(
            user_id=current_user.id,
            payment_intent_id=generate_order_number(),
            amount=total_amount,
            status="completed",
            items=json.dumps(items_data),
            created_at=datetime.utcnow(),
        )

        Cart.query.filter_by(user_id=current_user.id).delete()

        db.session.add(order)
        db.session.commit()

        email_sent = send_order_confirmation_email(order)

        return jsonify(
            {
                "success": True,
                "message": "Order placed successfully",
                "email_sent": email_sent,
                "order": {
                    "id": order.id,
                    "order_number": order.payment_intent_id,
                    "amount": order.amount,
                    "items": items_data,
                    "created_at": order.created_at.isoformat(),
                },
            }
        )

    except Exception as e:
        db.session.rollback()
        current_app.logger.error(f"Checkout failed: {str(e)}")
        return jsonify(
            {"success": False, "message": "Failed to process order", "details": str(e)}
        ), 500


@payment_bp.route("/orders", methods=["GET"])
@token_required
def get_orders(current_user):
    """Get all orders for the current user"""
    try:
        orders = (
            Order.query.filter_by(user_id=current_user.id)
            .order_by(Order.created_at.desc())
            .all()
        )

        orders_data = []
        for order in orders:
            items = parse_order_items(order.items)
            orders_data.append(
                {
                    "id": order.id,
                    "order_number": order.payment_intent_id,
                    "amount": order.amount,
                    "status": order.status,
                    "items": items,
                    "created_at": order.created_at.isoformat(),
                }
            )

        return jsonify({"success": True, "orders": orders_data})

    except Exception as e:
        current_app.logger.error(f"Failed to fetch orders: {str(e)}")
        return jsonify(
            {"success": False, "message": "Failed to fetch orders", "details": str(e)}
        ), 500


@payment_bp.route("/orders/<order_id>", methods=["GET"])
@token_required
def get_order(current_user, order_id):
    """Get specific order details"""
    try:
        try:
            order_id = int(order_id)
        except ValueError:
            return jsonify(
                {
                    "success": False,
                    "message": "Invalid order ID format",
                    "details": "Order ID must be a valid number",
                }
            ), 400

        if order_id <= 0:
            return jsonify(
                {
                    "success": False,
                    "message": "Invalid order ID",
                    "details": "Order ID must be a positive integer",
                }
            ), 400

        order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()

        if not order:
            return jsonify(
                {
                    "success": False,
                    "message": "Order not found",
                    "details": "The specified order does not exist or doesn't belong to you",
                }
            ), 404

        items = parse_order_items(order.items)

        return jsonify(
            {
                "success": True,
                "order": {
                    "id": order.id,
                    "order_number": order.payment_intent_id,
                    "amount": order.amount,
                    "status": order.status,
                    "items": items,
                    "created_at": order.created_at.isoformat(),
                },
            }
        )

    except Exception as e:
        current_app.logger.error(f"Failed to fetch order details: {str(e)}")
        return jsonify(
            {
                "success": False,
                "message": "Failed to fetch order details",
                "details": str(e),
            }
        ), 500
