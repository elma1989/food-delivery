from database import Data, Error, Customer, Item, Delivery

class Manager(Data):
    #region properties
    def __init__(self):
        super().__init__()
        self.__items:list[Item] = []

    @property
    def items(self) -> list[Item]:
        sql:str = 'SELECT * FROM item ORDER by item_type, item_name'

        if self.__items == []:
            try:
                self.connect()
                if self.con and self.c:
                    self.c.execute(sql)
                    res = self.c.fetchall()
                    self.__items = [Item(row[1], row[2], row[3], row[4], row[0]) for row in res]
            except Error as e: print (e)
            finally: self.close()

        return self.__items
    # endregion
    # region find-Methods
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
    
    def get_delivery(self, customer:Customer, time:str) -> Delivery|None:
        delivery = None
        sql:str = 'SELECT * FROM delivery WHERE cus_id = ? AND del_time = ?'

        if not customer.exists(): return None

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql,(customer.customer_id, time))
                res = self.c.fetchone()
                if res: delivery = Delivery(customer, time, res[0])
        except Error as e: print(e)
        finally: self.close()

        return delivery
    
    def deliveries(self, customer:Customer) -> list[Delivery]:
        deliveries = []
        sql:str = 'SELECT * FROM delivery WHERE cus_id = ? ORDER BY del_time'

        if not customer.exists(): return []

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (customer.customer_id,))
                res = self.c.fetchall()
                deliveries = [Delivery(customer, row[1], row[0]) for row in res]
        except Error as e: print(e)
        finally: self.close()

        return deliveries
    #endregion