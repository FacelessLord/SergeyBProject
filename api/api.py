import time
from json import JSONDecoder

from flask import Flask, request
from werkzeug.security import generate_password_hash

import api.controllers.DatabaseController as dbc
from api.controllers.CategoryController import CategoryController
from api.controllers.ImageController import ImageController
from api.controllers.MailController import MailController
from api.controllers.ProductController import ProductController
from api.controllers.ProviderController import ProviderController
from api.finq import FINQ

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/lord_faceless/PycharmProjects/Work/Sergey/react-flask-app/api/data/UserData.db'
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


@app.route('/api/register', methods=['post'])
def register():
    username = request.args.get('username')
    name = FINQ(request.args.get('name', type=str).split(',')).map(str.strip).to_list()
    email = request.args.get('email')
    password = request.args.get('password')

    if any(filter(lambda u: u.username == username, db.users())):
        return { "success": False, "reason": "username" }
    if any(filter(lambda u: u.username == username, db.registrars())):
        return { "success": False, "reason": "username" }
    if any(filter(lambda u: u.email == email, db.users())):
        return { "success": False, "reason": "email" }
    if any(filter(lambda u: u.email == email, db.registrars())):
        return { "success": False, "reason": "email" }
    registrar = db.add_user_registrar(name, username, email, generate_password_hash(password))
    db.commit()
    link = registrar.create_confirmation_link()
    html = f"""<p>Для подтверждения регистрации пройдите по ссылке:</p><br><a>{link}</a>"""
    mailer.send_html_message("Registration confirmation", [email], html)
    return { "success": True }


@app.route('/api/confirmRegister')
def confirm_register():
    username = request.args.get('username')
    token = request.args.get('token')

    registrar = db.get_user_registrar(username=username)
    if registrar.code == token:
        db.add_user_from_registrar(registrar)
        db.commit()
        return { "success": True }
    return { "success": False }


@app.route('/api/login', methods=['post', 'get'])
def login():
    access_token = ""
    message = ''
    if request.method == "POST":
        username = request.args.get('username')
        password = request.args.get('password')

        user = db.get_user_by_name(username)
        registrar = db.get_user_registrar(username=username)
        if user:
            access_token = user.load(password)
            if access_token:
                message = "Correct username and password"
            else:
                message = "Wrong username or password"
        elif registrar:
            message = "You need to confirm your registration."
        else:
            message = "Wrong username or password"

    return { "message": message, "access_token": access_token }


@app.route('/api/check_auth')
def check_auth():
    username = request.args.get('username')
    access_token = request.args.get('access_token', type=str)
    user = db.get_user_by_name(username)
    return { "result": user is not None and user.access_token == access_token }


@app.route('/api/logout', methods=['post'])
def logout():
    access_token = request.headers['access_token']
    username = request.headers['username']
    user = db.get_user_by_name(username)
    if user:
        return { "supported": True, "unloaded": user.unload(access_token) }
    return { "supported": False }  # user doesn't exist


@app.route('/time')
def get_current_time():
    return { 'time': time.time() }


@app.route('/api/providers')
def get_provider_list():
    args = request.args
    category = args.get("category", "*", type=str)
    return providers.get_provider_list(category)


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
    providers = FINQ(request.args.get('providers', [], type=str).spilt(',')).map(str.strip).to_list()

    return products.get_catalog(count, fromIndex, priceTo, priceFrom, providers, category)


@app.route('/api/images/main')
def get_main_icon():
    args = request.args
    product_id = args.get("id", -1)

    return images.get_main_image(product_id)
