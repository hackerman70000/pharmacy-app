from flask import render_template
from flask_mail import Mail, Message

mail = Mail()


def send_order_confirmation_email(order):
    msg = Message(
        "Order Confirmation",
        sender="pharmacy@example.com",
        recipients=[order.user.email],
    )
    msg.html = render_template(
        "email/order_confirmation.html", order=order, user=order.user
    )
    mail.send(msg)
