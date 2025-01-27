import re
from datetime import datetime, timezone
from functools import wraps
from json import loads

from config import Config
from flask import Blueprint, jsonify, request
from pyseto import DecryptError, Key, Paseto, VerifyError
from werkzeug.security import check_password_hash, generate_password_hash

from app.models import User, db
from app.utils import send_verification_email

auth_bp = Blueprint("auth", __name__)

EMAIL_REGEX = re.compile(r"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$")

key = Key.new(version=4, purpose="local", key=Config.TOKEN_SECRET_KEY.encode())
paseto = Paseto(
    exp=Config.TOKEN_ACCESS_TOKEN_EXPIRES.total_seconds(), include_iat=True, leeway=2
)


def validate_registration_data(data):
    """Validate registration data and return tuple (is_valid, error_response)"""
    if not data:
        return False, {"message": "Invalid request", "details": "No JSON data provided"}

    required_fields = ["username", "email", "password"]
    missing_fields = [
        field
        for field in required_fields
        if field not in data or not str(data[field]).strip()
    ]

    if missing_fields:
        return False, {
            "message": "Missing required fields",
            "details": f"Following fields cannot be empty: {', '.join(missing_fields)}",
        }

    username = str(data["username"]).strip()
    if len(username) < 3:
        return False, {
            "message": "Invalid username",
            "details": "Username must be at least 3 characters long",
        }

    if not username.replace("_", "").isalnum():
        return False, {
            "message": "Invalid username",
            "details": "Username can only contain letters, numbers, and underscores",
        }

    email = str(data["email"]).strip()
    if not EMAIL_REGEX.match(email):
        return False, {
            "message": "Invalid email format",
            "details": "Please provide a valid email address",
        }

    if email.count("@") > 1:
        return False, {
            "message": "Invalid email format",
            "details": "Email cannot contain multiple @ symbols",
        }

    password = str(data["password"]).strip()
    if len(password) < 8:
        return False, {
            "message": "Weak password",
            "details": "Password must be at least 8 characters long",
        }

    if not any(c.isupper() for c in password):
        return False, {
            "message": "Weak password",
            "details": "Password must contain at least one uppercase letter",
        }

    if not any(c.islower() for c in password):
        return False, {
            "message": "Weak password",
            "details": "Password must contain at least one lowercase letter",
        }

    if not any(c.isdigit() for c in password):
        return False, {
            "message": "Weak password",
            "details": "Password must contain at least one number",
        }

    return True, None


def validate_login_data(data):
    """Validate login data and return tuple (is_valid, error_response)"""
    if not data:
        return False, {"message": "Invalid request", "details": "No JSON data provided"}

    required_fields = ["username", "password"]
    missing_fields = [
        field
        for field in required_fields
        if field not in data or not str(data[field]).strip()
    ]

    if missing_fields:
        return False, {
            "message": "Missing required fields",
            "details": f"Following fields cannot be empty: {', '.join(missing_fields)}",
        }

    return True, None


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify(
                {
                    "message": "Authorization required",
                    "details": "Token is missing in request headers",
                }
            ), 401

        try:
            if token.startswith("Bearer "):
                token = token[7:]
            data = paseto.decode(key, token)
            current_user = User.query.get(loads(data.payload.decode())["user_id"])
            if not current_user:
                return jsonify(
                    {"message": "Invalid token", "details": "User not found"}
                ), 401
        except VerifyError as e:
            return jsonify({"message": "Token expired", "details": str(e)}), 401
        except DecryptError:
            return jsonify(
                {"message": "Invalid token", "details": "Token decryption failed"}
            ), 401
        except Exception as e:
            return jsonify(
                {"message": "Token validation failed", "details": str(e)}
            ), 401

        return f(current_user, *args, **kwargs)

    return decorated


