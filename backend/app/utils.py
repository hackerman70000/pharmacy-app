from flask import render_template
from flask_mail import Mail, Message
from flask import current_app
import json

mail = Mail()


def send_order_confirmation_email(order):
    """Send order confirmation email with receipt to customer"""
    try:
        msg = Message(
            f"Order Confirmation #{order.payment_intent_id}",
            sender=current_app.config["MAIL_DEFAULT_SENDER"],
            recipients=[order.user.email],
        )

        try:
            items = json.loads(order.items) if order.items else []
        except:
            items = []
            current_app.logger.error("Failed to parse order items")

        msg.html = render_template(
            "email/order_confirmation.html", order=order, user=order.user, items=items
        )

        items_text = "\n".join(
            [
                f"- {item['name']}: {item['quantity']} x ${item['unit_price']:.2f} = ${item['total']:.2f}"
                for item in items
            ]
        )

        msg.body = f"""
        Order Confirmation #{order.payment_intent_id}
        
        Thank you for your order!
        
        Order Details:
        Date: {order.created_at.strftime('%Y-%m-%d %H:%M:%S')}
        
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
