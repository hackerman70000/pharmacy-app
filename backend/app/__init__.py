from config import Config
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

from app.utils import mail

db = SQLAlchemy()
migrate = Migrate()


def create_app(config_class=Config):
    app = Flask(__name__, static_url_path="/static", static_folder="static")
    CORS(app)
    app.config.from_object(config_class)

    # Initialize database
    db.init_app(app)
    migrate.init_app(app, db)

    # Initialize Flask-Mail
    mail.init_app(app)

    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.cart import cart_bp
    from app.routes.payment import payment_bp
    from app.routes.products import products_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(products_bp, url_prefix="/api/products")
    app.register_blueprint(cart_bp, url_prefix="/api/cart")
    app.register_blueprint(payment_bp, url_prefix="/api/payment")

    # Register CLI commands
    from app.cli.commands import seed_cli

    app.cli.add_command(seed_cli)

    return app
