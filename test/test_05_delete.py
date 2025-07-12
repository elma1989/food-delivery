from database import Customer, Manager

def test_customer_delete():
    mgr = Manager()
    maxm = Customer('mmuster@mail.de','Max', 'Mustermann','1991-12-31', 'Musterstr. 1', '12345', 'Musterstadt')
    john = mgr.get_customer('john.doe@mail.de')

    assert not maxm.delete()
    assert john.delete()