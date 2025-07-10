import os
from sqlite3 import Error
from .data import Data, DataObject

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