from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc, ProductBatch, User
from backend.finq import FINQ


class CartController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_cart_for_user(self, username, accessToken):
        user = self.db.get_user_by_name(username)
        if not user:
            return {"success": False, "reason": "nouser"}
        if user.accessToken != accessToken:
            return {"success": False, "reason": "not_authorized"}

        cart = FINQ(user.cart).filter(lambda b: not b.ordered).map(self.createBatchJson).to_list()
        print(cart)
        return {'items': cart, "success": True}

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

    def add_item_to_cart(self, item_id, username, accessToken, amount):
        if amount <= 0:
            return {"success": False, "reason": "wrongAmount"}
        user = self.db.get_user_by_name(username)
        if not user:
            return {"success": False, "reason": "nouser"}
        if user.accessToken != accessToken:
            return {"success": False, "reason": "not_authorized"}
        self.db.add_item_to_cart(customer=user.id, product=item_id, amount=amount)
        self.db.commit()
        return {"success": True}

    def remove_item_from_cart(self, batch_id, username, accessToken):
        user = self.db.get_user_by_name(username)
        if not user:
            return {"success": False, "reason": "nouser"}
        if user.accessToken != accessToken:
            return {"success": False, "reason": "not_authorized"}
        batch = self.db.get_item_from_cart(batch_id)
        if not batch:
            return {"success": False, "reason": "nobatch"}
        self.db.remove_batch(batch)
        self.db.commit()

    def order(self, username, accessToken):
        user = self.db.get_user_by_name(username)
        if not user:
            return {"success": False, "reason": "nouser"}
        if user.accessToken != accessToken:
            return {"success": False, "reason": "not_authorized"}
        self.db.create_order(user)
        self.db.commit()
        return {"success": True}
