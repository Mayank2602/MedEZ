import requests
import json

from unicode_patch import unicode_patch

def medibuddy(name):
    URL="https://meds-service.medibuddy.in/app/medicine/search"
    r=requests.post(URL, json={"key":name})
    response=json.loads(r.text)
    message=response["message"]
    if message!=[]:
        name=message[0]["name"]
        price=str(message[0]["discountPrice"])

        name=unicode_patch(name)
        price=unicode_patch(price)

    else:
        name=""
        price=""
    
    details={
        "name":name.strip(),
        "price":price.strip()
    }
    
    return json.dumps(details)

