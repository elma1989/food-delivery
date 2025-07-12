import requests, json

def test_index(url):
    req = requests.get(url)

    assert req.status_code == 200

def test_items(url):
    req = requests.get(url + 'items/')

    assert req.status_code == 200
    data =  req.json()
    assert data == [
        {
            'id': 3,
            'name': 'Spaghetti',
            'type': 'pasta',
            'desc': 'Spaghetti Napolli',
            'price': 5
        }, {
            'id': 1,
            'name': 'Pizza Margherita',
            'type': 'pizza',
            'desc': 'Pizza mit Mozerella und Tomate',
            'price': 4
        }, {
            'id': 2,
            'name': 'Pizza Salami',
            'type': 'pizza',
            'desc': 'Pizza mit Salami',
            'price': 7
        },
    ]

def test_crate_user(url):
    empty = {}
    john = {
        'email':'john.doe@mail.de',
        'password':'Pa$$word',
        'fname': 'John',
        'lname': 'Doe',
        'birthDate': '1990-01-01',
        'street': 'Musterstr. 1',
        'zipCode': '12345',
        'city': 'Musterstadt'
    }

    req_empty = requests.post(url + 'users/', json.dumps(empty))
    req1_john = requests.post(url + 'users/', json.dumps(john))
    req2_john = requests.post(url + 'users/', json.dumps(john))

    assert req_empty.status_code == 400
    assert req1_john.status_code == 201
    assert req2_john.status_code == 409