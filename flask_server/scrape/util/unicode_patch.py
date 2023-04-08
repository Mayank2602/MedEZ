def unicode_patch(text):
    strencode=text.encode("ascii", "ignore")
    strdecode=strencode.decode()
    return strdecode