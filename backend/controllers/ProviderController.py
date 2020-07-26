from backend.controllers.Controller import Controller
from backend.controllers.DatabaseController import DatabaseController as dbc
from backend.finq import FINQ


class ProviderController(Controller):
    def __init__(self, db: dbc):
        super().__init__(db)

    def get_provider_list(self, category):
        providers = self.db \
            .providers().all()
        providers_for_category = FINQ(providers) \
            .filter(lambda p: category == '*' or FINQ(p.products)
                    .any(lambda pp: str(pp.category.id).startswith(category))) \
            .map(lambda p: {
                "name": p.name,
                "id": p.id,
                "poc": len(p.products)  # all offer count, not for given category
            })
        return { "items": providers_for_category.to_list() }
