from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc, ProductBatch, Order
from backend.finq import FINQ
from backend.result import Fail


class CartController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_order(self, user, orderId):
        order = self.db.get_order(orderId)
        count = 0
        for batch in order.batches:
            count += batch.amount
        if order.customer != user and user.permission_level == 0:
            raise Fail("nopermission")

        batches = FINQ(order.batches).map(lambda b: self.createBatchJson(b, user.permission_level > 0)).to_list()
        dict = {
            "summary": order.summary,
            "count": count,
            "date_created": str(order.created_on.strftime("%H:%M %d/%m/%Y")),
            "batches": batches
        }
        if user.permission_level > 0:
            dict['customer_username'] = order.customer.username
            dict['customer_name'] = order.customer.name
            dict['customer_phone'] = order.customer.phone_number
        return dict

    def get_cart_for_user(self, user):
        cart = FINQ(user.cart).filter(lambda b: not b.ordered).map(self.createBatchJson).to_list()
        return cart

    def createBatchJson(self, batch: ProductBatch, include_name=False):
        product = batch.product
        dict = {
            "cardId": product.id,
            "batchId": batch.id,
            "header": product.name,
            "description": product.description,
            "provider_id": product.provider.id,
            "price": product.price,
            "summary": product.price * batch.amount,
            "amount": batch.amount
        }
        if include_name:
            dict['customer_name'] = batch.customer.username
        return dict

    def get_orders(self, user):
        orders = FINQ(self.db.orders()) if user.permission_level > 0 else FINQ(user.orders)
        return orders \
            .filter(lambda o: len(o.batches) > 0) \
            .map(lambda o: self.createOrderJson(o, user.permission_level > 0)) \
            .to_list()

    def createOrderJson(self, order: Order, include_name=False):
        id = order.batches[0].product.id
        count = 0
        for batch in order.batches:
            count += batch.amount

        dict = {
            "orderId": order.id,
            "firstItemId": id,
            "summary": order.summary,
            "count": count,
            "date_created": str(order.created_on.strftime("%H:%M %d/%m/%Y")),
        }
        if include_name:
            dict['customer_username'] = order.customer.username
            dict['customer_name'] = order.customer.name
            dict['customer_phone'] = order.customer.phone_number
        return dict

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
        order = self.db.create_order(user)
        self.db.commit()
        return order.id
