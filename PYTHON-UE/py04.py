#!/usr/bin/env python3
#By Christopher Wegl

#### START of my CODE ####

#------------------------------- Movable Object Attributes --------------------#

class Position:
    def __init__(self, position):
        self.position = position

class Color():
    def __init__(self, color):
        self.color = color

#class MoveAction:
#    def __init__(self, moveaction):
#        self.moveaction = moveaction

#------------------------------- Moveable Object ------------------------------#

class Figure():
    def __init__(self, position, color):
        self.color = Color(color)
        self.position = Position(position)

#------------------------------- Chessmen -------------------------------------#

class King(Figure):
    def __init__(self, position, color):
        Figure.__init__(self, position, color)
        self.figure = "King"

    def __str__(self):
        return self.color.color + " " + self.figure + " on position " + self.position.position

class Queen(Figure):
    def __init__(self, position, color):
        Figure.__init__(self, position, color)
        self.figure = "Queen"

    def __str__(self):
            return self.color.color + " " + self.figure + " on position " + self.position.position

class Rook(Figure):
    def __init__(self, position, color):
        Figure.__init__(self, position, color)
        self.figure = "Rook"

    def __str__(self):
            return self.color.color + " " + self.figure + " on position " + self.position.position

class Bishop(Figure):
    def __init__(self, position, color):
        Figure.__init__(self, position, color)
        self.figure = "Bishop"

    def __str__(self):
            return self.color.color + " " + self.figure + " on position " + self.position.position

class Knight(Figure):
    def __init__(self, position, color):
        Figure.__init__(self, position, color)
        self.figure = "Knight"

    def __str__(self):
            return self.color.color + " " + self.figure + " on position " + self.position.position

class Pawn(Figure):
    def __init__(self, position, color):
        Figure.__init__(self, position, color)
        self.figure = "Pawn"

    def __str__(self):
        return self.color.color + " " + self.figure + " on position " + self.position.position

# class for a chess board
class Board:
    def __init__(self, pieces):
        self.chessmen = pieces

#### END of my CODE ####


def chessmen(configString): # "Kc4,rd2,Qb2" lowercase for BLACK
    result=[]
    #### START of my CODE ####

    # analyse string
    for data in configString.split(","):
        figure = data[0]
        position = data[1:3]
        color = "Black" if figure.islower() else "White"

    # create some chessmen and add to list
        if figure.lower() == "k":
            chessmen = King(position ,color)
            result.append(chessmen)

        if figure.lower() == "q":
            chessmen = Queen(position ,color)
            result.append(chessmen)

        if figure.lower() == "r":
            chessmen = Rook(position ,color)
            result.append(chessmen)

        if figure.lower() == "b":
            chessmen = Bishop(position ,color)
            result.append(chessmen)

        if figure.lower() == "k":
            chessmen = Knight(position ,color)
            result.append(chessmen)

        if figure.lower() == "p":
            chessmen = Pawn(position ,color)
            result.append(chessmen)
    #### END of my CODE ####
    return result


# helper to make grading (comparing strings) easier
def chessmenToString(configString):
    men = chessmen(configString)
    chessmenstrings = map(str,men)
    return " and ".join(chessmenstrings)



# Just for testing:

 # (the moodle-"evaluate" might  use different test data set!)

currentPositions="Ra1,ra8,Pa2,Pb2,Ph2"

pieces = chessmen(currentPositions)
mychessboard = Board(pieces)
for piece in mychessboard.chessmen:
    print(piece)
 # print:
 # White Rook on position a1
       # Black Rook on position a8
        # ...

print( chessmenToString(currentPositions) ) # White Rook on position a1 and Black Rook on position a8 and ...
