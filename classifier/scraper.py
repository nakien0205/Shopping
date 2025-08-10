import requests
from bs4 import BeautifulSoup
import time

proxy = {
    'http': 'http://35.238.111.20:3128',
    'https': 'http://35.238.111.20:3128'
}

header = {
    'User-Agent': 'Mozilla/5.0'
}

def fetch(url, max_retrieve=3):
    for attempt in range(1, max_retrieve+1):
        print(f'Retrieve: {attempt}')
        try:
            response = requests.get(url, proxies=proxy, headers=header, timeout=5)
            if response.status_code == 200:
                return response.text
            else:
                print('Retrying')
        except requests.RequestException as e:
            print(f'Error: {e}')
        time.sleep(2)

url = 'http://books.toscrape.com/'
html = fetch(url)

