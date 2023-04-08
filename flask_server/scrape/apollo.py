import requests
from bs4 import BeautifulSoup

import json

from .unicode_patch import unicode_patch

def apollo(name):
    URL=f"https://www.apollopharmacy.in/search-medicines/{name}"
    source=requests.get(URL).text
    soup=BeautifulSoup(source,'lxml')

    productcard=soup.find('div',class_="ProductCard_productCardGrid__ZQBc1")
    name=soup.find('p',class_="ProductCard_productName__f82e9")
    price=soup.find('div',class_="ProductCard_priceGroup__V3kKR")
    url = soup.find('a',class_="ProductCard_proDesMain__LWq_f")

    for match in price.findAll('span'):
        match.decompose()

    name=name.text
    price=price.text
    url=f"https://www.apollopharmacy.in{url['href']}"

    name=unicode_patch(name)
    price=unicode_patch(price)
    url=unicode_patch(url)

    source=requests.get(url).text
    soup=BeautifulSoup(source,'lxml')
    desc=soup.find('div',class_='ProductDetailsGeneric_txtListing__d7bk_').text
    
    desc=unicode_patch(desc)

    details={
            "name":name.strip(),
            "price":float(price.strip()),
            "url":url.strip(),
            'desc':desc,
            "source":"Apollo",

        }
    
    return json.dumps(details)
