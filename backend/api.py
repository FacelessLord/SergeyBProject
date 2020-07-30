import time
from json import JSONDecoder

from flask import Flask, request
from werkzeug.security import generate_password_hash

import backend.controllers.DatabaseController as dbc
from backend.controllers.CategoryController import CategoryController
from backend.controllers.ImageController import ImageController
from backend.controllers.MailController import MailController
from backend.controllers.ProductController import ProductController
from backend.controllers.ProviderController import ProviderController
from backend.finq import FINQ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data/UserData.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


def read_sensible_data():
    global json
    sensible_data_stream = open('../sensible_data.json', 'rt')
    json = '\n'.join(sensible_data_stream.readlines())
    decoder = JSONDecoder()
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
images = ImageController(db)
mailer = MailController(app, db)


@app.route('/api/userData', methods=['post'])
def set_user_data():
    username = request.args.get('username')
    accessToken = request.args.get('accessToken')

    user = db.get_user_by_name(username)
    if user:
        if user.access_token == accessToken:
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


@app.route('/api/userData', methods=['get'])
def get_user_data():
    username = request.args.get('username')
    accessToken = request.args.get('accessToken')

    user = db.get_user_by_name(username)
    if user:
        if user.access_token == accessToken:
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


@app.route('/api/register', methods=['post'])
def register():
    username = request.args.get('username')
    name = FINQ(request.args.get('name', type=str).split(',')).map(str.strip).to_list()
    email = request.args.get('email')
    password = request.args.get('password')

    if any(filter(lambda u: u.username == username, db.users())):
        return {"success": False, "reason": "username"}
    if any(filter(lambda u: u.username == username, db.registrars())):
        return {"success": False, "reason": "username"}
    if any(filter(lambda u: u.email == email, db.users())):
        return {"success": False, "reason": "email"}
    if any(filter(lambda u: u.email == email, db.registrars())):
        return {"success": False, "reason": "email"}
    registrar = db.add_user_registrar(name, username, email, generate_password_hash(password))
    db.commit()
    link = registrar.create_confirmation_link()
    html = f"""<p>Для подтверждения регистрации пройдите по ссылке:</p><br><a>{link}</a>"""
    mailer.send_html_message("Registration confirmation", [email], html)
    return {"success": True}


@app.route('/api/confirmRegister')
def confirm_register():
    username = request.args.get('username')
    token = request.args.get('token')

    registrar = db.get_user_registrar(username=username)
    if registrar.code == token:
        db.add_user_from_registrar(registrar)
        db.commit()
        return {"success": True}
    return {"success": False}


@app.route('/api/login', methods=['post', 'get'])
def login():
    access_token = ""
    message = ''
    if request.method == "POST":
        username = request.args.get('username')
        password = request.args.get('password')

        user = db.get_user_by_name(username)
        registrar = db.get_user_registrar(username=username)
        # db.remove_registrar(registrar)
        if user:
            access_token = user.load(password)
            if access_token:
                message = "Correct username and password"
            else:
                message = "Wrong username or password"
                access_token = ""
        elif registrar:
            message = "You need to confirm your registration."
        else:
            message = "Wrong username or password"
    print(access_token)
    return {"message": message, "access_token": access_token}


@app.route('/api/check_auth')
def check_auth():
    username = request.args.get('username')
    access_token = request.args.get('access_token', type=str)
    user = db.get_user_by_name(username)
    return {"result": user is not None and user.access_token == access_token}


@app.route('/api/logout', methods=['post'])
def logout():
    access_token = request.headers['access_token']
    username = request.headers['username']
    user = db.get_user_by_name(username)
    if user:
        return {"supported": True, "unloaded": user.unload(access_token)}
    return {"supported": False}  # user doesn't exist


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/addItem', methods=['post'])
def add_item_to_cart():
    item_id = request.args.get("itemId", "-1", type=str)
    access_token = request.headers['access_token']
    username = request.headers['username']

    products.add_item_to_cart(item_id, username, access_token)


@app.route('/api/providers')
def get_provider_list():
    category = request.args.get("category", "*", type=str)
    print(category)
    return providers.get_provider_list(category)


@app.route('/api/providerName')
def get_provider_name():
    provider_id = request.args.get("providerId", "-1", type=str)
    provider = db.get_provider(provider_id)

    if provider:
        return {"success": True, "name": provider.name}
    return {"success": False, "reason": "noprovider"}


@app.route('/api/categories')
def get_category_list():
    return categories.get_category_list()


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


@app.route('/api/item/data')
def get_item_data():
    item_id = request.args.get("itemId", -1)

    product = db.get_product(item_id)
    if product:
        return {"success": True,
                "provider_id": product.provider_id,
                "id": product.id,
                "description": product.description,
                "price": product.price,
                "name": product.name,
                "in_stock": product.in_stock,
                "img_count": product.img_count,
                "category": product.category_id}
    else:
        return {"success": False, "reason": "noItem"}


@app.route('/api/images/main')
def get_main_icon():
    product_id = request.args.get("id", -1)

    return images.get_main_image(product_id)


@app.route('/api/images/forItem')
def get_product_image():
    product_id = request.args.get("id", -1)
    image_id = request.args.get("imgId", 0)
    product_id = request.args.get("id", -1)

    return images.get_main_image(product_id)
