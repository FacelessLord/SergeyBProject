from api.controllers.Controller import Controller
from api.controllers.DatabaseController import DatabaseController as dbc


class ProductController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_catalog(self, count: int, fromIndex: int, priceTo: float,
                    priceFrom: float, providers: list):
        return {"items": [
            {
                "cardId": 1241,
                "header": "Red cat with green eyes",
                # "Рыжий котик с зелёными глазами",
                "provider": "Mommy-cat",
                "price": 0,
                "isStock": True
            },
            {
                "cardId": 1341,
                "header": "Kitty with blue eyes",
                # "Котёнок с голубыми глазами",
                "provider": "Mommy-cat",
                "price": 0,
                "isStock": True
            },
            {
                "cardId": 1251,
                "header": "Just nice cat",  # "Просто красивый котик",
                "provider": "Mommy-cat",  # "Мама-кошка",
                "price": 0,
                "isStock": True
            },
            {
                "cardId": 6421,
                "header": "Just nice cat",
                "provider": "Mommy-cat",
                "price": 0,
                "isStock": True
            },
        ]}
