import datetime
from database import DataObject

class Customer(DataObject):
    def __init__(self,email:str, hpassword:str, fname:str, lname:str, birth_date:str, street_no:str, zip_code:str, city:str, id:int=0) -> None:
        super().__init__()
        self.__id = id
        self.__email = email
        self.__hpassord = hpassword
        self.__fname = fname
        self.__lname = lname
        self.__birth_date = datetime.datetime.strptime(birth_date, '%Y-%m-%d')
        self.__street_no = street_no
        self.__zip_code = zip_code
        self.__city = city