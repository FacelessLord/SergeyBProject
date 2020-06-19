import time
from flask import Flask, request

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
