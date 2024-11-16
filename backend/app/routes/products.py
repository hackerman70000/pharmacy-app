from flask import Blueprint, jsonify
from sqlalchemy.exc import SQLAlchemyError

from app.models import Product

products_bp = Blueprint("products", __name__)


@products_bp.route("/", methods=["GET"])
def get_products():
    try:
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
    except SQLAlchemyError as e:
        return jsonify({"message": "Database error", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"message": "Failed to fetch products", "details": str(e)}), 500


@products_bp.route("/<product_id>", methods=["GET"])
def get_product(product_id):
    try:
        try:
            product_id = int(product_id)
            if product_id <= 0:
                return jsonify(
                    {
                        "message": "Invalid product ID",
                        "details": "Product ID must be a positive integer",
                    }
                ), 400
        except ValueError:
            return jsonify(
                {
                    "message": "Invalid product ID",
                    "details": "Product ID must be a valid number",
                }
            ), 400

        product = Product.query.get(product_id)

        if not product:
            return jsonify(
                {
                    "message": "Product not found",
                    "details": f"No product found with id {product_id}",
                }
            ), 404

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

    except SQLAlchemyError as e:
        return jsonify({"message": "Database error", "details": str(e)}), 500
    except Exception as e:
        return jsonify({"message": "Failed to fetch product", "details": str(e)}), 500
