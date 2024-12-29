from datetime import datetime

from flask import Blueprint, jsonify

from app.models import Cart, Order, Product, db
from app.routes.auth import token_required

payment_bp = Blueprint("payment", __name__)


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
            payment_intent_id=f"ORDER_{datetime.utcnow().strftime('%Y%m%d%H%M%S')}_{current_user.id}",
            amount=total_amount,
            status="completed",
            items=str(items_data),
            created_at=datetime.utcnow(),
        )

        Cart.query.filter_by(user_id=current_user.id).delete()

        db.session.add(order)
        db.session.commit()

        return jsonify(
            {
                "success": True,
                "message": "Order placed successfully",
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

        return jsonify(
            {
                "success": True,
                "orders": [
                    {
                        "id": order.id,
                        "order_number": order.payment_intent_id,
                        "amount": order.amount,
                        "status": order.status,
                        "items": eval(order.items) if order.items else [],
                        "created_at": order.created_at.isoformat(),
                    }
                    for order in orders
                ],
            }
        )

    except Exception as e:
        return jsonify(
            {"success": False, "message": "Failed to fetch orders", "details": str(e)}
        ), 500


@payment_bp.route("/orders/<order_id>", methods=["GET"])
@token_required
def get_order(current_user, order_id):
    """Get specific order details"""
    try:
        order = Order.query.filter_by(id=order_id, user_id=current_user.id).first()

        if not order:
            return jsonify({"success": False, "message": "Order not found"}), 404

        return jsonify(
            {
                "success": True,
                "order": {
                    "id": order.id,
                    "order_number": order.payment_intent_id,
                    "amount": order.amount,
                    "status": order.status,
                    "items": eval(order.items) if order.items else [],
                    "created_at": order.created_at.isoformat(),
                },
            }
        )

    except Exception as e:
        return jsonify(
            {
                "success": False,
                "message": "Failed to fetch order details",
                "details": str(e),
            }
        ), 500
