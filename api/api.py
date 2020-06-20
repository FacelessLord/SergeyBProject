import time
from flask import Flask, request

from api.utils import send_image

app = Flask(__name__)


@app.route('/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/categories')
def get_category_list():
    return {"categories": [
        {
            "nested": False,
            "id": "aaaa",
            "name": "AAAA"
        },
        {
            "nested": True,
            "id": "bbbb",
            "name": "BBBB",
            "subcategories": [{"nested": False, "id": "a", "name": "BBBB-A"},
                              {"nested": False, "id": "b", "name": "BBBB-B"},
                              {"nested": False, "id": "c", "name": "BBBB-C"},
                              {"nested": False, "id": "d", "name": "BBBB-D"}]
        },
        {
            "nested": False,
            "id": "cccc",
            "name": "CCCC"
        },
        {
            "nested": True,
            "id": "dddd",
            "name": "DDDD",
            "subcategories": [{"nested": False, "id": "a", "name": "DDDD-A"}]
        }
    ]}


@app.route('/api/items')
def get_items_list():
    args = request.args
    count = args.get("count", -1)

    return {"items": [
        {
            "cardId": 1241,
            "header": "Red cat with green eyes",
            # "Рыжий котик с зелёными глазами",
            "provider": "Mommy-cat",
            "price": 0,
            "isStock": True
        },
        {
            "cardId": 1341,
            "header": "Kitty with blue eyes",  # "Котёнок с голубыми глазами",
            "provider": "Mommy-cat",
            "price": 0,
            "isStock": True
        },
        {
            "cardId": 1251,
            "header": "Just nice cat",  # "Просто красивый котик",
            "provider": "Mommy-cat",  # "Мама-кошка",
            "price": 0,
            "isStock": True
        },
        {
            "cardId": 6421,
            "header": "Just nice cat",
            "provider": "Mommy-cat",
            "price": 0,
            "isStock": True
        },
    ]}


@app.route('/api/images/main')
def get_main_icon():
    args = request.args
    product_id = args.get("id", -1)

    return send_image("cat1.jpg")
