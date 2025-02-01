import os
import uuid
from datetime import datetime, timedelta

import pytest
from app import create_app, db
from app.models import Cart, Product, User
from sqlalchemy import create_engine, text
from sqlalchemy.orm import scoped_session, sessionmaker
from werkzeug.security import generate_password_hash


def get_database_host():
    """Get database host based on environment."""
    return "localhost" if os.getenv("CI") else "db"


def _create_test_db():
    """Create test database if it doesn't exist."""
    db_host = get_database_host()
    default_db_url = f"postgresql://postgres:postgres@{db_host}:5432/postgres"
    engine = create_engine(default_db_url)

    with engine.connect() as conn:
        conn.execute(
            text("""
            SELECT pg_terminate_backend(pid)
            FROM pg_stat_activity
            WHERE datname = 'pharmacy_test_db'
            AND pid <> pg_backend_pid()
        """)
        )
        conn.execute(text("commit"))
        conn.execute(text("DROP DATABASE IF EXISTS pharmacy_test_db"))
        conn.execute(text("commit"))
        conn.execute(text("CREATE DATABASE pharmacy_test_db"))
        conn.execute(text("commit"))

    engine.dispose()


class TestConfig:
    """Test configuration."""

    TESTING = True
    SQLALCHEMY_DATABASE_URI = (
        f"postgresql://postgres:postgres@{get_database_host()}:5432/pharmacy_test_db"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = "test_secret_key"
    TOKEN_SECRET_KEY = "test_token_secret_key" * 2
    FRONTEND_URL = "http://localhost:8081"
    MAIL_SERVER = "localhost"
    MAIL_PORT = 25
    MAIL_USE_TLS = False
    MAIL_USERNAME = "test@example.com"
    MAIL_PASSWORD = "test_password"
    MAIL_DEFAULT_SENDER = "test@example.com"


@pytest.fixture(scope="session", autouse=True)
def create_test_database():
    """Create test database."""
    _create_test_db()
    yield


@pytest.fixture(scope="session")
def app():
    """Create and configure a new app instance for each test session."""
    app = create_app(TestConfig)

    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture(autouse=True)
def db_session(app):
    """Provide a transactional scope around each test."""
    with app.app_context():
        connection = db.engine.connect()
        transaction = connection.begin()

        session_factory = sessionmaker(bind=connection)
        session = scoped_session(session_factory)

        old_session = db.session
        db.session = session

        yield session

        session.close()
        transaction.rollback()
        connection.close()
        db.session = old_session


@pytest.fixture
def client(app):
    """A test client for the app."""
    return app.test_client()


@pytest.fixture
def test_user(db_session):
    """Create a test user."""
    unique_id = str(uuid.uuid4())
    username = f"testuser_{unique_id[:8]}"
    email = f"test_{unique_id[:8]}@example.com"

    user = User(
        username=username,
        email=email,
        password=generate_password_hash("Test123!"),
        email_verified=True,
    )
    db_session.add(user)
    db_session.commit()
    db_session.refresh(user)
    return user


@pytest.fixture
def auth_headers(test_user):
    """Generate authentication headers for test user."""
    from app.routes.auth import key, paseto

    token = paseto.encode(key, {"user_id": test_user.id}).decode()
    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def test_products(db_session):
    """Create test products."""
    unique_id1 = str(uuid.uuid4())
    unique_id2 = str(uuid.uuid4())

    products = [
        Product(
            name=f"Test Medicine 1 {unique_id1[:8]}",
            manufacturer="Test Labs",
            description="Test description 1",
            price=9.99,
            expiry_date=datetime.now() + timedelta(days=365),
        ),
        Product(
            name=f"Test Medicine 2 {unique_id2[:8]}",
            manufacturer="Test Labs",
            description="Test description 2",
            price=19.99,
            expiry_date=datetime.now() + timedelta(days=365),
        ),
    ]

    for product in products:
        db_session.add(product)
    db_session.commit()

    for product in products:
        db_session.refresh(product)

    return products


@pytest.fixture
def test_cart(test_user, test_products, db_session):
    """Create a test cart with items."""
    cart_item = Cart(user_id=test_user.id, product_id=test_products[0].id, quantity=2)
    db_session.add(cart_item)
    db_session.commit()
    db_session.refresh(cart_item)
    return cart_item
