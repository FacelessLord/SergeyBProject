from backend.controllers.DatabaseController import DatabaseController as dbc


class Controller:
    def __init__(self, db: dbc):
        self.db = db
