import math
from typing import List

from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc, ProductBatch
from backend.finq import FINQ
from backend.result import Fail


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
            .filter(lambda p: (category in p.category.create_category_idpath() or category in ["", "*"])
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
        return {"value": catalogList}

    def remove_product(self, item_id):
        product = self.db.get_product(item_id)
        if not product:
            raise Fail("noproduct")
        FINQ(product.batches) \
            .map(lambda b: b.order) \
            .filter(lambda o: FINQ(o.batches)
                    .filter(lambda b: b.product_id != item_id)
                    .none()) \
            .for_each(self.db.remove)

        self.db.remove(product)
        self.db.commit()
