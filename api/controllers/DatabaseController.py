from datetime import datetime
from typing import List

from flask_sqlalchemy import SQLAlchemy

import api.guid as guid


class User:
    pass


class ProductBatch:
    pass


class Product:
    pass


class Provider:
    pass


class Category:
    pass


# noinspection PyArgumentList
class DatabaseController:
    def __init__(self, app):
        self.db = SQLAlchemy(app)
        db = self.db

        global User
        global ProductBatch
        global Product
        global Provider
        global Category

        class User(db.Model):
            __tablename__ = 'users'
            id = db.Column(db.Integer(), primary_key=True)
            cart = db.relationship("ProductBatch", backref="customer",
                                   cascade='all,delete-orphan')
            name = db.Column(db.String(40))
            surname = db.Column(db.String(40))
            last_name = db.Column(db.String(40))
            username = db.Column(db.String(50), nullable=False,
                                 unique=True)
            email = db.Column(db.String(100), nullable=False,
                              unique=True)
            password_hash = db.Column(db.String(100), nullable=False)
            created_on = db.Column(db.DateTime(),
                                   default=datetime.utcnow)
            last_login = db.Column(db.DateTime(),
                                   default=datetime.utcnow)
            access_token = db.Column(db.Integer(),
                                     default=guid.new_formatted)
            updated_on = db.Column(db.DateTime(),
                                   default=datetime.utcnow,
                                   onupdate=datetime.utcnow)
            permission_level = db.Column(db.Integer(),
                                         default=lambda: 0)

            def __repr__(self):
                return "<{}:{}>".format(self.id, self.username)

        class ProductBatch(db.Model):
            __tablename__ = 'cart'
            id = db.Column(db.Integer(), primary_key=True)
            customer_id = db.Column(db.Integer(),
                                    db.ForeignKey('users.id'))
            product_id = db.Column(db.Integer(),
                                   db.ForeignKey('products.id'))
            amount = db.Column(db.Float())

        class Product(db.Model):
            __tablename__ = 'products'
            id = db.Column(db.Integer(), primary_key=True)
            batches = db.relationship("ProductBatch", backref="product",
                                      cascade='all,delete-orphan')
            price = db.Column(db.Float)
            name = db.Column(db.String(255))
            provider_id = db.Column(db.Integer(),
                                    db.ForeignKey('providers.id'))
            in_stock = db.Column(db.Boolean())
            category_id = db.Column(db.Integer(),
                                    db.ForeignKey('categories.id'))

        class Category(db.Model):
            __tablename__ = "categories"
            id = db.Column(db.Integer(), primary_key=True)
            name = db.Column(db.String(40), unique=True)
            products = db.relationship("Product", backref="category",
                                       cascade='all,delete-orphan')

        class Provider(db.Model):
            __tablename__ = 'providers'
            id = db.Column(db.Integer(), primary_key=True)
            products = db.relationship("Product", backref="provider",
                                       cascade='all,delete-orphan')
            name = db.Column(db.String(255), unique=True)

        db.create_all()

    def add_user(self, name: List[str], username: str, email: str,
                 password_hash: str):
        user = User(name=name[0], surname=name[1], last_name=name[2],
                    username=username, email=email, password_hash=password_hash)
        self.db.session.add(user)

    def add_product(self, price: float, name: str, provider: int,
                    stocked: bool):
        product = Product(price=price, name=name, provider_id=provider,
                          in_stock=stocked)
        self.db.session.add(product)

    def add_provider(self, name):
        provider = Provider(name=name)
        self.db.session.add(provider)

    def add_item_to_cart(self, customer: int, product: int, amount: float):
        cart_item = ProductBatch(customer_id=customer, product_id=product,
                                 amount=amount)
        self.db.session.add(cart_item)

    def get_item_from_cart(self, batch_id: int):
        return self.db.session.query(ProductBatch) \
            .filter(ProductBatch.id == batch_id) \
            .all()

    def batches(self):
        return self.db.session.query(ProductBatch)

    def get_user(self, user_id: int):
        return self.db.session.query(User) \
            .filter(User.id == user_id) \
            .all()

    def get_user_by_name(self, username: str):
        return self.db.session.query(User) \
            .filter(User.username == username) \
            .all()

    def users(self):
        return self.db.session.query(User)

    def get_product(self, product_id: int):
        return self.db.session.query(Product) \
            .filter(Product.id == product_id) \
            .all()

    def products(self):
        return self.db.session.query(Product)

    def get_provider(self, provider_id: int):
        return self.db.session.query(Provider) \
            .filter(Provider.id == provider_id) \
            .all()

    def get_provider_by_name(self, provider_name: str):
        return self.db.session.query(Provider) \
            .filter(Provider.name == provider_name) \
            .all()

    def providers(self):
        return self.db.session.query(Provider)

    def commit(self):
        self.db.session.commit()
