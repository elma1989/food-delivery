import requests, json

def test_index(url):
    req = requests.get(url)

    assert req.status_code == 200

def test_create_user(url):
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

def post_delivery(url):
    data = [
        {
            'name':'Pizza Margherita',
            'amount':2
        }, {
            'name':'Pizza Salami',
            'amount':1
        }
    ]
    req = requests.post(url + 'users/2/deliveries', json.dumps(data))

    assert req.status_code == 201

def delete_user(url):
    req = requests.delete(url + 'users/2')
    assert req.status_code == 204