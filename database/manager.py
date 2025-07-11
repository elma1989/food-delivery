from database import Data, Error, Customer, Item

class Manager(Data):
    def __init__(self):
        super().__init__()

    def get_customer(self, email:str) -> Customer|None:
        customer:Customer|None = None
        sql:str = 'SELECT * FROM customer WHERE cus_email = ?'

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (email,))
                res = self.c.fetchone()
                if res: customer = Customer(res[1], res[3], res[4], res[5], res[6], res[7], res[8], res[0], res[2])
        except Error as e: print(e)
        finally: self.close()

        return customer
    
    def get_item(self, name:str) -> Item|None:
        item:Item|None = None
        sql:str = 'SELECT * FROM item WHERE item_name = ?'

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (name, ))
                res = self.c.fetchone()
                if res: item = Item(res[1], res[2], res[3], res[4], res[0])
        except Error as e: print(e)
        finally: self.close()

        return item