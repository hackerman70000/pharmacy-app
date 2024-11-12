from flask import Blueprint, jsonify

from app.models import Product

products_bp = Blueprint("products", __name__)


@products_bp.route("/", methods=["GET"])
def get_products():
    products = Product.query.all()
    return jsonify(
        [
            {
                "id": product.id,
                "name": product.name,
                "manufacturer": product.manufacturer,
                "description": product.description,
                "price": product.price,
                "expiry_date": product.expiry_date.isoformat(),
            }
            for product in products
        ]
    )


@products_bp.route("/<int:product_id>", methods=["GET"])
def get_product(product_id):
    product = Product.query.get_or_404(product_id)
    return jsonify(
        {
            "id": product.id,
            "name": product.name,
            "manufacturer": product.manufacturer,
            "description": product.description,
            "price": product.price,
            "expiry_date": product.expiry_date.isoformat(),
        }
    )
