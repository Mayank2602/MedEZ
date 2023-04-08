from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin

import json
from scrape.apollo import apollo
from scrape.medibuddy import medibuddy
from scrape.pharmeasy import pharmeasy
from scrape.onemg import onemg

from flipkart.flipkart import build_array
from medextractor.main import super_parse

import os

def LCS(X, Y):
    m=len(X)
    n=len(Y)
    L=[[None]*(n + 1) for i in range(m + 1)]

    for i in range(m + 1):
        for j in range(n + 1):
            if i == 0 or j == 0 :
                L[i][j] = 0
            elif X[i-1] == Y[j-1]:
                L[i][j] = L[i-1][j-1]+1
            else:
                L[i][j] = max(L[i-1][j], L[i][j-1])
    return L[m][n]

def factor(X, Y):
    if(len(Y)==0 or len(X)==0) :
        return 0
    mx=0
    for i in range(len(Y)):
        if i+2*len(X)-1<len(Y):
            mx=max(mx,LCS(X,Y[i:i+2*len(X)-1]))
        else:
            break
    return (mx/len(X))*100
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
    response["alternatives"]=[]
    for function in FUNCTIONS:
        if function==apollo:
            apollo_response=json.loads(function(name))
            apollo_response["accuracy"]=factor(name.lower().replace(" ",""),apollo_response["name"].lower().replace(" ",""))
            response["desc"]=apollo_response["desc"]
            del apollo_response["desc"]
            response["sources"].append(apollo_response)
        else:
            temporary=json.loads(function(name))
            temporary["accuracy"]=factor(name.lower().replace(" ",""),temporary["name"].lower().replace(" ",""))
            response["sources"].append(temporary)
    return jsonify(response)

@cross_origin()
@app.route('/alternatives',methods=["GET","POST"])
def alternative():
    if request.method=='GET':
        name=request.args.get('name')
    else:
        name=request.form.get('name')
    built=json.loads(build_array(name))
    return jsonify(built)

@cross_origin()
@app.route('/prescription',methods=["GET","POST"])
def prescription():
    if request.method=='GET':
        filename=request.args.get('filename')
        upath=os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'server','uploads',filename))
        response=json.loads(super_parse(upath))
        os.remove(upath)
        return jsonify(response)
    elif request.method=='POST':
        filename=request.form.get('filename')
        upath=os.path.abspath(os.path.join(os.path.dirname( __file__ ), '..', 'server','uploads',filename))
        response=json.loads(super_parse(upath))
        os.remove(upath)
        return jsonify(response)

