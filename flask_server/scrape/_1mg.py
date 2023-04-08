from selenium import webdriver 
from selenium.webdriver.common.by import By 
 
from selenium.webdriver.chrome.service import Service as ChromeService 
from webdriver_manager.chrome import ChromeDriverManager 

import json

from unicode_patch import unicode_patch

from bs4 import BeautifulSoup

from .unicode_patch import unicode_patch


def _1mg(name):
    url=f"https://www.1mg.com/search/all?name={name}" 
    options = webdriver.ChromeOptions() 
    options.add_argument("--headless=new")
    options.add_argument('--ignore-certificate-errors')
    options.add_experimental_option('excludeSwitches', ['enable-logging'])

    with webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options) as driver: 
        driver.get(url)
        source=driver.page_source

        soup=BeautifulSoup(source, 'lxml')
        try:
            name=soup.find('div',class_="style__pro-title___3G3rr").text
        except:
            try:
                name=soup.find('span',class_="style__pro-title___3zxNC").text
            except:
                name=""
        try:
            price=soup.find('div',class_="style__price-tag___KzOkY").text
        except:
            try:
                price=soup.find('div',class_="style__price-tag___B2csA").text
            except:
                price=""

        name=unicode_patch(name)
        price=unicode_patch(price)
        details={
                    "name":name.strip(),
                    "price":price.strip()
                }
    
    return json.dumps(details)

