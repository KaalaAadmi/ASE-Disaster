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

res = requests.get(endpoint_url, params=params)
safe_house_locs = json.loads(res.content)

print("there're %d locations \n"%len(safe_house_locs["results"]))

for result in safe_house_locs["results"]:
    print("Name:", result["name"])
    print("Address:", result["formatted_address"])
    print("Location:", result["geometry"]["location"])
    print("Place ID:", result["place_id"])
    print()

# Write safe_house_locs to a JSON file
output = []
for result in safe_house_locs["results"]:
    data = {
        "Name": result["name"],
        "Address": result["formatted_address"],
        "Location": result["geometry"]["location"],
        "Place ID": result["place_id"]
    }
    output.append(data)

with open("safe_house_locs.json", "w") as f:
    json.dump(output, f)
print("safe_house_locs written to safe_house_locs.json file")