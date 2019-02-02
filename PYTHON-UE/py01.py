#!/usr/bin/env python3

# by Christopher Wegl


def main():
    result = None

    #### START of my CODE ####

    name = "11. Nov. 2016 by Christopher Wegl, SWD15"
    fullname = name.split()[4] + " " + name.split()[5].replace(',', '')
    result = fullname.split()[1].lower()

    #### END of my CODE ####

    return result

print( main())
