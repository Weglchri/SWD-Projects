package main

// Author: Christopher Wegl

import (
	"bufio" // input = we read (buffered) text from stdin
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

const DOWNLOADTIME = 1 * time.Second

func main() {
	res := ""
	scanner := bufio.NewReader(os.Stdin)         // read from STDIN
	input, _ := scanner.ReadString('\n')         // read FIRST line
	input = strings.Replace(input, "\n", "", -1) // remove line break

	res = myalgo(input) // caluclate the result

	fmt.Printf("RESULT: '%v'", res) // return the result
}

func myalgo(input string) string { // input string e.g. "7"
	val, _ := strconv.Atoi(input)
	sValue := ""
	c := make(chan int, 3)
	d := make(chan int, 3)
	go producer(c)

	for i := 1 ; i <= val ; i++ {
		go consumer(c, d)
	}

	for i := 1 ; i <= val ; i++ {
		curVal := <- d
		sValue += strconv.Itoa(curVal)
	}
	return sValue
}

func producer(c chan int){
	i := 1
	for true {
     	c <- i
		i = i + 1
	 }
}

func consumer(c chan int, d chan int) {
	time.Sleep(DOWNLOADTIME)
	value := <- c
	d <- value
}
