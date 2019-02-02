#!/usr/bin/env ruby
# Requirement for Ruby Upload 01 about Meta-Programming
# Author: Christopher Wegl

#### START of my CODE ####

at_exit do
  puts "Done"
end

# add code for class A which prints "Created," when created

class A
  attr_accessor :created
  attr_accessor :inherited
  def initialize
   @created = "Created,"
   print "#{@created}"
  end
  def self.inherited(other)
    @inherited = "Inherited,"
    print "#{@inherited}"
  end
end

# add code for extending class String for a new method "about"

class String
  def about
    self + " by FH JOANNEUM Kapfenberg"
  end
end

#### END of my CODE ####

A.new
class B < A
end
print "2017".about+","
