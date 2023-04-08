import filetype
import fitz
from ocr import ocr
import os
from medex import medex

FILENAME="timetable.jpeg"
TEXT=""

def is_pdf(path_to_file):
    return filetype.guess(path_to_file).mime == 'application/pdf'

def is_image(path_to_file):
    if filetype.is_image(path_to_file):
        return True
    else:
        return False

if is_image(FILENAME):
    TEXT+=ocr(FILENAME)
elif is_pdf(FILENAME):
    doc=fitz.open(FILENAME)
    for page in doc:
        image=page.get_pixmap()
        image.save("tmp.png")
        TEXT+=ocr("tmp.png")
        os.remove("tmp.png")
        
print(TEXT)
print()
print(medex(TEXT))