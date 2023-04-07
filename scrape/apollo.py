import requests
from bs4 import BeautifulSoup

import json

from unicode_patch import unicode_patch

def apollo(name):
    URL=f"https://www.apollopharmacy.in/search-medicines/{name}"
    source=requests.get(URL).text
    soup=BeautifulSoup(source,'lxml')

    productcard=soup.find('div',class_="ProductCard_productCardGrid__ZQBc1")
    name=soup.find('p',class_="ProductCard_productName__f82e9")
    price=soup.find('div',class_="ProductCard_priceGroup__V3kKR")
    for match in price.findAll('span'):
        match.decompose()
    name=name.text
    price=price.text
    name=unicode_patch(name)
    price=unicode_patch(price)

    details={
            "name":name.strip(),
            "price":price.strip()
        }
    
    return json.dumps(details)



