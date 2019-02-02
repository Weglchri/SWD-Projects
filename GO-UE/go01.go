package main

//Author: Christopher Wegl
//
// b) Multithreading:
//    Simulate concurrent "downloading of x files with the size of 7 MB each"
//    return the final amount of MB downloaded.
//    REQUIRED: a go function for each download,
//             (concurrent) waiting 2 secs for each download
//              use of channels for synchronisation
// NOTE: ONLY ONE OUTPUT is allowed
//       keep line 34: fmt.Printf("RESULT: '%v'", res)
//       remove / comment all other print statements in your code

import (
	"bufio" // input = we read (buffered) text from stdin
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"
)

const DOWNLOADSIMULTAIONTIME = 3 * time.Second

func main() {
	res := ""
	scanner := bufio.NewReader(os.Stdin)         // read from STDIN
	input, _ := scanner.ReadString('\n')         // read FIRST line
	input = strings.Replace(input, "\n", "", -1) // remove line break

	res = myalgo(input) // caluclate the result

	fmt.Printf("RESULT: '%v'", res) // return the result
}

//
// START -- YOUR CODE
//

func myalgo(input string) string { // input string
	sum := 0
	val, _ := strconv.Atoi(input)
	c := make(chan int)
	//fmt.Printf("Just if you need it... the value converted to integer: %d\n", val)

	for i := 0; i < val; i++ {
    go download(i, c)
  }

	for i := 0; i < val; i++ {
		curVal := <- c
		sum += curVal
	}

	return strconv.Itoa(sum) // return string
}

func download(i int, ch chan int) {
  time.Sleep(DOWNLOADSIMULTAIONTIME)
  ch <- 7
}
//
// END -- YOUR CODE
//
