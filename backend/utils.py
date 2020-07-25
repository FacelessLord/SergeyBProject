from flask import send_file


def send_image(image_name: str):
    ext = image_name[image_name.rfind("."):]

    return send_file(image_name, mimetype='image/'+ext)
