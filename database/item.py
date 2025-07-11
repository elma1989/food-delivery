from database import DataObject

class Item(DataObject):
    def __init__(self, name:str, desc:str, price:float, id:int = 0):
        self.__id = id
        self.__name = name
        self.__desc = desc
        self.__price = price

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