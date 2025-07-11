from database import init_db, Customer, Manager

def test_add_exists():
    manager = Manager()
    john = Customer('john.doe@mail.de', 'John','Doe','1990-01-01', 'Musterstr. 1','12345', 'Musterstadt')

    init_db()

    assert not manager.get_customer('john.doe@mail.de')
    assert not john.exists()

    assert john.add() == 1
    john.create_password('Password')
    assert john.add() == 0
    assert john.add() == 2

    assert john.exists()
    assert manager.get_customer('john.doe@mail.de') == john

def test_to_dict():
    manager = Manager()
    john = manager.get_customer('john.doe@mail.de')

    assert john.to_dict() == {
        'id': 1,
        'fname': 'John',
        'lname': 'Doe',
        'birthDate': '1990-01-01',
        'street': 'Musterstr. 1',
        'zipCode': '12345',
        'city': 'Musterstadt'
    }