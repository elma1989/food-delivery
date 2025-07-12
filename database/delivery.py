from database import DataObject, Customer, Item, Error

class Delivery(DataObject):
    # region properties
    def __init__(self, customer: Customer, time:str, del_id:int=0, items:list[tuple[Item, int]]=[]) -> None:
        super().__init__()
        self.__id = del_id
        self.__customer:Customer|None = customer if customer.exists() else None
        self.__time = time
        self.__items = items

    def __repr__(self) -> str: return f'{str(Customer)}: {self.__time}'

    def __eq__(self, other) -> bool:
        if not isinstance(other, Delivery): return False
        return self.__customer == other.__customer and self.__time == other.__time
    
    @property
    def del_id(self) -> int: return self.__id
    
    @property
    def items(self) -> list[tuple[Item,int]]: return self.__items

    @items.setter
    def items(self, items:list[tuple[Item, int]]):
        correct_type: bool = True
        for item in items:
            if not isinstance(item, tuple): correct_type = False
            if not isinstance(item[0], Item) or not isinstance(item[1], int): correct_type = False

        if correct_type: self.__items = items
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
        return {}