import requests
import json

def find_productid(name):
    URL=f"https://search.sastasundar.com/search_list?q={name}"
    r=requests.get(URL)
    obj=json.loads(r.text)
    try:
        productid=obj["products"][0][8]
    except:
        productid=-1
    return productid

def find_alternative(name):
    productid=find_productid(name)
    alternatives=[]
    if productid==-1:
        return alternatives
    URL=f"https://search.sastasundar.com/similar_products?product_id={productid}"
    r=requests.get(URL)
    obj=json.loads(r.text)
    products=obj["products"]

    for product in products:
        alternatives.append(product[0].strip())
    return alternatives

def build_array(name):
    alternatives=find_alternative(name)
    response=[]
    for alternative in alternatives:
        temp={}
        URL=f"https://search.sastasundar.com/product_find?product_id={find_productid(alternative)}"
        r=requests.get(URL)
        obj=json.loads(r.text)
        items=obj["items"]

        temp["name"]=alternative
        temp["price"]=items[0]["MRP"]
        temp["url"]="https://healthplus.flipkart.com/"
        temp["source"]="flipkart"
        response.append(temp)
    return json.dumps(response)

