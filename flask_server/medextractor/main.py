import filetype
import fitz
import os

import sys
sys.path.append(os.path.join(os.path.dirname(__file__)))
from ocr import ocr
from medex import medex

import json

def is_pdf(path_to_file):
    return filetype.guess(path_to_file).mime == 'application/pdf'

def is_image(path_to_file):
    if filetype.is_image(path_to_file):
        return True
    else:
        return False

def need_ocr_or_not(path_to_file):
    extracted_text=''.join([page.get_text() for page in fitz.open(path_to_file)])
    if extracted_text:
        doc_type="text"
    else:
        doc_type="scan"
    return doc_type

def parse(path_to_file):
    doc_type=""
    TEXT=""
    if is_image(path_to_file):
        TEXT+=ocr(path_to_file)
        doc_type="scan"
    elif is_pdf(path_to_file):
        doc_type=need_ocr_or_not(path_to_file)
        doc=fitz.open(path_to_file)
        for page in doc:
            image=page.get_pixmap()
            image.save("tmp.png")
            TEXT+=ocr("tmp.png")
            os.remove("tmp.png")
    return (doc_type,medex(TEXT))

def super_parse(path_to_file):
    processed=parse(path_to_file)
    response={}
    response["type"]=processed[0]
    response["drugs"]=[]
    
    for element in processed[1]:
        if(element[1]=="DRUG"):
            response["drugs"].append(element[0])
    
    return json.dumps(response)
