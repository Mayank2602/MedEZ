from bs4 import BeautifulSoup
import json
import requests

from unicode_patch import unicode_patch


def pharmeasy(name):
    source= requests.get(f'https://pharmeasy.in/search/all?name={name}').text
    soup=BeautifulSoup(source,'lxml')
    
    name=soup.find('h1',class_='ProductCard_medicineName__8Ydfq').text
    try:
        div=soup.find('div',class_=('ProductCard_medicineUnitContainer__cBkHl'))
        price=div.find('div',class_='ProductCard_gcdDiscountContainer__CCi51').find('span').text
    except:
        price=soup.find('div',class_=('ProductCard_ourPrice__yDytt')).text
        

    name=unicode_patch(name)
    price=unicode_patch(price)
    details={
                "name":name.strip(),
                "price":price.strip()
            }

    return json.dumps(details)


