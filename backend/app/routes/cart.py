from flask import Blueprint, jsonify, request

from app.models import Cart, Product, db
from app.routes.auth import token_required

cart_bp = Blueprint("cart", __name__)


@cart_bp.route("/", methods=["GET"])
@token_required
def get_cart(current_user):
    try:
        cart_items = Cart.query.filter_by(user_id=current_user.id).all()
        return jsonify(
            [
                {
                    "id": item.id,
                    "product": {
                        "id": item.product_id,
                        "name": Product.query.get(item.product_id).name,
                        "price": Product.query.get(item.product_id).price,
                    },
                    "quantity": item.quantity,
                }
                for item in cart_items
            ]
        )
    except Exception as e:
        return jsonify(
            {"message": "Failed to fetch cart items", "details": str(e)}
        ), 500


@cart_bp.route("/add", methods=["POST"])
@token_required
def add_to_cart(current_user):
    try:
        data = request.get_json()

        if not data:
            return jsonify(
                {"message": "Invalid request", "details": "No JSON data provided"}
            ), 400

        if not all(k in data for k in ["product_id", "quantity"]):
            return jsonify(
                {
                    "message": "Missing required fields",
                    "details": "Both product_id and quantity are required",
                }
            ), 400

        if not isinstance(data["quantity"], int) or data["quantity"] <= 0:
            return jsonify(
                {
                    "message": "Invalid quantity",
                    "details": "Quantity must be a positive integer",
                }
            ), 400

        product = Product.query.get(data["product_id"])
        if not product:
            return jsonify(
                {
                    "message": "Product not found",
                    "details": f"Product with id {data['product_id']} does not exist",
                }
            ), 404

        cart_item = Cart.query.filter_by(
            user_id=current_user.id, product_id=data["product_id"]
        ).first()

        if cart_item:
            cart_item.quantity += data["quantity"]
        else:
            cart_item = Cart(
                user_id=current_user.id,
                product_id=data["product_id"],
                quantity=data["quantity"],
            )
            db.session.add(cart_item)

        db.session.commit()
        return jsonify(
            {
                "message": "Product added to cart successfully",
                "cart_item": {
                    "id": cart_item.id,
                    "product_id": cart_item.product_id,
                    "quantity": cart_item.quantity,
                },
            }
        )

    except Exception as e:
        db.session.rollback()
        return jsonify(
            {"message": "Failed to add product to cart", "details": str(e)}
        ), 500


@cart_bp.route("/remove/<int:cart_item_id>", methods=["DELETE"])
@token_required
def remove_from_cart(current_user, cart_item_id):
    try:
        cart_item = Cart.query.filter_by(
            id=cart_item_id, user_id=current_user.id
        ).first()

        if not cart_item:
            return jsonify(
                {
                    "message": "Cart item not found",
                    "details": "The specified item does not exist in your cart",
                }
            ), 404

        db.session.delete(cart_item)
        db.session.commit()

        return jsonify(
            {
                "message": "Product removed from cart successfully",
                "cart_item_id": cart_item_id,
            }
        )

    except Exception as e:
        db.session.rollback()
        return jsonify(
            {"message": "Failed to remove product from cart", "details": str(e)}
        ), 500


@cart_bp.route("/update/<int:cart_item_id>", methods=["PUT"])
@token_required
def update_cart_item(current_user, cart_item_id):
    try:
        data = request.get_json()

        if not data:
            return jsonify(
                {"message": "Invalid request", "details": "No JSON data provided"}
            ), 400

        if "quantity" not in data:
            return jsonify(
                {
                    "message": "Missing required field",
                    "details": "Quantity field is required",
                }
            ), 400

        if not isinstance(data["quantity"], int) or data["quantity"] <= 0:
            return jsonify(
                {
                    "message": "Invalid quantity",
                    "details": "Quantity must be a positive integer",
                }
            ), 400

        cart_item = Cart.query.filter_by(
            id=cart_item_id, user_id=current_user.id
        ).first()

        if not cart_item:
            return jsonify(
                {
                    "message": "Cart item not found",
                    "details": "The specified item does not exist in your cart",
                }
            ), 404

        cart_item.quantity = data["quantity"]
        db.session.commit()

        return jsonify(
            {
                "message": "Cart item updated successfully",
                "cart_item": {
                    "id": cart_item.id,
                    "product_id": cart_item.product_id,
                    "quantity": cart_item.quantity,
                },
            }
        )

    except Exception as e:
        db.session.rollback()
        return jsonify(
            {"message": "Failed to update cart item", "details": str(e)}
        ), 500
