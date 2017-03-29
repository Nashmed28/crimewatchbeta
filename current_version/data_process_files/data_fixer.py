logs = open("initial_data.txt", "r")
lines = logs.read().splitlines()

lines = list(filter(lambda x: x!= "", lines))

new_lines = []

i = 0;
end = len(lines)

num_of_tabs = 0
indeces_record = []
while (i < end):
	if lines[i].count('\t') == 7:
		new_lines.append(lines[i])
		i = i + 1
	else:
		num_of_tabs += lines[i].count('\t')
		indeces_record.append(i)
		if (num_of_tabs == 7):
			combined_string = ""
			for index in indeces_record:
				combined_string += lines[index]
				combined_string += "\n"
			new_lines.append(combined_string)
			num_of_tabs = 0
			indeces_record = []
		i = i + 1

# new lines is set in terms of # of crimes

tabulated_array = []

for line in new_lines:
	tabulated_array.append(line.split('\t'))

# tabulated_array is 2D array, now onto formatting.
# 1=Date&Time Reported, 2=Date&Time Occurred
# 3=Type of Crime, 4=Location, 5=Status, 6=Comment
# Need to format: Date&Time and Address [1,2,4]
# Date & Time Reported is EASY (maybe stays the same bc of JS Datetime Objects)
# Date&Time Occurred: 3 types, 0,1,2 "To"s

i = 1
end = len(tabulated_array)
while (i < end):
	datetime = tabulated_array[i][2].count("To")
	if datetime == 0:
		tabulated_array[i][2] = tabulated_array[i][2][:-2] + " " + tabulated_array[i][2][-2:]
	elif datetime == 1:
		a = tabulated_array[i][2].split("To")
		b = a[0].split(" ")
		c = [a[0].strip(), b[0] + a[1]]
		c = [c[0][:-2] + " " + c[0][-2:], c[1][:-2] + " " + c[1][-2:]]
		tabulated_array[i][2] = c
	elif datetime == 2:
		a = tabulated_array[i][2].split(" ")
		a = list(filter(lambda x: x!= "", a))
		a = list(filter(lambda x: x!= "To", a))
		if len(a) == 3:
			b = a[1].split("/")
			a = [a[0], b[0] + "/" + b[1] + "/" + b[2][:4], b[2][4:], a[2]]
		c = [a[0] + " " + a[2], a[1] + " " + a[3]]
		c = [c[0][:-2] + " " + c[0][-2:], c[1][:-2] + " " + c[1][-2:]]
		tabulated_array[i][2] = c
	else:
		print "what?"
	i = i + 1

# Now all that's left is location
address = file("address.csv", "r")
address_array = []
for line in address:
	address_array.append(line.rstrip().split(','))

tabulated_array[0].append("LatLong")

i = 1
end = len(tabulated_array)
while (i < end):
	for address in address_array:
		if address[3].upper() in tabulated_array[i][4].upper():
			tabulated_array[i].append(address[4])
			break
	if len(tabulated_array[i]) == 8:
		tabulated_array[i].append("POINT (-71.1119844 42.3698581)")
	i = i + 1

i = 1
end = len(tabulated_array)
while (i < end):
	a = tabulated_array[i][8].split(" ");
	tabulated_array[i][8] = [a[2][:-1], a[1][1:]]
	i = i + 1


finale = open("final_data.txt", 'w')
import json
json_object = json.dumps(tabulated_array)
finale.write(json_object)


# print tabulated_array[532]
# print tabulated_array[728]
# print tabulated_array[111]
# print tabulated_array[1023]




# print tabulated_array[1023][4]
# for item in address_array:
# 	if item[3].upper() in tabulated_array[1023][4].upper():
# 		print item
#532 (2 substrings)
#728 (Several points/large area described)
#111 (Incorrect altogether -> need to display address))
#1023 (No address -> matches up)
# NEED else address (perhaps the statue/HUPD HQ (opt for the latter))
# Need to display addresses
# In case of multiple matches, go with the first one.

# POINT (-71.1142935 42.3699598) <- HUPD HQ


# print "1575 Massachusetts Ave" in tabulated_array[532][4]
# print "1575 MASSACHUSETTS AVE" in tabulated_array[532][4]

# print address_array[35][3]
# print address_array[35][3] in tabulated_array[532][4]

# for item in address_array:
# 	if (len(item) != 5):
# 		print "what?"
# print address_array















# Scratch Work
# a = tabulated_array[1088][2].split(" ")
# a = list(filter(lambda x: x!= "", a))
# a = list(filter(lambda x: x!= "To", a))
# if len(a) == 3:
# 	b = a[1].split("/")
# 	a = [a[0], b[0] + "/" + b[1] + "/" + b[2][:4], b[2][4:], a[2]]
# c = [a[0] + " " + a[2], a[1] + " " + a[3]]
# c = [c[0][:-2] + " " + c[0][-2:], c[1][:-2] + " " + c[1][-2:]]
# print c  

# a = tabulated_array[401][2].split("To")
# b = a[0].split(" ")
# c = [a[0].strip(), b[0] + a[1]]
# c = [c[0][:-2] + " " + c[0][-2:], c[1][:-2] + " " + c[1][-2:]]
# print c

# print tabulated_array[1][2][:-2] + " " + tabulated_array[1][2][-2:]
# print 



# print tabulated_array[1][1].split(" ", 1)
# print tabulated_array[401][2]
# print len(tabulated_array[0])


# print len(tabulated_array[1])
# print len(tabulated_array[2])
# print len(new_lines)
# print lines[0].count('\t')
# print lines[1].count('\t')
# print lines[2].count('\t')
# len(lines) = 1104
