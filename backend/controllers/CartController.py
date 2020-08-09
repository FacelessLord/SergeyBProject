from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc, ProductBatch, User
from backend.finq import FINQ
from backend.result import Fail


class CartController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_cart_for_user(self, user):
        cart = FINQ(user.cart).filter(lambda b: not b.ordered).map(self.createBatchJson).to_list()
        return cart

    def createBatchJson(self, batch: ProductBatch):
        product = batch.product
        return {
            "cardId": product.id,
            "batchId": batch.id,
            "header": product.name,
            "description": product.description,
            "provider_id": product.provider.id,
            "price": product.price,
            "summary": product.price * batch.amount,
            "amount": batch.amount
        }

    def add_item_to_cart(self, item_id, user, amount):
        if amount <= 0:
            raise Fail("wrongAmount")
        self.db.add_item_to_cart(customer=user.id, product=item_id, amount=amount)
        self.db.commit()

    def remove_item_from_cart(self, batch_id, user):
        batch = self.db.get_item_from_cart(batch_id)
        if not batch:
            raise Fail("nobatch")
        if batch.customer != user:
            raise Fail("nopermission")

        self.db.remove_batch(batch)
        self.db.commit()

    def order(self, user):
        self.db.create_order(user)
        self.db.commit()
