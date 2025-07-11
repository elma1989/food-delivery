from database import Item, Manager

def test_add_exists():
    mgr = Manager()
    margherita = Item('Pizza Margherita', 'pizza', 'Pizza mit Mozerella und Tomate', 4.00)

    assert not margherita.exists()
    assert not mgr.get_item('Pizza Margherita')

    assert margherita.add() == 0
    assert margherita.add() == 2

    assert margherita.exists()
    assert mgr.get_item('Pizza Margherita')

def test_to_dict():
    mgr = Manager()
    margherita = mgr.get_item('Pizza Margherita')

    assert margherita.to_dict() == {
        'id': 1,
        'name': 'Pizza Margherita',
        'type': 'pizza',
        'desc': 'Pizza mit Mozerella und Tomate',
        'price': 4.00
    }