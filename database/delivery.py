from database import DataObject, Customer, Error

class Delivery(DataObject):
    # region properties
    def __init__(self, customer: Customer, time:str, id:int=0) -> None:
        self.__customer = customer
        self.__time = time
        self.__items = []

    def __repr__(self) -> str: return f'{str(Customer)}: {self.__time}'

    def __eq__(self, other) -> bool:
        if not isinstance(other, Delivery): return False
        return self.customer == other.customer and self.__time == other.__time