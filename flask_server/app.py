from flask import Flask, request, jsonify

import json
from scrape.apollo import apollo
from scrape.medibuddy import medibuddy
from scrape.pharmeasy import pharmeasy
from scrape.onemg import onemg

app=Flask(__name__)

FUNCTIONS=[apollo,medibuddy,pharmeasy,onemg]

@app.route('/')
def hello_world():
    return 'Welcome to MedEZ API'

@app.route('/search',methods=["GET","POST"])
def search():
    if request.method=='GET':
        name=request.args.get('name')
    else:
        name=request.form.get('name')
    response={}
    response["name"]=name
    response["sources"]=[]
    for function in FUNCTIONS:
        if function==apollo:
            apollo_response=json.loads(function(name))
            response["desc"]=apollo_response["desc"]
            del apollo_response["desc"]
            response["sources"].append(apollo_response)
        else:
            response["sources"].append(json.loads(function(name)))
    return jsonify(response)
    
