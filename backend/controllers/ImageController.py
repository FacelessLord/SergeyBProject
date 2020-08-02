import base64
import os

import flask

from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc
from backend.utils import send_image


class ImageController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_main_image(self, product_id: int):
        product = self.db.get_product(product_id)
        if not product or product.img_count == 0:
            return send_image("images/default.png")
        return send_image(f"images/{product_id}/img_0")

    def get_image_for_id(self, product_id: int, img_id: int):
        product = self.db.get_product(product_id)
        if not product or product.img_count <= img_id:
            return send_image("images/default.png")
        return send_image(f"images/{product_id}/img_{img_id}")

    def load_image(self, product_id: int, image):
        product = self.db.get_product(product_id)
        if not product:
            return {"success": False, "reason": "noproduct"}
        if not os.path.exists(f"images/{product_id}"):
            os.mkdir(f"images/{product_id}")

        print(image[:100])
        with open(f"images/{product_id}/img_{product.img_count}", 'wb') as f:
            f.write(base64.b64decode(image[len("data:image/png;base64,"):]))

        product.img_count += 1
        self.db.commit()

        return {"success": True}
