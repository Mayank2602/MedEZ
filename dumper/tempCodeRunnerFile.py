from concurrent.futures import ThreadPoolExecutor as PoolExecutor
import requests
from tqdm import tqdm
import json

MAX_THREADS = 100

database=[]

def download_url(counter):
    r=requests.get(f"https://search.sastasundar.com/product_find?product_id={counter}")
    obj=json.loads(r.text)
    if obj["items"]!=[]:
        database.append(obj["items"][0]["ProductName"])
    print(f"Done {counter}")

futures=[]
for i in range(1,100):
    with PoolExecutor(max_workers=MAX_THREADS) as executor:
        futures.append(executor.submit(download_url, str(i)))

f=open("database.bin","w")
f.write(str(database))
f.close()
