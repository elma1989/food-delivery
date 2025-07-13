from database import DataObject, Error

class Restaurant(DataObject):
    # region Properties
    def __init__(self, name:str, review:int, res_id:int=0) -> None:
        super().__init__()
        self.__name = name
        self.__review = review
        self.__res_id = res_id

    @property
    def res_id(self) -> int: return self.__res_id

    def __repr__(self) -> str: return self.__name

    def __eq__(self, other) -> bool:
        if not isinstance(other, Restaurant): return False
        return self.__name == other.__name

    def exists(self) -> bool:
        exists:bool = False
        sql:str = 'SELECT * FROM restaurant WHERE res_name = ?'

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql,(self.__name,))
                res = self.c.fetchone()
                if res: exists = True
        except Error as e: print(e)
        finally: self.close()

        return exists
    
    def add(self) -> int:
        success:bool = False
        sql:str = 'INSERT INTO restaurant VALUES(NULL, ?, ?)'

        if self.exists(): return 2

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql,(self.__name, self.__review))
                self.con.commit()
                success = True
        except Error as e: print(e)
        finally: self.close()

        return 0 if success else 3

    def to_dict(self) -> dict:
        return {
            'id':self.res_id,
            'name': self.__name,
            'review': self.__review
        }