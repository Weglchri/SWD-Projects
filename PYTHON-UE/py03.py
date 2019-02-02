#!/usr/bin/env python3
#By Christopher Wegl

# Requirement for Python Upload 03 about regex and generators:
#
# b) For regular expressions:
#    b1) extract all emails from the given html source
#    b2) return all teachers (firstname, lastname) from given html source
#
# c) For generators
#    c1) generate filenames "2016_img_001.jpg", "2016_img_002.png"..."2016_img_999.svg"

# NOTE: "evaluate" works just within the FH Network! Maybe you want to use VPN.

import re

def extractEmailsFromHTML(src):
    result=[]
    #### START of my CODE ####
    for email in re.findall(r"gen\('(\S+)'\)",src):
        result.append(email.replace("*", ".").replace("#", "@"))
    #### END of my CODE ####
    return result

def extractNamesFromHTML(src):
    result=[]
    #### START of my CODE ####
    for name in re.findall(r"<strong>([\S ]+).* ([\S]+)</strong>",src):
        result.append(name)
    #### END of my CODE ####
    return result

def fileNameGenerator(year=2016,suffix="jpg",count=99):
    #### START of my CODE ####
    for element in range(0, count):
        yield "{}_img_{:03}.{}".format(year, element+1, suffix )
    #### END of my CODE ####



# (the moodle-"evaluate" will use the exact same test data!!)
htmlSource=open("team_itm.html",encoding='utf-8').read()
#print(htmlSource) # ...<h2><br /><strong>Norah Smith</strong><br/> ...onclick="javascript:anschreiben('norah*smith#edu*fh-joanneum*at')" onmouseover=...

for firstname,lastname in extractNamesFromHTML(htmlSource):
    print(lastname) # Smith

for email in extractEmailsFromHTML(htmlSource):
    print(email) # norah.smith@edu.fh-joanneum.at


#(the moodle-"evaluate" might run with different test data!!)
for bc in fileNameGenerator(2016,"png",4):
    print(bc) # prints: "2016_img_001.png",...,"2016_img_004.png"

for bc in fileNameGenerator(2019,"svg",9):
    print(bc) # prints: "2019_img_001.svg",...,"2019_img_009.svg"
