from database import Manager, Item

def test_items():
    mgr = Manager()
    spaghetti = mgr.get_item('Spaghetti')
    salami = mgr.get_item('Pizza Salami')
    margherita = mgr.get_item('Pizza Margherita')

    assert mgr.items == [spaghetti, margherita, salami]