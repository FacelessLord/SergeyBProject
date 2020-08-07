import time
from json import JSONDecoder

from flask import Flask, request
from werkzeug.security import generate_password_hash

import backend.controllers.DatabaseController as dbc
from backend.authlib import auth_user
from backend.controllers.CartController import CartController
from backend.controllers.CategoryController import CategoryController
from backend.controllers.ImageController import ImageController
from backend.controllers.MailController import MailController
from backend.controllers.ProductController import ProductController
from backend.controllers.ProviderController import ProviderController
from backend.finq import FINQ
from backend.utils import send_image
from backend.result import Success, ErrorResult, Fail, ensure

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/UserData.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

decoder = JSONDecoder()


def read_sensible_data():
    sensible_data_stream = open('../sensible_data.json', 'rt')
    json = '\n'.join(sensible_data_stream.readlines())
    sensible_data_stream.close()
    return decoder.decode(json)


sensible_data = read_sensible_data()

for k in sensible_data:
    app.config[k] = sensible_data[k]

db = dbc.DatabaseController(app)

# db.add_user(["A","B","C"],"fa",'fa@c.d', generate_password_hash("abc"))
# db.commit()

providers = ProviderController(db)
categories = CategoryController(db)
products = ProductController(db)
carts = CartController(db)
images = ImageController(db)
mailer = MailController(app, db)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


# items
@app.route('/api/items')
def get_items_list():
    args = request.args
    count = args.get("count", -1, type=int)
    category = args.get("category", "", type=str)
    fromIndex = args.get("from", 0, type=int)
    priceTo = args.get("priceTo", 0, type=float)
    priceFrom = args.get("priceFrom", 0, type=float)
    providers = FINQ(request.args.get('providers', "", type=str).split(',')).map(str.strip).to_list()

    if len(providers) == 1 and len(providers[0]) == 0:
        providers = []

    return products.get_catalog(count, fromIndex, priceTo, priceFrom, providers, category)


@app.route('/api/items/data', methods=['get'])
def get_item_data():
    item_id = request.args.get("itemId", -1)

    product = db.get_product(item_id)
    if product:
        return Success({"provider_id": product.provider_id,
                        "id": product.id,
                        "description": product.description,
                        "price": product.price,
                        "name": product.name,
                        "in_stock": product.in_stock,
                        "img_count": product.img_count,
                        "category": product.category.create_category_path()}) \
            .as_dict()
    else:
        return ErrorResult(Fail("noItem")) \
            .as_dict()


@app.route('/api/items/data', methods=['post'])
def set_item_data():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")
    return auth_user(db, username, accessToken) \
        .then(read_item_data) \
        .then(save_item_data) \
        .as_dict()

    # todo check permissions
    data = decoder.decode(request.data.decode())
    print(data)
    product = db.get_product(data['id'])
    if product:
        provider = db.get_provider_by_name(data['provider'])
        if not provider:
            provider = db.add_provider(data['provider'])
        updated_category = db.create_category_from_path(data['category'])
        db.commit()

        product.img_count = data['img_count']
        product.name = data['name']
        product.description = data['description']
        product.price = data['price']
        product.in_stock = data['in_stock']
        product.provider_id = provider.id
        product.category_id = updated_category.id
        db.commit()
    else:
        raise Fail("noItem")


# cart
@app.route("/api/cart")
def get_cart_for_user():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")

    return auth_user(db, username, accessToken) \
        .then(carts.get_cart_for_user) \
        .as_dict()


@app.route('/api/cart/removeBatch', methods=["POST"])
def remove_item_from_cart():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")
    batchId = request.args.get('batchId', 0, type=int)

    return auth_user(db, username, accessToken) \
        .then(lambda u: carts.remove_item_from_cart(batchId, u)) \
        .as_dict()


@app.route('/api/cart/order', methods=["POST"])
def order_cart():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")
    return auth_user(db, username, accessToken) \
        .then(carts.order) \
        .as_dict()


@app.route('/api/cart/add', methods=['post'])
def add_item_to_cart():
    item_id = request.args.get("itemId", -1, type=int)
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")
    amount = request.args.get('amount', 0, type=int)

    return auth_user(db, username, accessToken) \
        .then(lambda u: carts.add_item_to_cart(item_id, u, amount)) \
        .as_dict()


# providers
@app.route('/api/providers')
def get_provider_list():
    category = request.args.get("category", "*", type=str)
    print(category)
    return providers.get_provider_list(category)


