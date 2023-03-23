import requests
import json
import time

endpoint_url = "https://maps.googleapis.com/maps/api/place/textsearch/json"

params = {
    "query": "GAA Club Dublin",
    "location": "53.3213275,-6.2497396",
    "radius": 2000,
    "region": "ir",
    "key": "AIzaSyAF07_m_fY9IEIK4aDnrgwPr5-rSYMWprE"
}

params_hospital = {
    "query": "hospital",
    "location": "53.3213275,-6.2497396",
    "radius": 2000,
    "region": "ir",
    "key": "AIzaSyAF07_m_fY9IEIK4aDnrgwPr5-rSYMWprE"
}


params_garda = {
    "query": "garda",
    "location": "53.3213275,-6.2497396",
    "radius": 2000,
    "region": "ir",
    "key": "AIzaSyAF07_m_fY9IEIK4aDnrgwPr5-rSYMWprE"
}


#res = requests.get(endpoint_url, params=params_hospital)
res = requests.get(endpoint_url, params=params_garda)
locations = json.loads(res.content)

print("there're %d locations \n"%len(locations["results"]))

for result in locations["results"]:
    print("Name:", result["name"])
    print("Address:", result["formatted_address"])
    print("Location:", result["geometry"]["location"])
    print("Place ID:", result["place_id"])
    print()

# Write locations to a JSON file
output = []
for result in locations["results"]:
    data = {
        "Name": result["name"],
        "Address": result["formatted_address"],
        "Location": result["geometry"]["location"],
        "Place ID": result["place_id"]
    }
    output.append(data)

with open("locations.json", "w") as f:
    json.dump(output, f)
print("locations written to locations.json file")