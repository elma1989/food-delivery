import json
from flask import Blueprint, render_template, request
from database import Manager, Customer

api = Blueprint('api',__name__)

@api.route('/')
def index():
    return render_template('index.html')

@api.route('/items/')
def items():
    mgr = Manager()
    items = mgr.items
    return [item.to_dict() for item in items]

@api.route('/users/', methods=['POST'])
def create_user():
    data = json.loads(request.data.decode())
    email = data.get('email')
    password = data.get('password')
    fname = data.get('fname')
    lname = data.get('lname')
    birth_date = data.get('birthDate')
    street = data.get('street')
    zip_code = data.get('zipCode')
    city = data.get('city')

    if not email or not password or not fname or not lname or not birth_date or not street or not zip_code or not city:
        return {'message':'Data missing'}, 400
    
    customer = Customer(email, fname, lname, birth_date, street, zip_code, city)
    customer.create_password(password)

    res = customer.add()

    if res == 1: return {'message':'Data invalid'}, 400
    if res == 2: return {'message': 'User allready exists'}, 409
    return {'message':'User created'}, 201