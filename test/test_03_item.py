from database import Item, Manager

def test_add_exists():
    mgr = Manager()
    rest = mgr.get_restaurant('Milano')
    margherita = Item('Pizza Margherita', rest, 'pizza', 'Pizza mit Mozerella und Tomate', 4.00, 4)
    salami = Item('Pizza Salami', rest, 'pizza', 'Pizza mit Salami', 7.00, 5)
    spaghetti = Item('Spaghetti', rest, 'pasta', 'Spaghetti Napolli', 5.00, 3)

    assert not margherita.exists()
    assert not mgr.get_item('Pizza Margherita')

    assert margherita.add() == 0
    assert margherita.add() == 2
    assert salami.add() == 0
    assert spaghetti.add() == 0

    assert margherita.exists()
    assert mgr.get_item('Pizza Margherita')

def test_to_dict():
    mgr = Manager()
    margherita = mgr.get_item('Pizza Margherita')
    print(margherita)

    assert margherita.to_dict() == {
        'id': 1,
        'name': 'Pizza Margherita',
        'type': 'pizza',
        'desc': 'Pizza mit Mozerella und Tomate',
        'price': 4.00,
        'review': 4,
        'restaurant': {
            'id': 1,
            'name': 'Milano',
            'review': 5
        }
    }