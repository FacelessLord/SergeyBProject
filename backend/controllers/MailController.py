from typing import List

from flask_mail import Message, Mail

from backend.controllers.CartController import CartController
from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController


class MailController(Controller):
    def __init__(self, app, db: DatabaseController, carts: CartController):
        super().__init__(db)
        self.app = app
        self.mail = Mail(app)
        self.carts = carts

    def send_plaintext_message(self, subject: str, recipients: List[str], text: str):
        msg = Message(subject, recipients=recipients)
        msg.body = text
        self.mail.send(msg)

    def send_html_message(self, subject: str, recipients: List[str], html: str):
        msg = Message(subject, recipients=recipients)
        msg.html = html
        self.mail.send(msg)

    def notify_ordered(self, order):
        order_list = self.carts.create_order_list(order)
        customer_email = order.customer.email
        customer_message = f'Ваш заказ:\n\n{order_list}'
        producer_message = f'Заказ № {order.id}:\n\nНомер телефона заказчика: {order.customer.phone_number}\nИмя заказчика: {order.customer.name if order.customer.name else order.customer.username}\n\n{order_list}'
        self.send_plaintext_message("Уведомление о заказе", [customer_email], customer_message)
        self.send_plaintext_message("Уведомление о заказе", [self.app.config['MAIL_DEFAULT_SENDER']], producer_message)
        print("Order")
        print(producer_message)
