from database import DataObject, Customer, Item, Error

class Delivery(DataObject):
    # region properties
    def __init__(self, customer: Customer, time:str, del_id:int=0) -> None:
        super().__init__()
        self.__id = del_id
        self.__customer:Customer|None = customer if customer.exists() else None
        self.__time = time
        self.__items:list[tuple[Item, int]] = []

    def __repr__(self) -> str: return f'{str(Customer)}: {self.__time}'

    def __eq__(self, other) -> bool:
        if not isinstance(other, Delivery): return False
        return self.__customer == other.__customer and self.__time == other.__time
    
    @property
    def del_id(self) -> int: return self.__id
    
    @property
    def items(self) -> list[tuple[Item,int]]:
        sql:str = """
            SELECT i.item_name, i.item_type, i.item_description, i.item_price, i.item_id, d.item_amount
            FROM delivery_item d JOIN item i ON d.item_id = i.item_id
            WHERE d.del_id = ?
            ORDER BY i.item_name
            """
        
        if self.del_id == 0: return []

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (self.del_id,))
                res = self.c.fetchall()
                self.__items = [(Item(row[0], row[1], row[2], row[3], row[4]),row[5]) for row in res]
        except Error as e: print(e)
        finally: self.close()

        return self.__items

    @items.setter
    def items(self, items:list[tuple[Item, int]]):
        correct_type: bool = True
        sql:str = 'INSERT INTO delivery_item VALUES(?,?,?)'
        data:list[tuple] = [(self.del_id, item[0].item_id, item[1]) for item in items]

        for item in items:
            if not isinstance(item, tuple): correct_type = False
            if not isinstance(item[0], Item) or not isinstance(item[1], int): correct_type = False

            if self.exists() and self.items == []:
                try:
                    self.connect()
                    if self.con and self.c:
                        self.c.executemany(sql, data)
                        self.con.commit()
                        self.__items = items
                except Error as e: print(e)
                finally: self.close()

    # endregion
    # region methods
    def exists(self) -> bool:
        exists:bool = False
        sql:str = 'SELECT * FROM delivery WHERE  cus_id = ? AND del_time = ?'

        if self.del_id != 0: return True
        if not self.__customer: return False

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (self.__customer.customer_id, self.__time))
                res = self.c.fetchone()
                if res:
                    self.__id = res[0]
                    exists = True
        except Error as e: print(e)
        finally: self.close()

        return exists
    
    def add(self) -> int:
        success:bool = False
        sql:str = 'INSERT INTO delivery VALUES(NULL, ?, ?)'

        if not self.__customer: return 1
        if self.exists(): return 2

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql,(self.__time, self.__customer.customer_id))
                self.con.commit()
                success = True
        except Error as e: print(e)
        finally: self.close()

        return 0 if success else 3
    
    def to_dict(self) -> dict:
        items = self.items
        return {
            'id': self.del_id,
            'customer': self.__customer.to_dict() if self.__customer else None,
            'time': self.__time,
            'items': [
                {'item': item[0].to_dict(), 'amount': item[1]} for item in items
            ]
        }
    # endregion