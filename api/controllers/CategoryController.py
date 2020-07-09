from api.controllers.Controller import Controller
from api.controllers.DatabaseController import DatabaseController as dbc


class CategoryController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_category_list(self):
        return {"items": [
            {
                "nested": False,
                "id": "aaaa",
                "name": "AAAA"
            },
            {
                "nested": True,
                "id": "bbbb",
                "name": "BBBB",
                "subcategories": [
                    {"nested": False, "id": "a", "name": "BBBB-A"},
                    {"nested": False, "id": "b", "name": "BBBB-B"},
                    {"nested": False, "id": "c", "name": "BBBB-C"},
                    {"nested": False, "id": "d", "name": "BBBB-D"}]
            },
            {
                "nested": False,
                "id": "cccc",
                "name": "CCCC"
            },
            {
                "nested": True,
                "id": "dddd",
                "name": "DDDD",
                "subcategories": [
                    {"nested": False, "id": "a", "name": "DDDD-A"}]
            }
        ]}
