#import urllib.request
import json
import requests

port = 10511
plantID = 1
interval = 1

r = requests.get("http://cslinux.utm.utoronto.ca:10511/api/getState?id=1")
#json_water = urllib2.urlopen("http://cslinux.utm.utoronto.ca:10511/api/getState?id=1").read()
#water = json.loads(json_water)['state'][0]	
print(r.json()['state'][0])



link = "http://cslinux.utm.utoronto.ca:10511/api/updateHistory"

#?id=1&temp=10&humidity=11&moisture=12

p = requests.put(url=link, data={"id":1, "temp":10, "humidity":11, "moisture":12})
print(p.json())
print("Asdas")

#send_data = urllib2.urlopen(link).read()

