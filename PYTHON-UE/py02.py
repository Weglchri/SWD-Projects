#!/usr/bin/env python3
#By Christopher Wegl

# b) Return the longest word of a list in four different ways:
#    b1) longestWord_with_loop
#        loop through the list and....
#    b2) longestWord_with_recursion
#        # call a function again and again until ...
#    b3) longestWord_with_reduce
#        import functools
#        check out the reduce function: help(functools.reduce)
#    b4) longestWord_with_max
#        what is this optional 'key' parameter good for?

# c) for each solution add a comment about
#    c1) (+) advantage
#    c2) (-) disadvantage

def longestWord_with_loop(w):
    result = None
    #### START of my CODE (b1) ####

    currentMax = 0
    for word in w:
        if (len(word)) > currentMax:
            currentMax = len(word)
            result = word

    #### END of my CODE (b1) ####
    # My personal impression of this way to solve the problem
    # c1: (+) advantage: easy to read
    # c2: (-) disadvantage: it's possible to do the same with less code
    return result


def longestWord_with_recursion(wrds):
    result = None
    #### START of my CODE (b2) ####

    maxWord = "";

    def getlongestword(word, maxWord):
        if len(word) > len(maxWord):
            return word
        return maxWord

    for word in wrds:
        maxWord = getlongestword(word, maxWord)

    result = maxWord

    #### END of my CODE (b2) ####
    # My personal impression of this way to solve the problem
    # c1: (+) advantage: reusable function
    # c2: (-) disadvantage: more complicated than necessary
    return result


def longestWord_with_reduce(w):
    result = None
    #### START of my CODE (b3) ####
    import functools

    result = functools.reduce(lambda x,y: x if(len(x) > len(y)) else y, w)

    #### END of my CODE (b3)####
    # My personal impression of this way to solve the problem
    # c1: (+) advantage: short code and if you are fimilar with reduce and lambda it's easy to understand
    # c2: (-) disadvantage: to import a module just to do it this way although there's no obvious advantage towards other methods
    return result

def longestWord_with_max(w):
    result = None
    #### START of my CODE(b4) ####

    result = max(words, key=len)

    #### END of my CODE (b4) ####
    return result
    # My personal impression of this way to solve the problem
    # c1: (+) advantage: very short- and clean code
    # c2: (-) disadvantage: maybe not clear what happens here at first sight


# Just for testing the implemented functions:

# we create demo data
quotes = """The Scandal of education is that every time
you teach something, you deprive a student of the pleasure
and benefit of discovery.
(Seymour Papert, born February 29, 1928 died July 31 2016)

If debugging is the process of removing bugs, then programming
must be the process of putting them in.
(Edsger W. Dijkstra)
"""
import re
# \W to substitute non-word-chars
quotes = re.sub(r'\W',' ',quotes)
words = quotes.split()

# we test the functions with demo data
print( longestWord_with_loop( words ) )      # should print: ....
print( longestWord_with_recursion( words ) ) # should print: ....
print( longestWord_with_reduce( words ) )    # should print: ....
print( longestWord_with_max( words ) )       # should print: ....
