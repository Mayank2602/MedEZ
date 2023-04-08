from bs4 import BeautifulSoup
import json
import requests

from .unicode_patch import unicode_patch

def pharmeasy(name):
    source= requests.get(f'https://pharmeasy.in/search/all?name={name}').text
    soup=BeautifulSoup(source,'lxml')
    
    name=soup.find('h1',class_='ProductCard_medicineName__8Ydfq').text
    try:
        div=soup.find('div',class_=('ProductCard_medicineUnitContainer__cBkHl'))
        price=div.find('div',class_='ProductCard_gcdDiscountContainer__CCi51').find('span').text
        link=div.find('a',class_='ProductCard_medicineUnitWrapper__eoLpy ProductCard_defaultWrapper__nxV0R').get('href')
    except:
        price=soup.find('div',class_=('ProductCard_ourPrice__yDytt')).text
        link=div.find('a',class_='ProductCard_medicineUnitWrapper__eoLpy ProductCard_defaultWrapper__nxV0R').get('href')
        
    name=unicode_patch(name)
    price=unicode_patch(price)
    details={
                "name":name.strip(),
                "price":price.strip(),
                "url":f'https://pharmeasy.in{link}'.strip(),
                'source':'PharmEasy'
            }

    return json.dumps(details)

