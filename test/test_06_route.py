import requests

def test_index(url):
    req = requests.get(url)

    assert req.status_code == 200

def test_items(url):
    req = requests.get(url + 'items')

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
