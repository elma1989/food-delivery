from flask import Blueprint, render_template
from database import Manager

api = Blueprint('api',__name__)

@api.route('/')
def index():
    return render_template('index.html')

@api.route('/items')
def items():
    mgr = Manager()
    items = mgr.items
    return [item.to_dict() for item in items]