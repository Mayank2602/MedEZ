import json
from bs4 import BeautifulSoup
import cfscrape

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch
default={
    "name":"",
    "price":"",
    "url":"",
    "source":""
}
def onemg(name):
    scraper = cfscrape.create_scraper()
    url=f"https://www.1mg.com/search/all?name={name}" 
    source=scraper.get(url).text
    soup=BeautifulSoup(source, 'lxml')

    try:
        name=soup.find('div',class_="style__pro-title___3G3rr").text
    except:
        try:
            name=soup.find('span',class_="style__pro-title___3zxNC").text
        except:
            return json.dumps(default)
    try:
        price=soup.find('div',class_="style__price-tag___KzOkY").text
    except:
        try:
            price=soup.find('div',class_="style__price-tag___B2csA").text
        except:
            return json.dumps(default)
    try:
        href=soup.find('a', class_="style__product-link___1hWpa")["href"]
    except:
        try:
            body=soup.find('div',class_="style__horizontal-card___1Zwmt style__height-158___1XIvD")
            href=body.find('a')["href"]
        except:
            return json.dumps(default)

    url=f"https://www.1mg.com{href}"
    name=unicode_patch(name)
    price=unicode_patch(price)
    url=unicode_patch(url)
    details={
                "name":name.strip(),
                "price":float(price.strip()),
                "url":url.strip(),
                'source':'onemg'
            }
    return json.dumps(details)
