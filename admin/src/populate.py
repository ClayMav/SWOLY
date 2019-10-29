import json
# import google.cloud
# from google.cloud import firestore

# db = firestore.Client()
# batch = db.batch()

# data = {
#     u'dateJoined':firestore.SERVER_TIMESTAP,
#     u'name': u'John Doe'
# }
user = {}

with open("users.json") as json_data:
    data = json.load(json_data)
    for d in data:
        db.collection(u'users').add({u'dateJoined': firestore.SERVER_TIMESTAP,
                                     u'name': d[0]})
