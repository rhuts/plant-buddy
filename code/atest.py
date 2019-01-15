import requests
import json
port = 10260
plantID = 1
link_for_threshold = "http://cslinux.utm.utoronto.ca:" + str(port) + "/api/getThreshold?id=" + str(plantID)
json_threshold = requests.get(link_for_threshold)
threshold = json_threshold.json()['moisture'][0]
print(threshold)