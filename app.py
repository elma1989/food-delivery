import json
from flask import Flask
from flask_jwt_extended import JWTManager
from route import api

app = Flask(__name__)
app.secret_key = 'food-delivery'
jwt = JWTManager(app)
app.register_blueprint(api)