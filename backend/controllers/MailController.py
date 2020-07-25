from typing import List

from flask_mail import Message, Mail

from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc


class MailController(Controller):
    def __init__(self, app, db: dbc):
        super().__init__(db)
        self.app = app
        self.mail = Mail(app)

    def send_plaintext_message(self, subject: str, recipients: List[str], text: str):
        msg = Message(subject, recipients=recipients)
        msg.body = text
        self.mail.send(msg)

    def send_html_message(self, subject: str, recipients: List[str], html: str):
        msg = Message(subject, recipients=recipients)
        msg.html = html
        self.mail.send(msg)
