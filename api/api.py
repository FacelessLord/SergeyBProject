import time
from flask import Flask, request

from api.controllers.CategoryController import CategoryController
from api.controllers.ImageController import ImageController
from api.controllers.ProductController import ProductController
from api.controllers.ProviderController import ProviderController
import api.controllers.DatabaseController as dbc

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////home/lord_faceless/PycharmProjects/Work/Sergey/react-flask-app/api/data/UserData.db'

db = dbc.DatabaseController(app)

providers = ProviderController(db)
categories = CategoryController(db)
products = ProductController(db)
images = ImageController(db)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


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
    providers = args.get("providers", [], type=list)

    return products.get_catalog(count, fromIndex, priceTo, priceFrom, providers, category)


@app.route('/api/images/main')
def get_main_icon():
    args = request.args
    product_id = args.get("id", -1)

    return images.get_main_image(product_id)