@auth_bp.route("/register", methods=["POST"])
def register():
    try:
        data = request.get_json()

        is_valid, error_response = validate_registration_data(data)
        if not is_valid:
            return jsonify(error_response), 400

        username = str(data["username"]).strip()
        email = str(data["email"]).strip().lower()
        password = str(data["password"]).strip()

        if User.query.filter_by(username=username).first():
            return jsonify(
                {
                    "message": "Username unavailable",
                    "details": "This username is already taken",
                }
            ), 409

        if User.query.filter_by(email=email).first():
            return jsonify(
                {
                    "message": "Email unavailable",
                    "details": "This email is already registered",
                }
            ), 409

        hashed_password = generate_password_hash(password)
        new_user = User(
            username=username,
            email=email,
            password=hashed_password,
            email_verified=False,
        )

        new_user.generate_verification_token()

        db.session.add(new_user)
        db.session.commit()

        if send_verification_email(new_user):
            return jsonify(
                {
                    "message": "Registration successful",
                    "details": "Please check your email to verify your account",
                    "user": {
                        "id": new_user.id,
                        "username": new_user.username,
                        "email": new_user.email,
                        "email_verified": new_user.email_verified,
                    },
                }
            ), 201
        else:
            return jsonify(
                {
                    "message": "Registration successful but verification email failed",
                    "details": "Please contact support to verify your email",
                }
            ), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Registration failed", "details": str(e)}), 500


@auth_bp.route("/verify-email/<token>", methods=["GET"])
def verify_email(token):
    try:
        user = User.query.filter_by(verification_token=token).first()

        if not user:
            return jsonify(
                {
                    "message": "Invalid verification token",
                    "details": "Token not found or already used",
                }
            ), 404

        if user.email_verified:
            return jsonify(
                {
                    "message": "Email already verified",
                    "details": "Your email has already been verified",
                }
            ), 400

        if user.verification_token_expires < datetime.now(timezone.utc):
            return jsonify(
                {
                    "message": "Verification token expired",
                    "details": "Please request a new verification email",
                }
            ), 400

        user.email_verified = True
        user.verification_token = None
        user.verification_token_expires = None
        db.session.commit()

        return jsonify(
            {
                "message": "Email verified successfully",
                "details": "You can now log in to your account",
            }
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Email verification failed", "details": str(e)}), 500


@auth_bp.route("/resend-verification", methods=["POST"])
def resend_verification():
    try:
        data = request.get_json()

        if not data or "email" not in data:
            return jsonify(
                {"message": "Invalid request", "details": "Email is required"}
            ), 400

        email = str(data["email"]).strip().lower()
        user = User.query.filter_by(email=email).first()

        if not user:
            return jsonify(
                {
                    "message": "User not found",
                    "details": "No account found with this email",
                }
            ), 404

        if user.email_verified:
            return jsonify(
                {
                    "message": "Email already verified",
                    "details": "Your email has already been verified",
                }
            ), 400

        user.generate_verification_token()
        db.session.commit()

        if send_verification_email(user):
            return jsonify(
                {
                    "message": "Verification email sent",
                    "details": "Please check your email to verify your account",
                }
            )
        else:
            return jsonify(
                {
                    "message": "Failed to send verification email",
                    "details": "Please try again later",
                }
            ), 500

    except Exception as e:
        db.session.rollback()
        return jsonify(
            {"message": "Failed to resend verification email", "details": str(e)}
        ), 500


@auth_bp.route("/login", methods=["POST"])
def login():
    try:
        data = request.get_json()

        is_valid, error_response = validate_login_data(data)
        if not is_valid:
            return jsonify(error_response), 400

        username = str(data["username"]).strip()
        password = str(data["password"]).strip()

        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify(
                {"message": "Authentication failed", "details": "User not found"}
            ), 401

        if not user.email_verified:
            return jsonify(
                {
                    "message": "Email not verified",
                    "details": "Please verify your email before logging in",
                }
            ), 401

        if not check_password_hash(user.password, password):
            return jsonify(
                {"message": "Authentication failed", "details": "Invalid password"}
            ), 401

        token = paseto.encode(
            key,
            {
                "user_id": user.id,
            },
        )

        return jsonify(
            {
                "message": "Login successful",
                "token": token.decode(),
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "email_verified": user.email_verified,
                },
            }
        )

    except Exception as e:
        return jsonify({"message": "Login failed", "details": str(e)}), 500


@auth_bp.route("/profile", methods=["GET"])
@token_required
def get_current_user(current_user):
    try:
        return jsonify(
            {
                "id": current_user.id,
                "username": current_user.username,
                "email": current_user.email,
                "email_verified": current_user.email_verified,
            }
        )
    except Exception as e:
        return jsonify({"message": "Failed to fetch profile", "details": str(e)}), 500
