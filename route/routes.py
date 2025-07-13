import json
from flask import Blueprint, render_template, request
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required
from database import Manager, Customer

api = Blueprint('api',__name__)

@api.route('/')
def index():
    return render_template('index.html')

@api.route('/items/')
# @jwt_required()
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

@api.route('/users/login', methods=['POST'])
def login():
    data = json.loads(request.data.decode())
    email = data.get('email')
    password = data.get('password')

    if not email or not password: return {'message':'Missing data'}, 400

    mgr = Manager()
    customer = mgr.get_customer(email)

    if not customer or not customer.login(password): return {'message':'User or Password not correct'}, 403

    access_token = create_access_token(identity=str(customer.customer_id))
    refresh_token = create_refresh_token(identity=customer.customer_id)

    return {'token':access_token}