from datetime import datetime, timedelta

from app.models import Product, db


def seed_products():
    """Seed the database with example pharmacy products."""
    products = [
        Product(
            name="Aspirin 500mg",
            manufacturer="Bayer",
            description="Pain relief and fever reduction tablets",
            price=9.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="",
        ),
        Product(
            name="Vitamin C 1000mg",
            manufacturer="Nature's Best",
            description="Immune system support supplements",
            price=14.99,
            expiry_date=datetime.now() + timedelta(days=730),
            image_url="",
        ),
        Product(
            name="Ibuprofen 200mg",
            manufacturer="Advil",
            description="Anti-inflammatory pain relief",
            price=11.99,
            expiry_date=datetime.now() + timedelta(days=365),
            image_url="",
        ),
        Product(
            name="Allergy Relief",
            manufacturer="Claritin",
            description="24-hour allergy relief tablets",
            price=19.99,
            expiry_date=datetime.now() + timedelta(days=545),
            image_url="",
        ),
        Product(
            name="First Aid Kit",
            manufacturer="Johnson & Johnson",
            description="Basic first aid supplies",
            price=24.99,
            expiry_date=datetime.now() + timedelta(days=1095),
            image_url="",
        ),
    ]

    for product in products:
        existing_product = Product.query.filter_by(name=product.name).first()
        if not existing_product:
            db.session.add(product)

    db.session.commit()
    print("Products seeded successfully!")
