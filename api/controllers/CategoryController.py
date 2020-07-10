from typing import List

from api.controllers.Controller import Controller
from api.controllers.DatabaseController import DatabaseController as dbc, Category
from api.finq import FINQ


def create_category_json(category: Category, categories: List[Category]):
    if category.nested:
        sub_cats = FINQ(categories) \
            .filter(lambda c: c.parent_id == category.id) \
            .map(lambda c: create_category_json(c, categories))
        return {
            "nested": category.nested,
            "id": category.id,
            "name": category.name,
            "subcategories": sub_cats.to_list()
        }
    else:
        return {
            "nested": category.nested,
            "id": category.id,
            "name": category.name,
        }


class CategoryController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_category_list(self):
        categories = self.db.categories()
        cat_list = FINQ(categories)\
            .filter(lambda c: c.parent_id == -1)\
            .map(lambda c: create_category_json(c, categories))\
            .to_list()
        return { "items": cat_list }
