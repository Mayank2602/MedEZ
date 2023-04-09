from futures3.thread import ThreadPoolExecutor
from futures3.process import ProcessPoolExecutor
import requests
from tqdm import tqdm
import json

MAX_THREADS = 30

database=[]
def download_url(counter):
    r=requests.get(f"https://search.sastasundar.com/product_find?product_id={counter}")
    obj=json.loads(r.text)
    if obj["items"]!=[]:
        database.append(obj["items"][0]["ProductName"])
    
for i in range(1,100):
    with ThreadPoolExecutor(max_workers=MAX_THREADS) as executor:
        executor.map(download_url, str(i))
