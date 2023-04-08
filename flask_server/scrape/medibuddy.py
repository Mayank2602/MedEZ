import requests
import json

import sys, os
sys.path.append(os.path.join(os.path.dirname(__file__), 'util'))
from unicode_patch import unicode_patch

def medibuddy(name):
    URL="https://meds-service.medibuddy.in/app/medicine/search"
    r=requests.post(URL, json={"key":name})
    response=json.loads(r.text)
    message=response["message"]
    if message!=[]:
        name=message[0]["name"]
        code=message[0]["drugCode"]
        price=str(message[0]["discountPrice"])
        link=f'https://www.medibuddy.in/about/{code}'
        name=unicode_patch(name)
        price=unicode_patch(price)
    else:
        name=""
        price=""
    
    details={
        "name":name.strip(),
        "price":float(price.strip()),
        "url":link.strip(),
        "source":"MediBuddy"
    }
    
    return json.dumps(details)

