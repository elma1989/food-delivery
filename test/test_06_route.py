import requests

def test_index(url):
    req = requests.get(url)

    assert req.status_code == 200
