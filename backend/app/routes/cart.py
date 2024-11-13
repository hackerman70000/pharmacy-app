from flask import Blueprint, jsonify, request

from app.models import Cart, Product, db
from app.routes.auth import token_required

cart_bp = Blueprint("cart", __name__)


@cart_bp.route("/", methods=["GET"])
@token_required
def get_cart(current_user):
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


@cart_bp.route("/add", methods=["POST"])
@token_required
def add_to_cart(current_user):
    data = request.get_json()

    if not all(k in data for k in ["product_id", "quantity"]):
        return jsonify({"message": "Missing required fields"}), 400

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
    return jsonify({"message": "Product added to cart successfully"})


@cart_bp.route("/remove/<int:cart_item_id>", methods=["DELETE"])
@token_required
def remove_from_cart(current_user, cart_item_id):
    cart_item = Cart.query.filter_by(
        id=cart_item_id, user_id=current_user.id
    ).first_or_404()

    db.session.delete(cart_item)
    db.session.commit()

    return jsonify({"message": "Product removed from cart successfully"})


@cart_bp.route("/update/<int:cart_item_id>", methods=["PUT"])
@token_required
def update_cart_item(current_user, cart_item_id):
    data = request.get_json()

    if "quantity" not in data:
        return jsonify({"message": "Missing quantity field"}), 400

    cart_item = Cart.query.filter_by(
        id=cart_item_id, user_id=current_user.id
    ).first_or_404()

    cart_item.quantity = data["quantity"]
    db.session.commit()

    return jsonify({"message": "Cart item updated successfully"})
