from datetime import datetime, timedelta
from typing import List

from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

import backend.guid as guid


class User:
    id = \
        cart = \
        name = \
        surname = \
        last_name = \
        username = \
        email = \
        password_hash = \
        created_on = \
        last_login = \
        access_token = \
        updated_on = \
        permission_level = \
        ttl = None

    def is_authenticated(self) -> bool:
        pass

    def is_anonymous(self) -> bool:
        pass

    def load(self, password: str) -> str:
        pass

    def unload(self, access_token: str) -> bool:
        """logouts user from everywhere"""
        pass

    def set_password(self, password: str):
        pass

    def check_password(self, password: str) -> bool:
        pass

    def change_password(self, old_password, new_password) -> bool:
        pass


class ProductBatch:
    id = \
        customer_id = \
        product_id = \
        amount = None


class Product:
    id = \
        batches = \
        price = \
        name = \
        provider_id = \
        in_stock = \
        category_id = None


class Provider:
    id = \
        products = \
        name = None


class Category:
    id = \
        name = \
        products = \
        nested = \
        parent_id = None


class UserRegistrar:
    id = \
        username = \
        email = \
        updated_on = \
        code = \
        password_hash = None

    def create_confirmation_link(self):
        pass


# noinspection PyArgumentList,PyGlobalUndefined
class DatabaseController:
    # noinspection PyRedeclaration
    def __init__(self, app):
        self.db = SQLAlchemy(app)
        db = self.db

        global User
        global ProductBatch
        global Product
        global Provider
        global Category
        global UserRegistrar

        class User(db.Model):
            __tablename__ = 'users'
            id = db.Column(db.Integer(), primary_key=True)
            cart = db.relationship("ProductBatch", backref="customer", cascade='all,delete-orphan')
            name = db.Column(db.String(40))
            surname = db.Column(db.String(40))
            last_name = db.Column(db.String(40))
            username = db.Column(db.String(50), nullable=False, unique=True)
            email = db.Column(db.String(100), nullable=False, unique=True)
            password_hash = db.Column(db.String(100), nullable=False)
            created_on = db.Column(db.DateTime(), default=datetime.utcnow)
            last_login = db.Column(db.DateTime(), default=datetime.utcnow)
            access_token = db.Column(db.String(12), default="")
            updated_on = db.Column(db.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow)
            permission_level = db.Column(db.Integer(), default=lambda: 0)
            ttl = timedelta(hours=8)

            def is_authenticated(self) -> bool:
                return (datetime.utcnow() - self.last_login) < self.ttl \
                       and self.access_token != ""

            def is_anonymous(self) -> bool:
                return not self.is_authenticated()

            def load(self, password: str) -> str:
                if self.check_password(password):
                    if self.is_anonymous():
                        self.access_token = guid.new_formatted()
                    self.last_login = datetime.utcnow()
                    db.session.commit()
                    return self.access_token

            def unload(self, access_token: str) -> bool:  # logouts user from everywhere
                if access_token == self.access_token:
                    self.access_token = ""
                    db.session.commit()
                    return True
                return False

            def set_password(self, password: str):
                self.password_hash = generate_password_hash(password)
                db.session.commit()

            def check_password(self, password: str) -> bool:
                return check_password_hash(self.password_hash, password)

            def change_password(self, old_password, new_password) -> bool:
                if self.is_authenticated() and self.check_password(old_password):
                    self.set_password(new_password)
                    self.unload(self.access_token)
                    return True
                return False

            def __repr__(self):
                return "<{}:{}>".format(self.id, self.username)

        class UserRegistrar(db.Model):
            __tablename__ = 'registrars'
            id = db.Column(db.Integer(), primary_key=True)
            username = db.Column(db.String(40), nullable=False, unique=True)
            name = db.Column(db.String(40))
            surname = db.Column(db.String(40))
            last_name = db.Column(db.String(40))
            email = db.Column(db.String(100), nullable=False, unique=True)
            updated_on = db.Column(db.DateTime(), default=datetime.utcnow, onupdate=datetime.utcnow)
            code = db.Column(db.String(12), default=guid.new_formatted)
            password_hash = db.Column(db.String(100), nullable=False)

            def create_confirmation_link(self):
                return f'/api/confirmRegister?username={self.username}&token={self.code}'

        class ProductBatch(db.Model):
            __tablename__ = 'cart'
            id = db.Column(db.Integer(), primary_key=True)
            customer_id = db.Column(db.Integer(), db.ForeignKey('users.id'))
            product_id = db.Column(db.Integer(), db.ForeignKey('products.id'))
            amount = db.Column(db.Float())

        class Product(db.Model):
            __tablename__ = 'products'
            id = db.Column(db.Integer(), primary_key=True)
            batches = db.relationship("ProductBatch", backref="product", cascade='all,delete-orphan')
            price = db.Column(db.Float)
            name = db.Column(db.String(255))
            description = db.Column(db.String(255))
            provider_id = db.Column(db.Integer(), db.ForeignKey('providers.id'))
            in_stock = db.Column(db.Boolean())
            category_id = db.Column(db.Integer(), db.ForeignKey('categories.id'))

        class Category(db.Model):
            __tablename__ = "categories"
            id = db.Column(db.Integer(), primary_key=True)
            name = db.Column(db.String(40), unique=True)
            products = db.relationship("Product", backref="category", cascade='all,delete-orphan')
            nested = db.Column(db.Boolean())
            parent_id = db.Column(db.Integer(), db.ForeignKey('categories.id'), default=-1)
            sub_categories = db.relationship("Category", backref="parent", cascade='all,delete-orphan', remote_side=[id], single_parent=True)

        class Provider(db.Model):
            __tablename__ = 'providers'
            id = db.Column(db.Integer(), primary_key=True)
            products = db.relationship("Product", backref="provider", cascade='all,delete-orphan')
            name = db.Column(db.String(255), unique=True)

        db.create_all()

    def add_user(self, name: List[str], username: str, email: str,
                 password_hash: str):
        user = User(name=name[0], surname=name[1], last_name=name[2], username=username, email=email, password_hash=password_hash)
        self.db.session.add(user)
        return user

    def add_user_from_registrar(self, registrar: UserRegistrar):
        user = User(username=registrar.username, email=registrar.email, password_hash=registrar.password_hash)
        self.db.session.add(user)
        return user

    def add_user_registrar(self, name: List[str], username: str, email: str,
                           password_hash: str):
        user_registrar = UserRegistrar(name=name[0], surname=name[1], last_name=name[2], username=username, email=email, password_hash=password_hash)
        self.db.session.add(user_registrar)
        return user_registrar

    def add_product(self, price: float, name: str, provider: int,
                    stocked: bool):
        product = Product(price=price, name=name, provider_id=provider, in_stock=stocked)
        self.db.session.add(product)
        return product

    def add_provider(self, name):
        provider = Provider(name=name)
        self.db.session.add(provider)
        return provider

    def add_item_to_cart(self, customer: int, product: int, amount: float):
        cart_item = ProductBatch(customer_id=customer, product_id=product, amount=amount)
        self.db.session.add(cart_item)
        return cart_item

    def add_category(self, name: str, nested: bool, parent_id: int):
        category = Category(name=name, nested=nested, parent_id=parent_id)
        self.db.session.add(category)
        return category

    def get_category_by_name(self, name: str) -> Category:
        categories = self.db.session.query(Category) \
            .filter(Category.name == name) \
            .all()

        if len(categories) > 0:
            return categories[0]

    def get_category(self, id: int) -> Category:
        return self.db.session.query(Category) \
            .get(id)

    def categories(self) -> List[Category]:
        return self.db.session.query(Category).all()

    def get_item_from_cart(self, batch_id: int) -> ProductBatch:
        return self.db.session.query(ProductBatch) \
            .get(batch_id)

    def batches(self) -> List[ProductBatch]:
        return self.db.session.query(ProductBatch)

    def load_user(self, user_id) -> User:
        return self.db.session.query(User).get(user_id)

    def get_user_by_name(self, username: str) -> User:
        users = self.db.session.query(User) \
            .filter(User.username == username) \
            .all()

        if len(users) > 0:
            return users[0]

    def get_user_registrar(self, username: str = "", email: str = "") -> UserRegistrar:
        users = None
        if username:
            users = self.db.session.query(UserRegistrar) \
                .filter(UserRegistrar.username == username) \
                .all()
        if email:
            users = self.db.session.query(UserRegistrar) \
                .filter(UserRegistrar.email == email) \
                .all()

        if users:
            return users[0]

    def users(self) -> List[User]:
        return self.db.session.query(User)

    def registrars(self) -> List[UserRegistrar]:
        return self.db.session.query(UserRegistrar)

    def get_product(self, product_id: int) -> Product:
        return self.db.session.query(Product) \
            .get(product_id)

    def products(self) -> List[Product]:
        return self.db.session.query(Product)

    def get_provider(self, provider_id: int) -> Provider:
        return self.db.session.query(Provider) \
            .get(provider_id)

    def get_provider_by_name(self, provider_name: str) -> Provider:
        providers = self.db.session.query(Provider) \
            .filter(Provider.name == provider_name) \
            .all()

        if len(providers) > 0:
            return providers[0]

    def providers(self) -> List[Provider]:
        return self.db.session.query(Provider)

    def commit(self):
        self.db.session.commit()
