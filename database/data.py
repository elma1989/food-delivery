from sqlite3 import connect, Connection, Cursor, Error

class Data:
    def __init__(self):
        self.__con = None
        self.__c = None

    @property
    def con(self) -> Connection|None: return self.__con

    @property
    def c(self) -> Cursor|None: return self.__c

    def connect(self) -> None:
        if not self.con:
            try:
                self.__con = connect('database/food.db')
                self.__c = self.con.cursor()
            except Error as e: print(e)
            
    def close(self) -> None:
        if self.con and self.c:
            self.c.close()
            self.con.close()
            self.__c = None
            self.__con = None