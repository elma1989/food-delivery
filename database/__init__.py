import os

fkon = 'PRAGMA foreign_keys = ON'

from sqlite3 import Error
from .data import Data, DataObject
from .customer import Customer
from .restaurant import Restaurant
from .item import Item
from .delivery import Delivery
from .manager import Manager



def init_db():
    data = Data()
    database = 'database/food.db'
    tables = 'database/tables.sql'

    if os.path.exists(database): os.remove(database)

    with open (tables, 'r') as f:
        sql = f.read()

    try:
        data.connect()
        data.con.executescript(sql)
    except Error as e: print(e)
    finally: data.close()

def init_data():
    restaurants = [
        Restaurant('Trattoria Sole, Mio', 5),
        Restaurant('Umami Blossom', 3),
        Restaurant('The Hungry Moose', 4)
    ]
    items = [
        Item('Pizza Margherita', restaurants[0], 'Pizza', 'Pizza mit Tomate und Mozeralla', 5.99, 5),
        Item('Pizza Salami', restaurants[0], 'Pizza', 'Pizza mit Salami', 7.99, 4),
        Item('Pizza Champignon', restaurants[0],'Pizza', 'Pizza mit Champignons', 7.99, 4),
        Item('Pizza Hawaii', restaurants[0], 'Pizza', 'Pizza mit Ananas und Vorderschinken', 9.99, 3),
        Item('Cheeseburger', restaurants[2], 'Burger', 'Mit Rindfleisch, Käse, Gewürzgurken, Burger-Souce', 4.99, 4),
        Item('Chicken-Burger', restaurants[2], 'Burger', 'Mit Chicken, Eisbergsalat und Mayonaise', 6.49, 5),
        Item('Hot-Cilly-Burger', restaurants[2], 'Burger', 'Mit Rindfleich, Jalapenos, Tabasco, Salat, sauren Gurken, Tomaten, Zwiebeln, Souce', 7.49, 5),
        Item('Spaghetti Napoli', restaurants[0], 'Pasta', 'Mit Tomatensouce', 5.49, 4),
        Item('Spaghetti Bolognese', restaurants[0],'Pasta', 'Mit Tomatiensouce und Hackfleich', 5.99, 3),
        Item('Tortaloni', restaurants[0], 'Pasta', 'Mit Käse-Sahne Souce', 5.99, 5),
        Item('Avokado Hoso Maki', restaurants[1], 'Sushi', 'Lachs mit Avokado, 8 Stück', 4.99, 4),
        Item('Hassel Hoso Maki', restaurants[1], 'Sushi', 'Vegetarisch, Mit Gurke, Frischkäse und Lauch', 4.99, 2)
    ]
    
    for restaurant in restaurants:
        restaurant.add()
    for item in items:
        item.add()