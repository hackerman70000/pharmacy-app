from flask import current_app, render_template
from flask_mail import Mail, Message

mail = Mail()


def send_order_confirmation_email(order):
    """Send order confirmation email with receipt to customer"""
    try:
        msg = Message(
            f"Order Confirmation #{order.payment_intent_id}",
            sender=current_app.config["MAIL_DEFAULT_SENDER"],
            recipients=[order.user.email],
        )

        msg.html = render_template(
            "email/order_confirmation.html",
            order=order,
            user=order.user,
            items=order.items,
        )

        items_text = "\n".join(
            [
                f"- {item.product.name}: {item.quantity} x ${item.unit_price:.2f} = ${item.total:.2f}"
                for item in order.items
            ]
        )

        msg.body = f"""
        Order Confirmation #{order.payment_intent_id}
        
        Thank you for your order!
        
        Order Details:
        Date: {order.created_at.strftime("%Y-%m-%d %H:%M:%S")}
        
        Items:
        {items_text}
        
        Total Amount: ${order.amount:.2f}
        
        Your order will be processed shortly.
        """

        mail.send(msg)
        return True
    except Exception as e:
        current_app.logger.error(f"Failed to send order confirmation email: {str(e)}")
        return False


def send_verification_email(user):
    """Send email verification link to user"""
    try:
        current_app.logger.info(f"Attempting to send email to: {user.email}")

        verification_url = f"{current_app.config['FRONTEND_URL']}/verify-email?token={user.verification_token}"

        msg = Message(
            "Verify Your Email",
            sender=current_app.config["MAIL_DEFAULT_SENDER"],
            recipients=[user.email],
        )

        msg.html = render_template(
            "email/verify_email.html",
            username=user.username,
            verification_url=verification_url,
        )

        msg.body = f"""
        Hello {user.username},
        
        Thank you for registering. Please verify your email by clicking the link below:
        
        {verification_url}
        
        This link will expire in 24 hours.
        
        If you didn't create an account, please ignore this email.
        """

        mail.send(msg)
        return True
    except Exception as e:
        current_app.logger.error(f"Failed to send verification email: {str(e)}")
        return False
