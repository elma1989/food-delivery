import datetime, hashlib
from database import DataObject

class Customer(DataObject):
    def __init__(self,email:str, fname:str, lname:str, birth_date:str, street_no:str, zip_code:str, city:str, id:int=0, hpassword:str='') -> None:
        super().__init__()
        self.__id = id
        self.__email = email
        self.__hpassord = hpassword
        self.__fname = fname
        self.__lname = lname
        self.__birth_date = datetime.datetime.strptime(birth_date, '%Y-%m-%d')
        self.__db_birth = birth_date
        self.__fbith_date = self.__birth_date.strftime('%d.%m.%Y')
        self.__street_no = street_no
        self.__zip_code = zip_code
        self.__city = city

    def __repr__(self) -> str: return f'{self.fname} {self.lname}'

    def __eq__(self, other) -> bool:
        if not isinstance(other, Customer): return False
        return self.fname == other.fname and self.lname == other.lname
    
    def hash(password:str) -> str:
        return hashlib.sha256(password).hexdigest()
    
    def create_password(self, password:str) -> None:
        self.__hpassord = self.hash(password)