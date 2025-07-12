from database import Manager, Customer, Delivery

def test_add_exists():
    mgr = Manager()
    john = mgr.get_customer('john.doe@mail.de')
    delivery1 = Delivery(john, '2025-07-12 08:00')
    delivery2 = Delivery(Customer('mmuster@mail.de', 'Max','Mustermann', '1990-12-31','Musterstr. 1.', '12345', 'Musterstadt'), '2025-07-12 09:00')

    assert not delivery1.exists()
    assert not mgr.get_delivery(john, '2025-07-12 08:00')

    assert delivery2.add() == 1
    assert delivery1.add() == 0
    assert delivery1.add() == 2

    assert delivery1.exists()
    assert mgr.get_delivery(john, '2025-07-12 08:00')