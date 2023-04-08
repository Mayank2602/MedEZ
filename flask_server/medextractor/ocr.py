import os, io
from google.cloud import vision
import pandas as pd


os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = f"{os.path.join(os.path.dirname(__file__), 'token.json')}"

client = vision.ImageAnnotatorClient()

def ocr(file_name):
    with io.open(file_name, 'rb') as image_file:
        content = image_file.read()
    image = vision.Image(content=content)
    response = client.text_detection(image=image)
    df = pd.DataFrame(columns=['locale', 'description'])
    texts = response.text_annotations
    for text in texts:
        df = df._append(
            dict(
                locale=text.locale,
                description=text.description
            ),
            ignore_index=True
        )
    return df['description'][0]
