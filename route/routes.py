import json
from datetime import datetime
from flask import Blueprint, render_template, request
from flask_jwt_extended import create_access_token, jwt_required
from database import Manager, Customer, Delivery

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
# region User
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

    access_token = create_access_token(identity=email)

    return {
        'token':access_token,
        'userId':customer.customer_id
    }

@api.route('/users/<int:user_id>', methods=['DELETE'])
# @jwt_required
def delete_user(user_id):
    mgr = Manager()
    customer = mgr.get_customer(user_id)

    if not customer: return {'message':'User or Password not correct'}, 403

    customer.delete()

    return '', 204

@api.route('/users/<int:user_id>/deliveries', methods=['GET', 'POST'])
# @jwt_required()
def deliveries(user_id):
    mgr = Manager()
    customer = mgr.get_customer(user_id)

    if not customer: return {'message':'User or Password not correct'}, 403

    if request.method == 'POST':
        items_dict = json.loads(request.data)
        items = [(mgr.get_item(item['name']), item['amount']) for item in items_dict]
        time = datetime.now()
        delivery = Delivery(customer, time.strftime('%Y-%m-%d %H:%M'))
        delivery.add()
        delivery.exists()
        delivery.items = items
        return {'message':'Deliery crated'}, 201

    deliveries = mgr.deliveries(customer)

    return [delivery.to_dict() for delivery in deliveries]
# endregion