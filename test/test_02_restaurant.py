from database import Restaurant, Manager

def test_add_exists():
    mgr = Manager()
    milano = Restaurant('Milano', 5)

    assert not milano.exists()
    assert not mgr.get_restaurant('Milano')

    assert milano.add() == 0
    assert milano.add() == 2

    assert milano.exists()
    assert mgr.get_restaurant('Milano')