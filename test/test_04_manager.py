from database import Manager, Item, Customer

def test_items():
    mgr = Manager()
    spaghetti = mgr.get_item('Spaghetti')
    salami = mgr.get_item('Pizza Salami')
    margherita = mgr.get_item('Pizza Margherita')

    assert mgr.items == [spaghetti, margherita, salami]

def test_deliveries():
    mgr = Manager()
    john = mgr.get_customer('john.doe@mail.de')
    del1 = mgr.get_delivery(john,'2025-07-12 07:00')
    del2 = mgr.get_delivery(john,'2025-07-12 08:00')
    
    assert mgr.deliveries(john) == [del1, del2]