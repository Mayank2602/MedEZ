from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import json
from scrape.apollo import apollo
from scrape.medibuddy import medibuddy
from scrape.pharmeasy import pharmeasy
from scrape.onemg import onemg

from medextractor.main import super_parse

import os


app=Flask(__name__)
cors = CORS(app)

FUNCTIONS=[apollo,medibuddy,pharmeasy,onemg]

@app.route('/')
def hello_world():
    return 'Welcome to MedEZ API'

@cross_origin()
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

@cross_origin()
@app.route('/prescription',methods=["GET","POST"])
def prescription():
    if request.method=='GET':
        filename=request.args.get('filename')
        upath=os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'server','uploads',filename))
        response=json.loads(super_parse(upath))
        return jsonify(response)
    else if request.method=='POST':
        filename=request.form.get('filename')
        upath=os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'server','uploads',filename))
        response=json.loads(super_parse(upath))
        return jsonify(response)

