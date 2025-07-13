from database import DataObject, Error, Restaurant

class Item(DataObject):
    # region properties
    def __init__(self, name:str, restaurant:Restaurant|None, food_type:str, desc:str, price:float ,review:int, item_id:int = 0):
        super().__init__()
        self.__id = item_id
        self.__name = name
        self.__restaurant = restaurant
        self.__food_type = food_type
        self.__desc = desc
        self.__price = price
        self.__review = review

    @property
    def item_id(self) -> int: return self.__id

    @property
    def name(self) -> str: return self.__name

    @property
    def desc(self) -> str: return self.__desc

    @property
    def price(self) -> float: return self.__price

    def __repr__(self) -> str: return self.__name

    def __eq__(self, other) -> bool:
        if not isinstance(other, Item): return False
        return self.name == other.name
    # endregion
    # region methods
    def exists(self) -> bool:
        exists:bool = False
        sql:str = 'SELECT * FROM item WHERE item_name = ?'

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql,(self.name,))
                res = self.c.fetchone()
                if res: exists = True
        except Error as e: print(e)
        finally: self.close()

        return exists
    
    def add(self) -> int:
        success:bool = False
        sql:str = 'INSERT INTO item VALUES(NULL,?,?,?,?,?,?)'

        if not self.__restaurant: return 1
        if self.exists(): return 2

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (self.name, self.__food_type, self.desc, self.price, self.__review, self.__restaurant.res_id))
                self.con.commit()
                success = True
        except Error as e: print(e)
        finally: self.close()

        return 0 if success else 3
    
    def to_dict(self) -> dict:
        return {
            'id': self.__id,
            'name': self.name,
            'type': self.__food_type,
            'desc': self.desc,
            'price': self.price,
            'restaurant': self.__restaurant.to_dict() if self.__restaurant else '-',
            'review': self.__review
        }