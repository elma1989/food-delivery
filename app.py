from flask import Flask
from route import api

app = Flask(__name__)
app.register_blueprint(api)