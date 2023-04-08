import spacy

med7 = spacy.load("en_core_med7_lg")

def medex(text):
    doc = med7(text)
    return [(ent.text, ent.label_) for ent in doc.ents]
