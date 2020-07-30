import math
from typing import List

from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc
from backend.finq import FINQ


class ProductController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_catalog(self, count: int, fromIndex: int, priceTo: float,
                    priceFrom: float, providers: List[int], category: str):
        products = FINQ(self.db.products())
        if priceTo == 0:
            priceTo = math.inf
        if count == 0:
            count = math.inf
        catalog = products \
            .filter(lambda p: (str(p.category.id).startswith(category) or category in ["", "*"])
                              and (priceFrom <= p.price <= priceTo)
                              and (str(p.provider_id) in providers or len(providers) == 0)) \
            .skip(fromIndex) \
            .take(count) \
            .map(lambda p:
                 {
                     "cardId": p.id,
                     "header": p.name,
                     "description": p.description,
                     # "Рыжий котик с зелёными глазами",
                     "provider": p.provider.id,
                     "price": p.price,
                     "isStock": p.in_stock
                 })
        catalogList = catalog.to_list()
        print(catalogList)
        return {"items": catalogList}

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