@app.route('/api/providers/name')
def get_provider_name():
    provider_id = request.args.get("providerId", "-1", type=str)
    provider = db.get_provider(provider_id)

    if provider:
        return Success(provider.name) \
            .as_dict()
    return ErrorResult(Fail("noprovider")) \
        .as_dict()


@app.route('/api/categories')
def get_category_list():
    return categories.get_category_list()


# images
@app.route('/api/images/main')
def get_main_icon():
    product_id = request.args.get("id", -1)

    return images.get_main_image(product_id)


@app.route('/api/images/forItem')
def get_product_image():
    product_id = request.args.get("id", -1)
    image_id = request.args.get("imgId", 0, type=int)

    return images.get_image_for_id(product_id, image_id)


@app.route('/api/images/load', methods=['PUT'])
def load_image():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")
    product_id = request.args.get('productId', -1, type=int)

    return auth_user(db, username, accessToken) \
        .then(lambda u: images.load_image(product_id, request.data)) \
        .as_dict()


@app.route('/api/images/empty', methods=['GET'])
def empty_image():
    return send_image(f"images/default.png")


# user
@app.route('/api/user/data', methods=['post'])
def set_user_data():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")

    user = db.get_user_by_name(username)
    if user:
        if user.accessToken == accessToken:
            data = request.data.decode(encoding='utf-8')
            newData = JSONDecoder().decode(data)
            user.name = newData["name"][0]
            user.surname = newData["name"][1]
            user.last_name = newData["name"][2]
            db.commit()
            return {"success": True}
        else:
            return {"success": False,
                    "reason": "accessToken"}
    else:
        return {"success": False,
                "reason": "noUser"}


@app.route('/api/user/data', methods=['get'])
def get_user_data():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")

    user = db.get_user_by_name(username)
    if user:
        if user.accessToken == accessToken:
            return {"success": True,
                    "email": user.email,
                    "name": [user.name, user.surname, user.last_name],
                    "created": str(user.created_on),
                    "lastUpdate": str(user.updated_on)}
        else:
            return {"success": False,
                    "reason": "accessToken"}
    else:
        return {"success": False,
                "reason": "noUser"}


@app.route('/api/user/register', methods=['post'])
def register():
    username = request.headers.get('username', "")
    name = FINQ(request.headers.get('name', type=str).split(',')).map(str.strip).to_list()
    email = request.headers.get('email')
    password = request.headers.get('password')
    users = FINQ(db.users())
    registrars = FINQ(db.registrars())

    if users.any(lambda u: u.username == username) or registrars.any(lambda u: u.username == username):
        return ErrorResult(Fail("username")).as_dict()
    if users.any(lambda u: u.email == email) or registrars.any(lambda u: u.email == email):
        return ErrorResult(Fail("email")).as_dict()

    registrar = db.add_user_registrar(name, username, email, generate_password_hash(password))
    db.commit()
    link = registrar.create_confirmation_link()
    html = f"""<p>Для подтверждения регистрации пройдите по ссылке:</p><br><a>{link}</a>"""
    mailer.send_html_message("Registration confirmation", [email], html)
    return {"success": True}


@app.route('/api/user/confirmRegister')
def confirm_register():
    username = request.headers.get('username', "")
    token = request.args.get('token')

    registrar = db.get_user_registrar(username=username)
    if registrar.code == token:
        db.add_user_from_registrar(registrar)
        db.commit()
        return {"success": True}
    return {"success": False}


@app.route('/api/user/login', methods=['post', 'get'])
def login():
    accessToken = ""
    permission = 0
    message = ''
    if request.method == "POST":
        username = request.headers.get('username')
        password = request.headers.get('password')

        user = db.get_user_by_name(username)
        registrar = db.get_user_registrar(username=username)
        # db.remove_registrar(registrar)
        if user:
            accessToken = user.load(password)
            permission = user.permission_level
            if accessToken:
                message = "Correct username and password"
            else:
                message = "Wrong username or password"
                accessToken = ""
        elif registrar:
            message = "You need to confirm your registration."
        else:
            message = "Wrong username or password"
    return {"message": message, "accessToken": accessToken, "permission": permission}


@app.route('/api/user/check_auth')
def check_auth():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")
    user = db.get_user_by_name(username)
    return {"result": user is not None and user.accessToken == accessToken}


@app.route('/api/user/logout', methods=['post'])
def logout():
    accessToken = request.headers.get('accessToken', "")
    username = request.headers.get('username', "")
    user = db.get_user_by_name(username)
    if user:
        return {"supported": True, "unloaded": user.unload(accessToken)}
    return {"supported": False}  # user doesn't exist
