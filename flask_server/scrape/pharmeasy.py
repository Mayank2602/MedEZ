from bs4 import BeautifulSoup
import json
import requests

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch
default={
    "name":"",
    "price":"",
    "url":"",
    "source":""
}
def pharmeasy(name):
    source=requests.get(f'https://pharmeasy.in/search/all?name={name}').text
    soup=BeautifulSoup(source,'lxml')
    name=soup.find('h1',class_='ProductCard_medicineName__8Ydfq').text
    try:
        div=soup.find('div',class_=('ProductCard_medicineUnitContainer__cBkHl'))
        price=div.find('div',class_='ProductCard_gcdDiscountContainer__CCi51').find('span').text
        link=div.find('a',class_='ProductCard_medicineUnitWrapper__eoLpy ProductCard_defaultWrapper__nxV0R').get('href')
    except:
        try:
            price=soup.find('div',class_=('ProductCard_ourPrice__yDytt')).text
            link=div.find('a',class_='ProductCard_medicineUnitWrapper__eoLpy ProductCard_defaultWrapper__nxV0R').get('href')
        except:
            return json.dumps(default)

    name=unicode_patch(name)
    price=unicode_patch(price).replace("*","").replace("MRP","")
    details={
                "name":name.strip(),
                "price":float(price.strip()),
                "url":f'https://pharmeasy.in{link}'.strip(),
                'source':'PharmEasy'
            }
    return json.dumps(details)

