from api.controllers.Controller import Controller
from api.utils import send_image
from api.controllers.DatabaseController import DatabaseController as dbc


class ImageController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_main_image(self, productId: int):
        return send_image("cat1.jpg")
