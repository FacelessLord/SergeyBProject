from api.controllers.Controller import Controller
from api.controllers.DatabaseController import DatabaseController as dbc, \
    Provider, Product
from api.finq import FINQ


class ProviderController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_provider_list(self, category):
        providers = self.db \
            .providers().all()
        providers_for_category = FINQ(providers) \
            .filter(lambda p: category == '*' or FINQ(p.products) \
                    .any(lambda pp: pp.category.name == category))
        return {"items": [
            {
                "name": "AGala",
                "id": 0,
                "poc": 4
            },
            {
                "name": "XtraFood",
                "id": 3,
                "poc": 125
            },
            {
                "name": "RubyFarm",
                "id": 5,
                "poc": 5
            },
            {
                "name": "GreenBoard",
                "id": 8,
                "poc": 12
            }
        ]}
