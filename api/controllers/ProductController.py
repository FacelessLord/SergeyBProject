import math
from typing import List

from api.controllers.Controller import Controller
from api.controllers.DatabaseController import DatabaseController as dbc, Product
from api.finq import FINQ


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
        print(category)
        catalog = products \
            .filter(lambda p: (str(p.category.id) == category or category in ["", "*"])
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
                     "provider": p.provider.name,
                     "price": p.price,
                     "isStock": p.in_stock
                 })

        return { "items": catalog.to_list() }
