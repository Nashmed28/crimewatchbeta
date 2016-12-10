c_ad_file = open("cambridge_address.txt", "r")
raw_log_file = open("public logs 060116-103116.csv", "r")
logs_file = open("logs.txt", "w")

c_ad = []
for line in c_ad_file:
	c_ad.append([x.strip() for x in line.split(',')])

raw_log = [] 
for line in raw_log_file:
	raw_log.append([x.strip() for x in line.split(',')])


def array_write(array):
	line = ''
	for item in array:
		line += item + '\t'
	line += '\n'
	logs_file.write(line)





formatted_data = [];
formatted_data.append(['DateTime', 'Type', 'Address', 'Latitude', 'Longtitude', 'Status', 'Description']);


import json
import requests
API = 'AIzaSyAEZR5lSww__GQwr3V_Tu0NQKQpzCO5J8k'
area = '+Cambridge,+Massachusetts'
# r = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + area + "&key=" + API)


def coordinate(address):
	for item in c_ad:
		if item[3].upper() in address.upper():
			return [float(item[5]), float(item[4])]
	return None;
	# return [40.7128, 74.0059];


del raw_log[0]

i = 1;

for item in raw_log:
	datetime = item[1];
	crimetype = item[3];
	address = item[4];
	
	url_address = address.replace(" ", "+");
	r = requests.get("https://maps.googleapis.com/maps/api/geocode/json?address=" + url_address + area +  "&key=" + API);
	lat = '40.7128';
	lng = '74.0059';
	if r.status_code == 200:
		content = json.loads(r.content);
		if content['results'] != []:
			lat = str(content['results'][0]['geometry']['location']['lat']);
			lng = str(content['results'][0]['geometry']['location']['lng']);

	status = item[5];
	description = item[6];

	new_data = [datetime, crimetype, address, lat, lng, status, description];
	# formatted_data.append(new_data);
	array_write(new_data);
	print(i);
	i = i + 1;





# print formatted_data;
# array_write(formatted_data[0]);
# print raw_log[0][7]
# print coordinate("LYMAN_LAB_11_OXFORD_ST")
# print c_ad

# print r.status_code
# print r.headers
# a = json.loads(r.content)
# print a['results'][0]['geometry']['location']['lat']

# 'location': {u'lat': 42.3736158, u'lng': -71.10973349999999}}



