from random import randint
import os.path

ads = open(os.path.dirname(__file__) + '../processed_data/address_data/cambridge_address.txt','r')

address = []
for line in ads:
	address.append([x for x in line.split(',')][3])

f = open('large_powerful.txt', 'w')

s = "Date Reported\tTime Reported\tIncident Type\tDate Occurred\tTime Occurred\tLocation\tDisposition\tDescription\n"

f.write(s);

incident = ["UNWANTED GUEST", "DEMONSTRATION", "FIRE", "ASSIST STATE POLICE", "TREPASS WARNING", "NOISE COMPLAINT", "REMOVE GROUP", "THEFT", "DISTRUBANCE"]
disposition = ["open", "closed"]

def PAM (num):
	if num == 0:
		return "AM"
	if num == 1:
		return "PM"

def Type (num):
	if num < 10:
		return incident[0]
	if num >= 10 and num < 15:
		return incident[1]
	if num >= 15 and num < 20:
		return incident[2]
	if num >= 20 and num < 25:
		return incident[3]
	if num >= 25 and num < 35:
		return incident[4]
	if num >= 35 and num < 55:
		return incident[5]
	if num >= 55 and num < 65:
		return incident[6]
	if num >= 65 and num < 85:
		return incident[7]
	if num >= 85:
		return incident[8]

def disp (num):
	if num < 8:
		return "CLOSED"
	else:
		return "OPEN"

for i in range(500):
	M = randint(9,12)
	D = randint(1,31)
	H = randint(1,12)
	M1 = randint(0,5)
	M2 = randint(0,9)
	pa = PAM(randint(0,1))
	dis = disp(randint(0,10))

	line = [M, "/", D, "/2016\t", H, ":", M1, M2, pa, "\t", Type(randint(0,100)), "\t", M, "/", D, "/2016\t", H, ":", M1, M2, pa, "\t", address[randint(0, len(address)-1)], "\t", dis, "\tDescription", i, "\n"]
	
	f.write(''.join([str(item) for item in line]))




# description -> contains
# date/time -> based on month, year, day of the week, between time interval, on specific dates and on specific times
# status, type -> select values





