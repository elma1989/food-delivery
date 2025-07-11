import hashlib
from datetime import datetime
from database import DataObject, Error

class Customer(DataObject):
    def __init__(self,email:str, fname:str, lname:str, birth_date:str, street_no:str, zip_code:str, city:str, id:int=0, hpassword:str='') -> None:
        super().__init__()
        self.__id = id
        self.__email = email
        self.__hpassord = hpassword
        self.__fname = fname
        self.__lname = lname
        self.__birth_date = datetime.strptime(birth_date, '%Y-%m-%d')
        self.__db_birth = birth_date
        self.__street_no = street_no
        self.__zip_code = zip_code
        self.__city = city

    @property
    def fname(self) -> str: return self.__fname

    @property
    def lname(self) -> str: return self.__lname

    @property
    def birth_date(self) -> datetime: return self.__birth_date

    def __repr__(self) -> str: return f'{self.fname} {self.lname}'

    def __eq__(self, other) -> bool:
        if not isinstance(other, Customer): return False
        return self.fname == other.fname and self.lname == other.lname
    
    @staticmethod
    def hash(password:str) -> str:
        return hashlib.sha256(password.encode()).hexdigest()
    
    def create_password(self, password:str) -> None:
        self.__hpassord = self.hash(password)

    def exists(self) -> bool:
        exists:bool = False
        sql:str = """
                SELECT * FROM customer
                WHERE cus_first_name = ? AND cus_last_name = ? AND cus_birth_date = ?
                """
        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (self.fname, self.lname, self.__db_birth))
                res = self.c.fetchone()
                if res: exists = True
        except Error as e: print(e)
        finally: self.close()

        return exists

    def add(self) -> int:
        success:bool = False
        sql:str = 'INSERT INTO customer VALUES(NULL,?,?,?,?,?,?,?,?)'

        if len(self.__hpassord) == 0: return 1
        if self.exists(): return 2

        try:
            self.connect()
            if self.con and self.c:
                self.c.execute(sql, (self.__email, self.__hpassord, self.fname, self.lname, self.__db_birth, self.__street_no, self.__zip_code, self.__city))
                self.con.commit()
                success = True
        except Error as e: print(e)
        finally: self.close()

        return 0 if success else 3

    def to_dict(self) -> dict:
        return {
            'id': self.__id,
            'fname': self.fname,
            'lname': self.lname,
            'birthDate': self.__db_birth,
            'street': self.__street_no,
            'zipCode': self.__zip_code,
            'city': self.__city
        }